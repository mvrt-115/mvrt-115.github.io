var url = require('url')
  , path = require('path')
//  , xtend = require('xtend')
//  , filter = require('filter-values')

var PROTOCOL = 'https'
var HOST = 'picasaweb.google.com'
var BASE_PATH = '/data/feed'
var QUERY = { alt: 'json', imgmax: '1600', thumbsize: '160c' }
var DEFAULT_PROJECTION = 'base'
var PARAMETERS = /^(?:access|bbox|fields|imgmax|kind|l|max-results|prettyprint|q|start-index|tag|thumbsize)$/

/**
 * Returns a Picasa Web Album API URL, JSON style
 * NOTE: It only supports user, album, and photo data.
 * @param {object} options Options, such as userId, albumId, photoId, query parameters
 * @returns {string} The Picasa API URL
 */
module.exports = function picasaUrl (options) {
  if (!options) throw new Error('no options')
  if (!options.userId) {
    throw new Error('no userid')
  }
  if (!options.albumId && options.photoId) {
    throw new Error('no albumid')
  }
  var pathname = path.join(BASE_PATH, options.projection || DEFAULT_PROJECTION)
    , query = xtend(QUERY, filter(options, getParameters))
  if (options.userId) {
    pathname = path.join(pathname, 'user', options.userId)
    if (options.albumId) {
      pathname = path.join(pathname, 'albumid', options.albumId)
      if (options.photoId) {
        pathname = path.join(pathname, 'photoid', options.photoId)
      }
    }
  }
  return url.format({
    protocol: PROTOCOL,
    host: HOST,
    pathname: pathname,
    query: query
  })
}

function getParameters (val, param) {
  return PARAMETERS.test(param)
}

// just because im not sure how the build script works
function xtend (obj) {
  for (var i = 1, l = arguments.length; i < l; i++) {
    for (var prop in arguments[i]) {
      if (arguments[i].hasOwnProperty(prop)) {
        obj[prop] = arguments[i][prop]
      }
    }
  }
  return obj
}

function filter (obj, fn) {
  var result = {}
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (fn(obj[prop], prop, obj)) {
        result[prop] = obj[prop]
      }
    }
  }
  return result
}
