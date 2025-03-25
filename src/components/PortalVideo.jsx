import { useEffect } from 'react';
import portalVideo from '../assets/video/portal-dungeon.mp4';

const PortalVideo = ({ onEnd }) => {
  useEffect(() => {
    const video = document.getElementById('portalVideo');
    
    const handleVideoEnd = () => {
      onEnd();
    };

    video.addEventListener('ended', handleVideoEnd);
    return () => video.removeEventListener('ended', handleVideoEnd);
  }, [onEnd]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <video
        id="portalVideo"
        className="w-full h-full object-cover"
        autoPlay
        muted
      >
        <source src={portalVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default PortalVideo;