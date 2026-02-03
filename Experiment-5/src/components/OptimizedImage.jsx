import React, { useState } from "react";

const OptimizedImage = ({ src, alt, width, height }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#f1f5f9",
        border: "1px solid #e2e8f0",
      }}
    >
      {!loaded && !error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          Loading image...
        </div>
      )}

      {error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "red",
            fontSize: "14px",
          }}
        >
          Image failed to load
        </div>
      )}

      <img
        src={`/${src}`}   // 👈 IMPORTANT FIX
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        style={{
          display: loaded ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default React.memo(OptimizedImage);
