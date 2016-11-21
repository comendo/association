starter.config(function($stateProvider, $urlRouterProvider) 
{
	var module = "pointage";
  $stateProvider
  .state('app.'+module+'_intro', {
    url: '/'+module,
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/intro.html',
        controller: module+'IntroCtrl'
      }
    }
  })
  .state('app.'+module+'_all', {
    url: '/'+module+'/all',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/all.html',
        controller: module+'AllCtrl'
      }
    }
  })
  .state('app.'+module+'_id', {
    url: '/'+module+'/add/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/pointage.html',
        controller: module+'AddCtrl'
      }
    }
  })
  .state('app.'+module+'_photo', {
    url: '/'+module+'/add/photo/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/photo.html'/*,
        controller: module+'AddPhotoCtrl'*/
      }
    }
  })
  .state('app.'+module+'_details', {
    url: '/'+module+'/details',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/details.html',
        controller: module+'DetailsCtrl'
      }
    }
  })
  .state('app.'+module+'_search', {
    url: '/'+module+'/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/search.html',
        controller: module+'SearchCtrl'
      }
    }
  })
  .state('app.'+module+'_stats', {
    url: '/'+module+'/statistiques',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/statistiques.html',
        controller: module+'StatsCtrl'
      }
    }
  }); 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});