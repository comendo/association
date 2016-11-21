starter.config(function($stateProvider, $urlRouterProvider) 
{
	var module = "rapport";
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
        templateUrl: 'templates/'+module+'/all.html'/*,
        controller: module+'AllCtrl'*/
      }
    }
  })
  .state('app.'+module+'_choice', {
    url: '/'+module+'/choice',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/choice.html',
        controller: module+'ChoiceCtrl'
      }
    }
  }) 
  /**************debut gestion rapport incident****************/
  .state('app.'+module+'_incident_add', {
    url: '/'+module+'/incident/add',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/incident/form.html',
        controller: module+'IncidentAddCtrl'
      }
    }
  })
  .state('app.'+module+'_incident_update', {
    url: '/'+module+'/incident/update/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/incident/form.html',
        controller: module+'IncidentUpdateCtrl'
      }
    }
  })
  .state('app.'+module+'_incident_details/:id', {
    url: '/'+module+'/incident/details/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/incident/details.html',
        controller: module+'IncidentDetailsCtrl'
      }
    }
  })
  /***************fin gestion rapport incident*****************/
  .state('app.'+module+'_photo', {
    url: '/'+module+'/add/photo/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/photo.html'/*,
        controller: module+'AddPhotoCtrl'*/
      }
    }
  })
  .state('app.'+module+'_details/:id', {
    url: '/'+module+'/details/:id',
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
  $urlRouterProvider.otherwise('/app/login');
});