import './assets/style/main.scss'
import * as p5 from 'p5'

// image data processing
const mirror = _p5 => {
  const size = 300
  const width = size * 4
  const height = size * 3
  const interval = 50

  let img

  _p5.setup = () => {
    _p5.frameRate(30)
    _p5.createCanvas(width, height)
    _p5.noStroke()

    img = _p5.createCapture(_p5.VIDEO)
    img.size(width, height)
    img.hide()
  }

  _p5.draw = () => {
    _p5.clear()
    img.loadPixels()

    for (let y = 0; y < img.height; y += interval) {
      for (let x = 0; x < img.width; x += interval) {
        const i = y * width + (img.width - x - 1)
        const r = (255 - img.pixels[i * 4]) / 255
        const g = (255 - img.pixels[i * 4 + 1]) / 255
        const b = (255 - img.pixels[i * 4 + 2]) / 255
        const darkness = (r + g + b) / 3
        const radius = (interval / 2) * Math.pow(darkness, 2)
        // const r = img.pixels[i * 4] / 255
        // const g = img.pixels[i * 4 + 1] / 255
        // const b = img.pixels[i * 4 + 2] / 255
        // const brightness = (r + g + b) / 3
        // const radius = interval * brightness
        _p5.fill(255)
        _p5.ellipse(x + interval / 2, y + interval / 2, radius, radius)
      }
    }
  }
}

new p5(mirror)
