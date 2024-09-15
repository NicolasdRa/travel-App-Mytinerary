import React from 'react'

type PreviewProps = {
  rect: { x: number; y: number; width: number; height: number }
  image: string
  width: number
  height: number
}

/**
 * Note: Unused
 */
export class Preview extends React.Component<PreviewProps> {
  private canvas = React.createRef<HTMLCanvasElement>()
  private image: HTMLImageElement | null = null

  componentDidMount() {
    this.redraw()
  }

  componentDidUpdate() {
    this.redraw()
  }

  handleImageLoad = () => {
    const ctx = this.canvas.current?.getContext('2d')
    console.log('handleImageLoad', { noDrawing: !ctx || !this.image })

    if (!ctx || !this.image) return

    const { rect, width, height } = this.props

    ctx.clearRect(0, 0, width, height)

    ctx.strokeStyle = 'red'

    if (rect && (rect.width > 1 || rect.height > 1)) {
      ctx.drawImage(
        this.image,
        Math.round(-rect.x * (width / rect.width)),
        Math.round(-rect.y * (height / rect.height)),
        Math.round(width / rect.width),
        Math.round(height / rect.height)
      )

      if (rect) {
        ctx.strokeRect(1, 1, Math.round(width) - 2, Math.round(height) - 2)
      }
    } else {
      ctx.drawImage(this.image, 0, 0, width, height)

      if (rect) {
        ctx.strokeRect(
          Math.round(rect.x * width) + 0.5,
          Math.round(rect.y * height) + 0.5,
          Math.round(rect.width * width),
          Math.round(rect.height * height)
        )
      }
    }
  }

  redraw() {
    console.log('redraw')
    const image = new Image()
    image.src = this.props.image
    image.onload = this.handleImageLoad
    this.image = image
  }

  render() {
    const { width, height } = this.props
    return (
      <canvas ref={this.canvas} className="m-1" width={width} height={height} />
    )
  }
}

export default Preview
