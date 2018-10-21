// why the hell don't any of the gh libraries work for merging?

var $ = require('jquery')

module.exports = function ghMerge (options, cb) {
  if (!options.user || !options.repo || !options.number || !options.token) cb(new Error('Not enough options.'))
  $.ajax({
    headers: {
      'Accept': 'application/vnd.github.v3.raw+json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'token ' + options.token
    },
    data: JSON.stringify({}),
    url: 'https://api.github.com/repos/' + options.user + '/' + options.repo + '/pulls/' + options.number + '/merge',
    type: 'PUT'
  })
  .done(function (data) {
    cb(null, data)
  })
  .fail(function (jqXHR, textStatus, err) {
    cb(err)
  })
}

