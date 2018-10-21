var $ = require('jquery')
  , Waypoint = require('waypoints')
  , sticky = require('sticky')


var $nav
  , $navUl
  , $navLinks
  , $footer
  , stickyNav
  , anchors
  , anchorTimeout

function bindElements () {
  $nav = $('.document-nav')
  $navUl = $('.document-nav ul')
  $navLinks = $('.document-nav a')
  $footer = $('.site-footer')
}

function setNavWidth () {
  var navWidth = $nav.width()
  $navUl.width(navWidth)
}

function bindUIEvents () {

  if (!$navUl[0]) return
  stickyNav = new Waypoint.Sticky({
    element: $navUl[0],
    wrapper: null
  })

  $(window).scroll(function () {
    var navHeight = $nav[0].clientHeight
      , footerTop = $footer[0].getBoundingClientRect().top
    if (navHeight > footerTop) {
      $navUl.css('top', footerTop - navHeight + 'px')
    } else $navUl.css('top', '0px')
  })

  $(window).on('resize', setNavWidth)

  anchors = $navLinks.map(function () {
    return $(this).attr('href')
  }).filter(function () {
    return /^#/.test(this)
  }).map(function (index, element) {
    return $(element)[0]
  }).waypoint({
    handler: function () {
      setActive($('[href="#' + this.element.id + '"]').parent())
    }
  })

  $nav.on('click', 'a', function (e) {
    if ($(this).attr('data-subpage-url')) return
    clearTimeout(anchorTimeout)
    var $target = $($(this).attr('href'))
    e.preventDefault() // this removes the anchorlinks
    $('html, body').animate({
      scrollTop: $target.position().top
    }, 750)
    disableAnchors()
    setActive($(this).parent())
    anchorTimeout = setTimeout(enableAnchors, 800)
  })

}

function setActive ($el) {
  $('.active').removeClass('active')
  $el.addClass('active')
}

function disableAnchors () {
  anchors.forEach(function (anchor) {
    anchor.disable()
  })
}

function enableAnchors () {
  anchors.forEach(function (anchor) {
    anchor.enable()
  })
}


exports.init = function init () {
  if (!$('.document').length) return
  bindElements()
  if (!$nav.length) return
  bindUIEvents()
  setNavWidth()
}
