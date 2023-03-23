//TODO remove this file
const d = createDefaultDeck()
m = generateMap(d, d.columns, d.rows)

function generateMapIndexHtml(){
  for (const l in d.loot) d.loot[l] = []
  for (const c in d.count) d.count[c] = 0
  m = generateMap(d, 15, 15)
}
