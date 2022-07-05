import React, { useEffect, useState } from 'react';
import './ImageLoader.css';

type Props = {
  alt: string;
  src: string;
  style?: React.CSSProperties;
  className?: string;
  loadType?: 'placeholder' | 'shimmer';
  placeholderImage?: string;
  shimmerPrimaryColor?: string;
  shimmerSecondaryColor?: string;
  shimmerLinerarGradient?: string;
  shimmerAnimationDelay?: number;
};

export const ImageLoader = ({
  alt = '',
  src = '',
  style = { maxWidth: '100%', height: '30vh' },
  className = '',
  loadType = 'shimmer',
  shimmerPrimaryColor = '#f6f7f8',
  shimmerSecondaryColor = '#ececec',
  shimmerLinerarGradient = '',
  shimmerAnimationDelay = 1.5,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    var img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src, loadType]);

  const onLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <div
        style={{
          display:
            loadType === 'shimmer' ? (isLoaded ? 'none' : 'block') : 'none',
          backgroundImage:
            shimmerLinerarGradient !== ''
              ? shimmerLinerarGradient
              : `linear-gradient(to right, ${shimmerPrimaryColor} 0%, ${shimmerSecondaryColor} 20%, ${shimmerPrimaryColor} 40%, ${shimmerPrimaryColor} 100%)`,
          animationDuration: `${shimmerAnimationDelay}s`,
          ...style,
        }}
        className="shine"
      ></div>
      <img
        onLoad={onLoaded}
        style={{
          display:
            loadType === 'placeholder' ? (isLoaded ? 'none' : 'block') : 'none',
          ...style,
        }}
        alt={alt}
        src={'./placeholder.png'}
        className={className}
      />
      <img
        onLoad={onLoaded}
        style={{
          display: isLoaded ? 'block' : 'none',
          ...style,
        }}
        alt={alt}
        src={src}
        className={className}
      />
    </>
  );
};
