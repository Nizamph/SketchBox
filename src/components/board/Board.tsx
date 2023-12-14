import { setCurrentNavbarTool } from '@/reduxStore/appSlice';
import { RootState } from '@/reduxStore/store';
import { setImagesWhenMouseUp } from '@/reduxStore/toolboxSlice';
import React, { MutableRefObject, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

type properties = {
  color: string;
  size: string | undefined;
};

const Board = () => {
  const currentRef = useRef<HTMLCanvasElement | null>(null);
  const shouldDraw = useRef<HTMLCanvasElement | boolean>(false);
  const currentTabName: string = useSelector(
    (store: RootState) => store.app.currentNavbarTool
  );
  const dispatch = useDispatch();
  const pencilProperties: properties = useSelector(
    (store: RootState) => store.toolbox.pencilProperty
  );
  const eraserProperties: properties = useSelector(
    (store: RootState) => store.toolbox.eraserProperty
  );

  const pointer: React.MutableRefObject<number> = useRef(0);
  const imageHistory: React.MutableRefObject<ImageData[]> = useRef([]);

  useEffect(() => {
    if (!currentRef.current) return;
    currentRef.current.width = window.innerWidth;
    currentRef.current.height = window.innerHeight;

    const canvas: HTMLCanvasElement | null = currentRef.current;
    const context: CanvasRenderingContext2D | null = canvas?.getContext('2d');

    const beginDraw = (x: number, y: number) => {
      context?.beginPath();
      context?.lineTo(x, y);
    };

    const drawLine = (x: number, y: number) => {
      context?.lineTo(x, y);
      context?.stroke();
    };
    const mouseDownHandler = (e: any) => {
      shouldDraw.current = true;
      if (shouldDraw.current) {
        beginDraw(e.clientX, e.clientY);
      }
    };
    const mouseMoveHandler = (e: any) => {
      if (shouldDraw.current) {
        drawLine(e.clientX, e.clientY);
      }
    };
    const mouseUpHandler = (e: any) => {
      shouldDraw.current = false;
      const URI: string = canvas.toDataURL();

      const currentImage: ImageData | undefined = context?.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      if (currentImage) {
        imageHistory.current.push(currentImage);
        pointer.current = imageHistory.current.length - 1;
      }
    };

    canvas.addEventListener('mousedown', mouseDownHandler);
    canvas.addEventListener('mousemove', mouseMoveHandler);
    canvas.addEventListener('mouseup', mouseUpHandler);

    return () => {
      canvas.removeEventListener('mousedown', mouseDownHandler);
      canvas.removeEventListener('mousemove', mouseMoveHandler);
      canvas.removeEventListener('mouseup', mouseUpHandler);
    };
  }, []);

  useEffect(() => {
    if (!currentRef.current) return;

    const canvas: HTMLCanvasElement | null = currentRef.current;
    const context: CanvasRenderingContext2D | null = canvas?.getContext('2d');

    const changeConfig = () => {
      if (!context) return;

      if (currentTabName === 'pencil') {
        context.strokeStyle = pencilProperties.color;
        context.lineWidth = Number(pencilProperties.size);
      } else if (currentTabName === 'eraser') {
        context.strokeStyle = eraserProperties.color;
        context.lineWidth = Number(eraserProperties.size);
      } else if (
        currentTabName === 'rotate-left' ||
        currentTabName === 'rotate-right'
      ) {
        if (
          currentTabName === 'rotate-right' &&
          pointer.current < imageHistory.current.length - 1
        ) {
          pointer.current = pointer.current + 1;
        }
        if (imageHistory.current.length - 1 > 0) {
          console.log('inside rotate left');
          if (currentTabName === 'rotate-left' && pointer.current > 0)
            pointer.current = pointer.current - 1;

          console.log('pointer is here', pointer.current);
          const currentImage = imageHistory.current[pointer.current];
          if (currentImage) {
            console.log('inside current image');
            context.putImageData(currentImage, 0, 0);
            dispatch(setCurrentNavbarTool(''));
          }
        }
      } else if (currentTabName === 'floppy-disk') {
        const anchor = document.createElement('a');
        anchor.href = canvas.toDataURL();
        anchor.download = 'sketch.jpg';
        anchor.click();
        dispatch(setCurrentNavbarTool(''));
      }
    };

    changeConfig();
  }, [pencilProperties, eraserProperties, currentTabName, pointer]);
  console.log('component rendering');
  return <canvas ref={currentRef}></canvas>;
};

export default React.memo(Board);
