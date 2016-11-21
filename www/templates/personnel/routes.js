starter.config(function($stateProvider, $urlRouterProvider) 
{
	var module = "personnel";
  $stateProvider
  /*.state('app.'+module+'_intro', {
    url: '/'+module+'/intro',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/intro.html',
        controller: module+'IntroCtrl'
      }
    }
  })
  */.state('app.'+module+'_all', {
    url: '/'+module,
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/all.html',
        controller: module+'AllCtrl'
      }
    }
  })
  .state('app.'+module+'/:uid/intro', {
    url: '/'+module+'/:uid/intro',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/intro.html',
        controller: module+'IntroCtrl'
      }
    }
  })
  /**********************debut gestion informations*************************/
  .state('app.informations_details/:uid/details', {
    url: '/informations/:uid/details',
    views: {
      'menuContent': {
        templateUrl: 'templates/informations/details.html',
        controller: 'informationsDetailsCtrl'
      }
    }
  })
  
  /*.state('app.'+module+'_informations_details/:id', {
    url: '/'+module+'/informations/details/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/'+module+'/informations/details.html',
        controller: module+'InformationsDetailsCtrl'
      }
    }
  })*/
  .state('app.informations_update', {
    url: '/informations/:uid/update',
    views: {
      'menuContent': {
        templateUrl: 'templates/informations/form.html',
        controller: 'informationsUpdateCtrl'
      }
    }
  })
  .state('app.informations_add', {
    url: '/informations/add',
    views: {
      'menuContent': {
        templateUrl: 'templates/informations/form.html',
        controller: 'informationsAddCtrl'
      }
    }
  })
  /**********************fin gestion informations*************************/
  /**********************debut gestion poste*************************/
  .state('app.poste/:uid/details', {
    url: '/poste/:uid/details',
    views: {
      'menuContent': {
        templateUrl: 'templates/poste/details.html',
        controller: 'posteDetailsCtrl'
      }
    }
  })
  .state('app.poste_update', {
    url: '/poste/:uid/update',
    views: {
      'menuContent': {
        templateUrl: 'templates/poste/form.html',
        controller: 'posteUpdateCtrl'
      }
    }
  })
  .state('app.poste_add', {
    url: '/poste/add',
    views: {
      'menuContent': {
        templateUrl: 'templates/poste/form.html',
        controller: 'posteAddCtrl'
      }
    }
  })
  /**********************fin gestion poste*************************/
   /**********************debut gestion presence*************************/
  .state('app.presence/:id', {
    url: '/presence/details/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/presence/details.html',
        controller: 'PresenceDetailsCtrl'
      }
    }
  })
  .state('app.presence_update', {
    url: '/presence/update/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/presence/form.html',
        controller: 'PresenceUpdateCtrl'
      }
    }
  })
  .state('app.presence_add', {
    url: '/presence/add',
    views: {
      'menuContent': {
        templateUrl: 'templates/presence/form.html',
        controller: 'PresenceAddCtrl'
      }
    }
  })
  /**********************fin gestion presence*************************/
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