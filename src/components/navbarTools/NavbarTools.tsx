import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { iconOptions } from '@/constants/Constants'
import Button from '../UI/Button'
import { iconstype } from '@/constants/Constants'
import {
    faPencil,
    faEraser,
    faRotateRight,
    faRotateLeft,
    faSave,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    changeColorOptionVisibility,
    setCurrentNavbarTool,
} from '@/reduxStore/appSlice'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { RootState } from '@/reduxStore/store'

type pencilColor = {
    color?: string | undefined
    size?: number | undefined
}
const NavbarTools = () => {
    const dispatch = useDispatch()
    const [currentMenu, setCurrentMenu] = useState<IconDefinition>(
        iconOptions.PENCILICON
    )
    const { color, size } = useSelector(
        (store: RootState) => store.toolbox.pencilProperty
    )
    console.log('currentPencilColor', color, size)

    const navToolbarhandler = (iconName: IconDefinition) => {
        ;(iconName === iconOptions.PENCILICON ||
            iconName === iconOptions.ERASER) &&
            setCurrentMenu(iconName)
        dispatch(setCurrentNavbarTool(iconName))
        iconName !== iconOptions.PENCILICON
            ? dispatch(changeColorOptionVisibility('hideColorOptions'))
            : dispatch(changeColorOptionVisibility('ColorOptions'))
    }
    return (
        <div className="w-full h-36 flex justify-center absolute items-center">
            <div className="w-72 h-14 rounded-lg border shadow-md bg-transparent  flex gap-5 justify-center items-center">
                {Object.keys(iconOptions)?.map((iconName, index) => (
                    <React.Fragment key={index}>
                        <Button
                            onClick={() =>
                                navToolbarhandler(
                                    iconOptions[iconName as keyof iconstype]
                                )
                            }
                            className={`rounded-md p-2 ${
                                currentMenu ===
                                    iconOptions[iconName as keyof iconstype] &&
                                'bg-slate-200'
                            } hover:bg-slate-200`}
                        >
                            <FontAwesomeIcon
                                icon={iconOptions[iconName as keyof iconstype]}
                                size="lg"
                                color="grey"
                            />
                        </Button>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
export default NavbarTools
