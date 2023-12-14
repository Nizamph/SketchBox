import React, { ChangeEvent, useEffect, useState } from 'react';
import { colorOption } from '@/constants/Constants';
import Colorbox from './Colorbox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reduxStore/store';
import { colorOptionsType } from '@/constants/Constants';
import { socket } from '../../../socket';
import {
  changeEraserProperty,
  changePencilProperty,
} from '@/reduxStore/toolboxSlice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
const SidebarTools = () => {
  const [rangeValue, setRangeValue] = useState<string>('');
  const [currentColor, setCurrentColot] = useState<string>('');
  const colorOptionVisibility: boolean = useSelector(
    (store: RootState) => store.app.visibilityOfColorOptions
  );
  const eraserProperty: any = useSelector(
    (store: RootState) => store.toolbox.eraserProperty
  );
  const pensilProperty: any = useSelector(
    (store: RootState) => store.toolbox.pencilProperty
  );
  const currentNavTool: string = useSelector(
    (store: RootState) => store.app.currentNavbarTool
  );

  const dispatch: Dispatch<any> = useDispatch();
  const changePencilShadeHandler = (color: string) => {
    dispatch(changePencilProperty({ newColor: color }));
    socket.emit('changeConfig', { color: color, size: pensilProperty.size });
  };

  const changeSizeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(event.target.value);
    socket.emit('changeConfig', {
      color: pensilProperty.color,
      size: event.target.value,
    });
    if (colorOptionVisibility) {
      dispatch(changePencilProperty({ newSize: event.target.value }));
    } else {
      dispatch(changeEraserProperty(event.target.value));
    }
  };

  useEffect(() => {
    if (currentNavTool === 'pencil' || currentNavTool === 'eraser') {
      setRangeValue('3');
    }
  }, [currentNavTool]);

  return (
    <div
      className={`${
        !colorOptionVisibility ? 'h-20' : 'h-40'
      } border border-slate-300 ml-6 mt-44  top-8 p-4 flex flex-col justify-start gap-4 absolute rounded-md shadow-lg w-72`}>
      {colorOptionVisibility && (
        <section>
          <p className='text-xs  text-gray-500'>Stroke Color</p>
          <div className='flex w-full mt-2 justify-start gap-4'>
            {Object.keys(colorOption)?.map((color, index) => (
              <Colorbox
                key={index}
                color={colorOption[color as keyof colorOptionsType]}
                changeColorHandler={changePencilShadeHandler}
              />
            ))}
          </div>
        </section>
      )}
      <section>
        <p className='text-xs  text-gray-500'>Brush size</p>
        <input
          type='range'
          value={rangeValue}
          min={1}
          max={10}
          step={1}
          onChange={changeSizeHandler}
        />
      </section>
    </div>
  );
};

export default SidebarTools;
