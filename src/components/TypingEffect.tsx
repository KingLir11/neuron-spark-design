
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  speed = 100,
  className = ""
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prevText => prevText + text.charAt(index));
        setIndex(prevIndex => prevIndex + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [index, text, speed]);

  return (
    <span className={`${className} ${isComplete ? '' : 'after:inline-block after:h-5 after:w-1 after:bg-primary after:animate-cursor-blink'}`}>
      {displayedText}
    </span>
  );
};

export default TypingEffect;
