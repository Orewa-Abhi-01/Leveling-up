import { useEffect, useState } from "react";
import "../../styles/CustomCursor.css"; // Import the CSS for custom cursor


const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Update cursor position based on mouse movement
    const handleMouseMove = (e) => {
      setCursorPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Optionally handle hovering on buttons or interactive elements
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <>
      {/* Custom cursor */}
      <div
        className={`custom-cursor ${isHovering ? "hover" : ""}`}
        style={{
          left: cursorPos.x -35  + "px", // Offset by half the cursor size
          top: cursorPos.y -35 + "px", // Offset by half the cursor size
        }}
      />
      {/* Add event listeners for mouseover/hover effects */}
      <div
        // className="interactive-element"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
      </div>
    </>
  );
};

export default CustomCursor;
