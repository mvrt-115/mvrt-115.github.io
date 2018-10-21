module.exports = redirect

// paths to migrate
var paths = {

  'first': '/about/',
  'games': '/about/#robot-game',
  'ultimateascent': '/about/#robot-game',
  'reboundrumble': '/about/#robot-game',
  'logomotion': '/about/#robot-game',
  'breakaway': '/about/#robot-game',
  'lunacy': '/about/#robot-game',
  'overdrive': '/about/#robot-game',
  'racknroll': '/about/#robot-game',
  'manuals': '/about/#robot-game',

  'team': '/about/',
  'history': '/about/#team-history',
  'eltoro': '/about/#robots',
  'awards': '/about/#team-history',
  'outreach': '/about/#outreach',
  'firstoutreach': '/about/#outreach',
  'localoutreach': '/about/#outreach',
  'internationaloutreach': '/about/#outreach',
  'sponsorinvolvement': '/about/#outreach',
  'girlsengineer': '/about/#outreach',
  'sponsors': '/about/sponsors',
  'members': '/about/people/',
  'officers': '/about/people/#officers',
  'alumni': '/about/people/alumni/',
  'projectleads': '/about/people/', // TODO project leads section?
  'mentors': '/about/people/mentors/',
  'divisions': '/about/#divisions',

  'joinmvrt2': '/join/',
  'calendar': '/members/calendar/',
  'parents': '/members/parents/',
  'scholarships': '/members/scholarships/',
  'snackschedule': '/members/snackschedule/',
  'competitions': '/members/competitions/',

  'gallery': '/media/gallery/',
  'videos': '/media/videos/',
  'publicity': '/media/publicity/',
  'animations': '/media/animations/',
  'website': '/media/website/',

  'firstaidkit': '/resources/firstaidkit/',
  'generalmanagement': '/resources/firstaidkit/#general',
  'build': '/resources/firstaidkit/#build',
  'electrical': '/resources/firstaidkit/#electrical',
  'parts': '/resources/firstaidkit/#parts',
  'chairmans': '/resources/firstaidkit/#chairmans',
  'finance': '/resources/firstaidkit/#finance',
  'media': '/resources/firstaidkit/#media',
  'trainings': '/resources/trainings/',
  'documents': '/resources/documents/',
  'videoresources': '/resources/videos/',
  'links': '/resources/links/',
  'contact': '/contact/'

}

// redirects if there is a corresponding page to redirect to
function redirect () {
  var path = location.search.toLowerCase().replace(/^\?/, '')
  if (paths[path]) location.href = paths[path]
}
