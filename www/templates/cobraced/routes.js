starter.config(function($stateProvider, $urlRouterProvider) 
{
	var module = "cobraced";
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
  .state('app.'+module+'_RegChoice', {
    url: '/'+module+'/reglements/choice',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/reglements/choice.html',
        controller: module+'RegChoiceCtrl'
      }
    }
  })
  .state('app.'+module+'_RegPeri', {
    url: '/'+module+'/reglements/periscolaire',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/reglements/periscolaire.html',
        controller: module+'RegPeriCtrl'
      }
    }
  })
  /*.state('app.'+module+'_poste', {
    url: '/'+module+'/poste',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/poste.html',
        controller: module+'IntroCtrl'
      }
    }
  })
  .state('app.'+module+'_intro2', {
    url: '/'+module+'/intro2',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/intro2.html',
        controller: module+'IntroCtrl'
      }
    }
  })
  .state('app.'+module+'_add', {
    url: '/'+module+'/add',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/form.html',
        controller: module+'AddCtrl'
      }
    }
  })
  .state('app.'+module+'_update', {
    url: '/'+module+'/update',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/form.html',
        controller: module+'UpdateCtrl'
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
  })*/; 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});