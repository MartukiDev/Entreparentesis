import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden aspect-[4/3]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <ClipLoader color="#ef4444" size={32} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`object-cover w-full h-full transition-opacity duration-700 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ImageWithLoader;
