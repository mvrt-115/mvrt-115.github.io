var $ = require('jquery')

var $btn = $('.site-nav-btn')
  , $navUl = $('.site-nav ul')

exports.init = function () {
  $btn.click(function () {
    $navUl.toggleClass('js-active')
  })
}
