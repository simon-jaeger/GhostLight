export function drawSliced(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x = 0, y = 0, w = 0, h = 0) {
  const s = img.width / 2 // size of one slice

  // corners
  ctx.drawImage(img,
    0, 0, s, s,
    x, y, s, s,
  )
  ctx.drawImage(img,
    s, 0, s, s,
    x + w - s, y, s, s,
  )
  ctx.drawImage(img,
    s, s, s, s,
    x + w - s, y + h - s, s, s,
  )
  ctx.drawImage(img,
    0, s, s, s,
    x, y + h - s, s, s,
  )

  // sides and center (they form a 1px cross in the middle of the img)
  ctx.drawImage(img,
    s, 0, 1, s,
    x + s, y, w - 2 * s, s,
  )
  ctx.drawImage(img,
    s, s, 1, s,
    x + s, y + h - s, w - 2 * s, s,
  )
  ctx.drawImage(img,
    0, s, s, 1,
    x, y + s, s, h - 2 * s,
  )
  ctx.drawImage(img,
    s, s, s, 1,
    x + w - s, y + s, s, h - 2 * s,
  )
  ctx.drawImage(img,
    s, s, 1, 1,
    x + s, y + s, w - 2 * s, h - 2 * s,
  )
}
