
"use client";

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 2 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Reset for new text
    setIsTyping(true);
    setDisplayedText('');

    if (!text) {
      setIsTyping(false);
      return;
    }

    const interval = setInterval(() => {
      setDisplayedText((current) => {
        const nextCharIndex = current.length;
        if (nextCharIndex < text.length) {
          return text.substring(0, nextCharIndex + 1);
        } else {
          clearInterval(interval);
          setIsTyping(false);
          return current;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  // This is safe from XSS because React escapes string content.
  // The animated cursor is a separate element.
  return (
    <>
      {displayedText}
      {isTyping && <span className="animate-pulse">▋</span>}
    </>
  );
};

export default Typewriter;
