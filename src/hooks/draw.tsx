import { useEffect, useRef } from 'react'

export type argsType = {
  ctx: CanvasRenderingContext2D | null
  point: {
    x: number
    y: number
  } | null
}

type callback = (arg: argsType) => void

export const useOnDraw = (onDraw: callback) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  const isDrawingRef = useRef(false)

  const setCanvasRef = (ref: HTMLCanvasElement) => {
    if (!ref) return
    canvasRef.current = ref
    initMouseMoveListener()
    initMouseDownListener()
    initMouseUpListener()
  }

  const initMouseMoveListener = () => {
    const mouseMoveListener = (e: globalThis.MouseEvent) => {
      if (isDrawingRef.current) {
        const point = computedPointInCanvas(e.clientX, e.clientY)
        const ctx = canvasRef.current.getContext('2d')
        if (onDraw) onDraw({ ctx, point })
      }
    }
    window.addEventListener('mousemove', (e) => mouseMoveListener(e))
  }

  const initMouseDownListener = () => {
    if (!canvasRef.current) return
    const listener = () => {
      isDrawingRef.current = true
    }
    canvasRef.current.addEventListener('mousedown', listener)
  }

  const initMouseUpListener = () => {
    if (!canvasRef.current) return
    const listener = () => {
      isDrawingRef.current = false
    }
    canvasRef.current.addEventListener('mouseup', listener)
  }

  const computedPointInCanvas = (clientX: number, clientY: number) => {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect()
      return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
      }
    } else {
      return null
    }
  }

  return { setCanvasRef }
}
