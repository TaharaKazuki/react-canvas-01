import { useOnDraw } from '../hooks/draw'
import type { argsType } from '../hooks/draw'

type Props = {
  width: number
  height: number
}

const Canvas = ({ width, height }: Props) => {
  const onDraw = ({ ctx, point, prevPoint }: argsType) => {
    drawLine(prevPoint, point, ctx, '#000000', 5)
  }

  const drawLine = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    ctx: CanvasRenderingContext2D,
    color: string,
    width: number
  ) => {
    start = start ?? end
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()

    ctx!.fillStyle = '#000000'
    ctx!.beginPath()
    ctx!.arc(start!.x, start!.y, 2, 0, 2 * Math.PI)
    ctx!.fill()
  }

  const { setCanvasRef } = useOnDraw(onDraw)

  return (
    <canvas
      width={width}
      height={height}
      style={canvasStyle}
      ref={setCanvasRef}
    />
  )
}

export default Canvas

const canvasStyle = {
  border: '1px solid black',
}
