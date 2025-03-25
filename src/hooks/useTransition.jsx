import { useState } from "react";

export const useTransition = () => {
    const [showText, setShowText] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleTransition = () => {
        setIsTransitioning(true);
        setTimeout(() => {
          setShowText(false);
        }, 200);
      };

    return { showText, setShowText, isTransitioning, setIsTransitioning, handleTransition };
}