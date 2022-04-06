import { useEffect, useRef } from 'react'

export type argsType = {
  ctx: CanvasRenderingContext2D
  point: {
    x: number
    y: number
  }
  prevPoint: {
    x: number
    y: number
  }
}

type callback = (arg: argsType) => void

export const useOnDraw = (onDraw: callback) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  const isDrawingRef = useRef(false)

  const mouseMoveListenerRef = useRef(null!)
  const mouseDownListenerRef = useRef(null!)
  const mouseUpListenerRef = useRef(null!)

  const prevPointRef = useRef<{ x: number; y: number } | null>(null!)

  useEffect(() => {
    return () => {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener('mousemove', mouseUpListenerRef.current)
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener('mouseup', mouseUpListenerRef.current)
      }
    }
  }, [])

  const setCanvasRef = (ref: HTMLCanvasElement) => {
    if (!ref) return

    if (canvasRef.current) {
      canvasRef.current.removeEventListener(
        'mousedown',
        mouseDownListenerRef.current
      )
    }

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
        if (onDraw)
          onDraw({ ctx: ctx!, point: point!, prevPoint: prevPointRef.current! })
        prevPointRef.current = point
      }
    }
    window.addEventListener('mousemove', (e) => mouseMoveListener(e))
  }

  const initMouseDownListener = () => {
    if (!canvasRef.current) return
    const listener = () => {
      isDrawingRef.current = true
      prevPointRef.current = null
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
