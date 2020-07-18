import './assets/style/main.scss'
import * as p5 from 'p5'

const params = new URLSearchParams(window.location.search)

const size = Number(params.get('size')) || 300
const width = size * 4
const height = size * 3
const radius = Number(params.get('radius')) || 30

const mirror = _p5 => {
  let img

  _p5.setup = () => {
    _p5.frameRate(20)
    _p5.createCanvas(width, height)
    _p5.noStroke()
    _p5.rectMode(_p5.CENTER)
    // _p5.blendMode(_p5.EXCLUSION)

    img = _p5.createCapture(_p5.VIDEO)
    img.size(width, height)
    img.hide()
  }

  _p5.draw = () => {
    _p5.clear()
    img.loadPixels()

    for (let y = 0; y < img.height; y += radius) {
      for (let x = 0; x < img.width; x += radius) {
        const i = y * width + (img.width - x - 1)
        const r = img.pixels[i * 4]
        const g = img.pixels[i * 4 + 1]
        const b = img.pixels[i * 4 + 2]
        const darkness = 1 - (r + g + b) / (255 * 3)
        const _radius = radius * 1 * Math.pow(darkness, 2)

        const color = _p5.map(darkness, 0, 1, 0, 255)

        _p5.fill(color)
        _p5.rect(x + radius / 2, y + radius / 2, _radius, _radius)
        // _p5.ellipse(x + interval / 2, y + interval / 2, radius, radius)
      }
    }
  }
}

new p5(mirror)
