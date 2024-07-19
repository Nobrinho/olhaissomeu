import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

interface RouteParams {
  filename: string;
  [key: string]: string | undefined;
}

const Play: React.FC = () => {
  const { filename } = useParams<RouteParams>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.title = "video";
  }, []);

  const handleFullScreen = (): void => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if ((videoElement as any).mozRequestFullScreen) { /* Firefox */
        (videoElement as any).mozRequestFullScreen();
      } else if ((videoElement as any).webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        (videoElement as any).webkitRequestFullscreen();
      } else if ((videoElement as any).msRequestFullscreen) { /* IE/Edge */
        (videoElement as any).msRequestFullscreen();
      }
    }
  };

  return (
    <div style={{ maxWidth: '100%', backgroundColor: 'black' }}>
      <video ref={videoRef} controls autoPlay style={{ width: '100%', height: 'auto' }}>
        <source src={`https://olhaissomeu.com.br/stream/${filename}`} type="video/mp4" />
      </video>
    </div>
  );
};

export default Play;