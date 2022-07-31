dimension = 35

makeColor('grass', 'flooring', '#8BC766', 250)
makeColor('desert', 'flooring', '#FFFFA5', 50, [{action: 0, colors: 'snow', radius: 3}, {action: 50, colors: 'desert', radius: 3}, {action: 0, colors: 'woods', radius: 0}])
makeColor('snow', 'flooring', '#FFFFFF', 50, [{action: 0, colors: 'desert, sahara', radius: 3}, {action: 50, colors: 'snow', radius: 3}])
makeColor('water', 'flooring', '#66BBDD', 5, [{action: 80, colors: 'water', radius: 3}, {action: 0, colors: 'material, mountains, lake, woods, village, metal, gold, castle, castle2', radius: 0}])

makeColor('noElement', 'element', 'none', 100, undefined, 0)
makeColor('mountains', 'element', '#A75F49', 5, [{action: 0, colors: 'water', radius: 0}], 3)
makeColor('woods', 'element', '#BCA26F', 5, [{action: 0, colors: 'water, desert, village, metal, gold, castle, castle2', radius: 0}], 2)
makeColor('lake', 'element', '#64E1E2', 5, [{action: 0, colors: 'water, village, metal, gold, castle, castle2, material', radius: 0}], 2)

makeColor('noFeature', 'feature', 'none', 200, undefined, 0)
makeColor('village', 'feature', '#FD7C7C', 1, [{action: 0, colors: 'water, woods, lake', radius: 0}], undefined, true)
makeColor('metal', 'feature', '#8E9EA5', 1, [{action: 0, colors: 'water, woods, lake', radius: 0}])
makeColor('gold', 'feature', '#C2AB35', 1, [{action: 0, colors: 'water, woods, lake', radius: 0}])
makeColor('castle', 'feature', '#AAAAAA', 1, [{action: 0, colors: 'water, woods, lake', radius: 0}])
makeColor('castle2', 'feature', '#AAAAAA', 1, [{action: 0, colors: 'water, woods, lake', radius: 0}], 2)
makeColor('material', 'feature', '#D494D0', 5, [{action: 0, colors: 'water, lake', radius: 0}])
  
mapMain(d.columns, d.rows)
