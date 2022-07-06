import React, { useEffect, useState } from 'react';
import './ImageLoader.css';

const customComponentTemplate = (
  <div
    style={{
      height: '40vh',
      width: '40vh',
      display: 'grid',
      placeItems: 'center',
      backgroundColor: 'gainsboro',
    }}
  >
    <span style={{ padding: '20px auto', textAlign: 'center' }}>
      Hi! I am custom placeholder component
    </span>
  </div>
);

type Props = {
  alt: string;
  src: string;
  style?: React.CSSProperties;
  className?: string;
  loadType?: 'placeholder' | 'shimmer' | 'custom';
  placeholderImage?: string;
  customComponent?: React.ReactNode;
};

export const ImageLoader = ({
  alt = '',
  src = '',
  style = { maxWidth: '100%', height: '30vh' },
  className = '',
  loadType = 'shimmer',
  customComponent = customComponentTemplate,
  placeholderImage = '',
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [placeholderImg, setPlaceholderImg] = useState<string>('');

  useEffect(() => {
    setIsLoaded(false);
    async function checkType() {
      if (loadType === 'placeholder') {
        if (placeholderImage !== '') {
          setPlaceholderImg(placeholderImage);
          return;
        }
        const ph = await import('./placeholder');
        setPlaceholderImg(ph.placeholder);
      }
    }
    checkType();
    var img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src, loadType, placeholderImage]);

  const onLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <ShimmerComponent
        loadType={loadType}
        isLoaded={isLoaded}
        style={style}
        className={className}
      />
      <CustomComponent
        isLoaded={isLoaded}
        loadType={loadType}
        customComponent={customComponent}
      />
      <PlaceholderComponent
        isLoaded={isLoaded}
        loadType={loadType}
        style={style}
        alt={alt}
        placeholderImage={placeholderImg}
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

type ShimmerComponentProps = {
  loadType: string;
  isLoaded: boolean;
  style: React.CSSProperties;
  className: string;
};

const ShimmerComponent = ({
  loadType,
  isLoaded,
  style,
  className,
}: ShimmerComponentProps) => {
  return (
    <div
      style={{
        display:
          loadType === 'shimmer' ? (isLoaded ? 'none' : 'block') : 'none',
        ...style,
      }}
      className={`shine ${className}`}
    ></div>
  );
};

type PlaceholderComponentProps = {
  isLoaded: boolean;
  loadType: string;
  style: React.CSSProperties;
  alt: string;
  placeholderImage: string;
  className: string;
};

const PlaceholderComponent = ({
  isLoaded,
  loadType,
  style,
  alt,
  placeholderImage,
  className,
}: PlaceholderComponentProps) => {
  return (
    <img
      style={{
        display:
          loadType === 'placeholder' ? (isLoaded ? 'none' : 'block') : 'none',
        ...style,
      }}
      alt={alt}
      src={placeholderImage}
      className={className}
    />
  );
};

type CustomComponentProps = {
  loadType: string;
  isLoaded: boolean;
  customComponent: React.ReactNode;
};

const CustomComponent = ({
  loadType,
  isLoaded,
  customComponent,
}: CustomComponentProps) => {
  return (
    <div
      style={{
        display: loadType === 'custom' ? (isLoaded ? 'none' : 'block') : 'none',
      }}
    >
      {customComponent}
    </div>
  );
};
