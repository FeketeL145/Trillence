import React, { useState, useEffect, useRef } from 'react';
import './TextScroll.css'; // CSS file for styling

const TextScroll = ({ text }) => {
  const [scrolling, setScrolling] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('scroll-container');

    if (contentRef.current.offsetWidth > container.offsetWidth) {
      setScrolling(true);
      const containerWidth = container.offsetWidth;
      const contentWidth = contentRef.current.offsetWidth;
      setTimeout(() => {
        const scrollInterval = setInterval(() => {
          const interval = Math.max(20, 2000 / (contentWidth / containerWidth)); // Dynamic interval calculation
          if (container.scrollLeft === contentWidth - containerWidth) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: 1, behavior: 'smooth' });
          }
        }, 20);
        return () => clearInterval(scrollInterval);
      }, 3000); // Add a delay of 3000ms before starting the animation loop
    } else {
      setScrolling(false);
    }
  }, [text]);

  return (
    <div className="scroll-container" id="scroll-container">
      <div className={`scroll-content ${scrolling ? 'scrolling' : ''}`} id="scroll-content" ref={contentRef}>
        {text}
      </div>
    </div>
  );
};

export default TextScroll;