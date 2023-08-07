"use client"
import { useCallback, useEffect, useRef, useState } from 'react';

const useImagesAnimation = () => {
  const [current, setCurrent] = useState(3);
  const [zIndex, setZIndex] = useState(0);
  const [rotateDirection, setRotateDirection] = useState(-1);

  const divsRef = useRef<NodeListOf<HTMLDivElement> | null>(null); // Define the type of the ref

  const handleClick = useCallback(() => {
    setZIndex((prevZIndex) => prevZIndex - 2);
    divsRef.current?.[current - 1]?.style &&
      (divsRef.current[current - 1].style.zIndex = zIndex.toString()); // Convert to string here
    divsRef.current?.[current - 1]?.style &&
      (divsRef.current[current - 1].style.transform = `rotate(${5 * rotateDirection}deg)`);
    setRotateDirection((prevRotateDirection) => -prevRotateDirection);

    setCurrent((prevCurrent) => (prevCurrent + 1 > 3 ? 1 : prevCurrent + 1));
    divsRef.current?.[current - 1]?.style &&
      (divsRef.current[current - 1].style.transform = 'rotate(0deg)');
    divsRef.current?.[current - 1]?.style &&
      (divsRef.current[current - 1].style.zIndex = '2'); // Convert to string here
  }, [current, rotateDirection, zIndex]);

  useEffect(() => {
    divsRef.current = document.querySelectorAll('div');

    // Cleanup function to reset styles when the component unmounts
    return () => {
      divsRef.current?.forEach((div) => {
        div.style.transform = 'rotate(0deg)';
        div.style.zIndex = '0'; // Convert to string here
      });
    };
  }, []);

  return handleClick;
};

export default useImagesAnimation;
