import { RootState } from '@/reduxStore/store';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

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

  const pencilProperties: properties = useSelector(
    (store: RootState) => store.toolbox.pencilProperty
  );
  const eraserProperties: properties = useSelector(
    (store: RootState) => store.toolbox.eraserProperty
  );

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
      } else {
        context.strokeStyle = eraserProperties.color;
        context.lineWidth = Number(eraserProperties.size);
      }
    };

    changeConfig();
  }, [pencilProperties, eraserProperties, currentTabName]);

  return <canvas ref={currentRef}></canvas>;
};

export default React.memo(Board);
