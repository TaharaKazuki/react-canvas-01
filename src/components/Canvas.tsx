import { useOnDraw } from '../hooks/draw'
import type { argsType } from '../hooks/draw'

type Props = {
  width: number
  height: number
}

const Canvas = ({ width, height }: Props) => {
  const onDraw = ({ ctx, point }: argsType) => {
    ctx!.fillStyle = '#000000'
    ctx!.beginPath()
    ctx!.arc(point!.x, point!.y, 2, 0, 2 * Math.PI)
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
