function loot(d, dim){
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
    ctx.lineTo(d.columns * dim + col * lootColumn + shift + dim / 4, textWidth + row * lootRow + textWidthError)
    ctx.lineTo(d.columns * dim + col * lootColumn + shift + dim / 2, textWidth + row * lootRow + textWidthError)
    ctx.lineTo(d.columns * dim + col * lootColumn + shift + dim / 2, textWidth + (row - 2) * lootRow + textWidthError)
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

function instantRepaint(d, tiles){//TODO use canvas rescale
  const dim = getDimension(d)
  c.width = d.columns * dim
  c.height = d.rows * dim
  if (!d.timers.length){
    if (c.height < maxLootAmmount(d, dim)) c.height = maxLootAmmount(d, dim)
    c.width += withLoot(d) * (dim / 1.3)
    loot(d, dim)
  }
  c.style.width = c.width + 'px'
  c.style.height = c.height + 'px'
  ctx.strokeStyle = 'black'
  for (let t of tiles) t.drawChosen()
  window.onresize = () => instantRepaint(d, tiles)
}
