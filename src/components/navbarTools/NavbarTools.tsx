import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconOptions } from '@/constants/Constants';
import Button from '../UI/Button';
import { iconstype } from '@/constants/Constants';
import {
  faPencil,
  faEraser,
  faRotateRight,
  faRotateLeft,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeColorOptionVisibility,
  setCurrentNavbarTool,
} from '@/reduxStore/appSlice';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/reduxStore/store';
import { socket } from '../../../socket';

type pencilColor = {
  color?: string | undefined;
  size?: number | undefined;
};
const NavbarTools = () => {
  const dispatch = useDispatch();
  const [currentMenu, setCurrentMenu] = useState<IconDefinition>(
    iconOptions.PENCILICON
  );
  const { color, size } = useSelector(
    (store: RootState) => store.toolbox.pencilProperty
  );
  const currentTabName: string = useSelector(
    (store: RootState) => store.app.currentNavbarTool
  );
  const eraserProperty: any = useSelector(
    (store: RootState) => store.toolbox.eraserProperty
  );

  const navToolbarhandler = (iconName: IconDefinition) => {
    (iconName === iconOptions.PENCILICON || iconName === iconOptions.ERASER) &&
      setCurrentMenu(iconName);
    dispatch(setCurrentNavbarTool(iconName));
    if (
      iconName === iconOptions.UNDO ||
      iconName === iconOptions.REDO ||
      iconName === iconOptions.SAVE
    )
      return;
    iconName !== iconOptions.PENCILICON
      ? dispatch(changeColorOptionVisibility('hideColorOptions'))
      : dispatch(changeColorOptionVisibility('ColorOptions'));

    if (iconName === iconOptions.ERASER) {
      socket.emit('changeConfig', {
        color: eraserProperty.color,
        size: eraserProperty.size,
      });
    }
  };

  return (
    <div className=' ml-24 mt-8 flex justify-center absolute items-center sm:ml-14 md:ml-[28rem] lg:ml-[34rem]'>
      <div className='w-72 h-14 rounded-lg border shadow-md bg-transparent  flex gap-5 justify-center items-center'>
        {Object.keys(iconOptions)?.map((iconName, index) => (
          <React.Fragment key={index}>
            <Button
              onClick={() =>
                navToolbarhandler(iconOptions[iconName as keyof iconstype])
              }
              className={`rounded-md p-2 ${
                currentMenu === iconOptions[iconName as keyof iconstype] &&
                'bg-slate-200'
              } hover:bg-slate-200`}>
              <FontAwesomeIcon
                icon={iconOptions[iconName as keyof iconstype]}
                size='lg'
                color='grey'
              />
            </Button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default NavbarTools;
