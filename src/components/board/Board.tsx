import React, { useEffect } from 'react'
import { useRef } from 'react'
const Board = () => {
    const currentRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (!currentRef.current) return
        currentRef.current.width = window.innerWidth
        currentRef.current.height = window.innerHeight
    })
    return <canvas ref={currentRef}></canvas>
}

export default Board
