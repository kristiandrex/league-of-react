import { cloneElement, useRef, useState, useEffect } from "react";
import styles from "@/styles/Thumbnail.module.css";

function LoadingImage({ children }) {
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef();

  const handleLoad = () => setLoading(false);

  useEffect(() => {
    setWidth(Number(ref.current?.width));
    setHeight(Number(ref.current?.height));
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <span
          className={styles.skeleton}
          style={{ width: width, height: height }}
        ></span>
      )}
      {cloneElement(children, { ref, onLoad: handleLoad })}
    </div>
  );
}

export default LoadingImage;
