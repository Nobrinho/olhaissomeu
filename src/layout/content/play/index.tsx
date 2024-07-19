import React, { useEffect, useRef } from 'react';
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

  return (
    <div style={{ maxWidth: '100%', backgroundColor: 'black' }}>
      <video ref={videoRef} controls autoPlay style={{ width: '100%', height: 'auto' }}>
        <source src={`https://olhaissomeu.com.br/stream/${filename}`} type="video/mp4" />
      </video>
    </div>
  );
};

export default Play;