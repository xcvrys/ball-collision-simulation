import { MutableRefObject, useEffect, useRef } from 'react';

export function useAnimationFrame(callback: (timestamp: number) => void) {
  const requestRef: MutableRefObject<number | null> = useRef(null);

  useEffect(() => {
    const animate = (time: number) => {
      callback(time);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);
}
