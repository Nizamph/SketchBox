import {
    faPencil,
    faEraser,
    faRotateRight,
    faRotateLeft,
    faSave,
} from '@fortawesome/free-solid-svg-icons'

import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type iconstype = {
    PENCILICON: IconDefinition
    ERASER: IconDefinition
    UNDO: IconDefinition
    REDO: IconDefinition
    SAVE: IconDefinition
}

export type colorOptionsType = {
    black: string
    green: string
    red: string
    blue: string
    yellow: string
    orange: string
    white: string
}

export const iconOptions: iconstype = {
    PENCILICON: faPencil,
    ERASER: faEraser,
    UNDO: faRotateLeft,
    REDO: faRotateRight,
    SAVE: faSave,
}
export const colorOption: colorOptionsType = {
    black: 'black',
    green: 'green',
    red: 'red',
    blue: 'blue',
    yellow: 'yellow',
    orange: 'orange',
    white: 'white',
}
