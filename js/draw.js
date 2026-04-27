function loot(d, dim) {
  const mapW = d.columns * dim
  const h = d.rows * dim
  const colW = dim / 1.3
  const rowH = dim / 2
  const shift = dim / 8
  const err = dim / 1.8
  const font = 0.35 * dim

  ctx.fillStyle = 'gray'
  ctx.strokeStyle = 'gray'
  ctx.font = font + 'px Arial'

  let col = 0

  for (const color in d.loot) {
    const items = d.loot[color]
    if (!items.length) continue

    const textH = Math.ceil(ctx.measureText(color).width)
    let i = 0
    let lastX = 0
    let lastY = 0

    // first column with vertical color name
    let x = mapW + col * colW + shift

    ctx.rotate(0.5 * Math.PI)
    ctx.fillText(color, 0, -x)
    ctx.rotate(1.5 * Math.PI)

    let y = textH + err
    while (i < items.length && y <= h) {
      ctx.fillText(items[i], x, y)
      lastX = x
      lastY = y
      i++
      y += rowH
    }

    col++

    // next columns for same color
    while (i < items.length) {
      x = mapW + col * colW + shift
      y = font

      while (i < items.length && y <= h) {
        ctx.fillText(items[i], x, y)
        lastX = x
        lastY = y
        i++
        y += rowH
      }

      col++
    }

    // end line only on last column of this color
    ctx.beginPath()
    ctx.moveTo(lastX + dim / 4, lastY)
    ctx.lineTo(lastX + dim / 2, lastY)
    ctx.lineTo(lastX + dim / 2, lastY - 2 * rowH)
    ctx.stroke()
  }
}


function lootColumnCount(d, dim) {
  const h = d.rows * dim
  const row = dim / 2
  const err = dim / 1.8
  const font = 0.35 * dim

  ctx.font = font + 'px Arial'

  let cols = 0

  for (const color in d.loot) {
    const items = d.loot[color]
    if (!items.length) continue

    const textH = Math.ceil(ctx.measureText(color).width)
    const first = Math.max(1, Math.floor((h - textH - err) / row) + 1)
    const next = Math.max(1, Math.floor((h - font) / row) + 1)

    cols += 1 + Math.max(0, Math.ceil((items.length - first) / next))
  }

  return cols
}


function printMap(){//TODO remake, use document.documentElement. to get dimensions of the opened window, print pregenerated animated map, customize printed
  const dataUrl = document.getElementById('mapCanvas').toDataURL()
  let windowContent = '<!DOCTYPE html>'
  windowContent += '<html>'
  windowContent += '<head><title>AZIVON</title></head>'
  windowContent += '<body>'
  windowContent += '<img src="' + dataUrl + '">'
  windowContent += '</body>'
  windowContent += '</html>'
  const printWin = window.open('', '', 'width = 500, height = 300')
  printWin.document.open()
  printWin.document.write(windowContent)
  printWin.document.close()
  printWin.focus()
  printWin.print()
  printWin.close()
}


function getDimension(d){
  //viewport < current canvas size -> decrease dim
  let maxDim = 45
  while (((document.documentElement.clientWidth * 0.9 < maxDim * d.columns + Object.keys(d.loot).length * (maxDim / 1.3)) || (document.documentElement.clientHeight * 0.9 < maxDim * d.rows)) && maxDim > 1){
    maxDim -= 0.1
  }
  /*TODO display map behaviour, how much should be visible and/or not fit the screen, map viewer on top of the web page, browsing easily with arrows and zoomable, minimap, solve together with printing*/
  return maxDim
}


function instantRepaint(d, tiles) {
  const dim = getDimension(d)

  const mapWidth = d.columns * dim
  const mapHeight = d.rows * dim
  const lootColumn = dim / 1.3
  const extraLootColumns = lootColumnCount(d, dim)

  c.width = mapWidth + extraLootColumns * lootColumn + dim
  c.height = mapHeight

  c.style.width = c.width + 'px'
  c.style.height = c.height + 'px'

  loot(d, dim)

  ctx.strokeStyle = 'black'
  for (let t of tiles) t.drawChosen()

  window.onresize = () => instantRepaint(d, tiles)
}
