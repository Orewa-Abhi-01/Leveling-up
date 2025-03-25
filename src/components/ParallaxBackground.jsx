import { useState, useEffect } from 'react';

const ParallaxBackground = ({ backgroundImage, children, intensity = 20 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    // Calculate mouse position as percentage of screen width/height
    const x = (e.clientX / window.innerWidth - 0.5) * intensity;
    const y = (e.clientY / window.innerHeight - 0.5) * intensity;
    
    setPosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        className="absolute inset-0 w-[calc(100%+80px)] h-[calc(100%+80px)] -ml-10 -mt-10 bg-cover bg-center transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground; 