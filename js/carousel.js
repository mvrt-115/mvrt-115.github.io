var $ = require('jquery')
  , arrows = require('./arrows')

module.exports = Carousel

function Carousel (options) {

  if (!(this instanceof Carousel)) return new Carousel(options)

  options = options || {}

  if (!options.photos) return
  if (!options.element) options.element = $('<div class="gallery-photos"></div>')

  var photos = options.photos
    , index = 0
    , numPhotos = options.photos.length
    , $element = options.element instanceof $ ? options.element : $(options.element)
    , $left = $(arrows.left).on('click', prev)
    , $right = $(arrows.right).on('click', next)
    , $close = $('<button type="button" class="button-close">×</button>').on('click', destroy)
    , $main = $('<div class="gallery-photos-main"></div>')
    , $photos = photos.map($ifyPhotoThumbnail)
    , $thumbs = $('<ul></ul>').append($photos)
    , $thumbsWrap = $('<div class="gallery-photos-carousel"></div>').append($thumbs)
    , $currThumb

  $element
    .append($left)
    .append($right)
    .append($close)
    .append($main)
    .append($thumbsWrap)

  function setIndex (idx) {
    if (idx < 0 || idx >= numPhotos) return
    index = idx
    return index
  }

  function move (idx) {
    if (setIndex(idx) == null) return
    displayPhoto(idx)
    setArrows(idx)
    setThumb(idx)
    return idx
  }

  function next () {
    return move(index + 1)
  }

  function prev () {
    return move(index - 1)
  }

  function init () {
    move(index)
    return this
  }

  function displayPhoto (idx) {
    var photo = photos[idx]
    $main.empty()
    $main.append(photo.medium === 'video' ? '<video controls src=' + photo.src + '>' : '<img src=' + photo.src + '>')
  }

  function setArrows (idx) {
    if (idx === 0) $left.prop('disabled', true)
    else $left.prop('disabled', false)
    if (idx === numPhotos - 1) $right.prop('disabled', true)
    else $right.prop('disabled', false)
  }

  function setThumb (idx) {
    if ($currThumb) $currThumb.removeClass('js-active-thumb')
    $currThumb = $photos[idx].addClass('js-active-thumb')
  }

  function getElement () {
    return $element
  }

  function destroy () {
    $element.remove()
  }

  /**
   * jQueryify the thumbnailish again
   * @param {Object} photo { src, thumb }
   * @returns {jQuery} jQuery object of the photo thumb
   */
  function $ifyPhotoThumbnail (photo, index) {
    var $thumb = $('<li></li>')
      , $img = $('<img src=' + photo.thumb + '>')
    return $thumb
      .append($img)
      .attr('data-photo-src', photo.src)
      .on('click', function () {
        move(index)
      })
  }

  return {
    move: move,
    next: next,
    prev: prev,
    init: init,
    getElement: getElement,
    destroy: destroy
  }

}
