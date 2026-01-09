import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { z } from "npm:zod@3.23.8";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  service: z.string().trim().min(1, "Service is required").max(100, "Service must be less than 100 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

// HTML escape function to prevent XSS in email content
const escapeHtml = (str: string): string => {
  return str.replace(/[&<>"']/g, (match) => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return escapeMap[match] || match;
  });
};

// Rate limiting constants
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour
const MAX_SUBMISSIONS_PER_WINDOW = 3;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    // Parse and validate input
    const rawBody = await req.json();
    const parseResult = contactSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      console.log("Validation failed:", parseResult.error.flatten());
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid input", 
          details: parseResult.error.flatten().fieldErrors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, service, message } = parseResult.data;

    // Initialize Supabase client for rate limiting check
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting: Check recent submissions from this email
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { data: recentSubmissions, error: rateCheckError } = await supabase
      .from('contact_submissions')
      .select('created_at')
      .eq('email', email)
      .gte('created_at', oneHourAgo);

    if (rateCheckError) {
      console.error("Rate limit check error:", rateCheckError);
      // Continue without rate limiting if check fails
    } else if (recentSubmissions && recentSubmissions.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      console.log("Rate limit exceeded for email:", email);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "You've submitted too many messages recently. Please try again later." 
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Escape HTML to prevent XSS in email content
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message);

    console.log("Received validated contact form submission:", { name: safeName, email: safeEmail, service: safeService });

    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["liransapozh@gmail.com"],
      subject: `New Contact Form Submission - ${safeService}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">New Contact Form Submission</h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p style="margin: 10px 0;"><strong>Service:</strong> ${safeService}</p>
          </div>
          
          <div style="background-color: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6;">${safeMessage}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Sent from your portfolio website
          </p>
        </div>
      `,
    });

    console.log("Resend API response:", JSON.stringify(emailResponse));

    // Check if there's an error in the response
    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      return new Response(
        JSON.stringify({ success: false, error: emailResponse.error.message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
