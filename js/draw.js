function loot(d){
  const dim = getDimension(d)
  const lootColumn = dim / 1.3
  const shift = dim / 8
  const textWidthError = dim / 1.8
  const lootRow = dim / 2
  ctx.fillStyle = 'gray'
  ctx.strokeStyle = 'gray'
  ctx.font = 0.35 * dim + 'px Arial'
  let col = 0
  for (const l in d.loot){
    if (!d.loot[l].length) continue
    const textWidth = Math.ceil(ctx.measureText(l).width)
    ctx.rotate(0.5 * Math.PI)
    ctx.fillText(l, 0, - (d.columns * dim + col * lootColumn + shift))
    ctx.rotate(1.5 * Math.PI)
    let row = 0
    for (const ll of d.loot[l]){
      ctx.fillText(ll, d.columns * dim + col * lootColumn + shift, textWidth + row * lootRow + textWidthError)
      row++
    }
    row--
    ctx.beginPath()
    ctx.lineTo(d.columns * dim + col * lootColumn + shift, textWidth + row * lootRow + textWidthError + dim / 10)
    ctx.lineTo(d.columns * dim + col * lootColumn + shift + dim / 2, textWidth + row * lootRow + textWidthError + dim / 10)
    ctx.lineTo(d.columns * dim + col * lootColumn + shift + dim / 2, textWidth + (row - 2) * lootRow + textWidthError + dim / 10)
    ctx.stroke()
    col++
  }
}

function withLoot(d){
  let withLoot = 0
  for (const l in d.loot){
    if (d.loot[l].length) withLoot++
  }
  return withLoot
}

function maxLootAmmount(d, dim) {
  ctx.font = 0.35 * dim + 'px Arial'
  let max = 0
  for (const l in d.loot){
    if (max < d.loot[l].length * dim / 2 + Math.ceil(ctx.measureText(l).width)){
      max = d.loot[l].length * dim / 2 + Math.ceil(ctx.measureText(l).width)
    }
  }
  return max + dim / 1.8 //needed because of some error when writing vertical text; previous const was 23pixels
}

function printMap(){
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
  let maxDim = 45
  //viewport < current canvas size -> decrease dim
  while (((document.documentElement.clientWidth * 0.9 < maxDim * d.columns + withLoot(d) * (maxDim / 1.3)) || (document.documentElement.clientHeight * 0.9 < maxDim * d.rows)) && maxDim > 5){
    maxDim -= 0.1
  }
  /*TODO if dimensions smaller than 30 fit to the whole page
  if dimensions larger no need to fit in the whole height of the map
  this means width is more important
  the viewport height affcts the dim however it doesn't try to fit the canvas all in, only two thirds, hence the multiplyer 1.5 for the current viewport height*/
  return maxDim
}

function instantRepaint(d, tiles){
  const dim = getDimension(d)
  c.width = d.columns * dim + withLoot(d) * (dim / 1.3)
  c.style.width = c.width + 'px'
  c.height = d.rows * dim
  if (!d.timers.length){
    if (c.height < maxLootAmmount(d, dim)) c.height = maxLootAmmount(d, dim)
    loot(d)
  }
  c.style.height = c.height + 'px'
  ctx.strokeStyle = 'black'
  for (let t of tiles) t.drawChosen()
  window.onresize = () => instantRepaint(d, tiles)
}
