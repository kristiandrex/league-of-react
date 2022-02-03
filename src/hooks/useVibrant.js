import { useEffect, useState } from "react";

/**
 *
 * @param {string} src
 * @returns {string?}
 */
function useVibrant(src) {
  const [color, setColor] = useState();

  useEffect(() => {
    import("node-vibrant/dist/vibrant").then((module) => {
      const Vibrant = module.default;

      Vibrant.from(src, { quality: 1 })
        .getPalette()
        .then((palette) => setColor(palette.Vibrant.hex));
    });
  }, [src]);

  return color;
}

export default useVibrant;
