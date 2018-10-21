var $ = require('jquery')
  , arrows = require('./arrows')

var homepage = module.exports = (function () {

  // checks if the page is a homepage
  var isHomePage = !!$('.home').length

  // http://bit.ly/1BfD1DW
  function scrollStep (scrollTop) {
    $('html, body').animate({ scrollTop: scrollTop }, 750, 'linear')
  }

  // binds UI events
  function bindUIEvents () {
    $('.step').append(arrows.down)
    $('.step .arrow').click(function () {
      scrollStep($(this).parent().next().position().top)
    })
  }

  // initializes if it's on a home page
  function init () {
    if (!isHomePage) return
    bindUIEvents()
  }

  return {
    init: init
  }

})()
