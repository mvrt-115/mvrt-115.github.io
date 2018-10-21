exports.arrow = arrow

// really wish there was easy currying...
function arrow (direction, disabled) {
  if (!/left|right|up|down/.test(direction)) {
    throw new Error('Wrong direction...')
  }

  return '<button class="arrow arrow-' + direction + '" type="button"' +
    (disabled ? ' disabled' : '') + '><i></i><i></i></button>'
}

exports.left = arrow('left')
exports.right = arrow('right')
exports.up = arrow('up')
exports.down = arrow('down')

exports.leftDisabled = arrow('left', true)
exports.rightDisabled = arrow('right', true)
exports.upDisabled = arrow('up', true)
exports.downDisabled = arrow('down', true)
