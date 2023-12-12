import { RootState } from '@/reduxStore/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

type ColorboxProps = {
    color: string
    changeColorHandler: (color: string) => void
}

const Colorbox = ({ color, changeColorHandler }: ColorboxProps) => {
    const pencilProperty: { color: string; size: string | undefined } =
        useSelector((store: RootState) => store.toolbox.pencilProperty)
    return (
        <button
            onClick={() => changeColorHandler(color)}
            className={`w-6 h-6 rounded-sm ${
                pencilProperty.color === color &&
                'border-2 border-solid border-blue-900 border-spacing-3 ' // Added 'border-2' for a bolder border
            }`}
            style={{ backgroundColor: color }}
        ></button>
    )
}

export default Colorbox
