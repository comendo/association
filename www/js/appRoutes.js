starter.config(function($stateProvider, $urlRouterProvider) 
{
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  
  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
    	  controller: 'HomeCtrl'
    	  }
      }
    })
    .state('app.login', {
    url: '/login',
    views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
    	  controller: 'LoginCtrl'
    	  }
      }
    }); 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});