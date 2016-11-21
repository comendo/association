starter_ctrl.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('LoginCtrl', function ($scope, $ionicModal, $state, $ionicLoading, $rootScope) {
console.log('Login Controller Initialized');
/*****************************/
var user = firebase.auth().currentUser;

if (user != null) {
	console.log("user.uid:",user.uid);
console.log("user.displayName:",user.displayName);
console.log("user.email:",user.email);
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: "+profile.providerId);
    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
    console.log("  Email: "+profile.email);
    console.log("  Photo URL: "+profile.photoURL);
  });
  $state.go('app.home');
 }
 else{
 	
  
/*****************************/
$ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
}).then(function (modal) {
    $scope.modal = modal;
});

$scope.createUser = function (user) {
    console.log("Create User Function called");
    if (user && user.email && user.password && user.displayname) {
        $ionicLoading.show({
            template: 'Signing Up...'
        });

        auth.$createUser({
            email: user.email,
            password: user.password
        }).then(function (userData) {
            alert("User created successfully!");
            ref.child("users").child(userData.uid).set({
                email: user.email,
                displayName: user.displayname
            });
            $ionicLoading.hide();
            $scope.modal.hide();
        }).catch(function (error) {
            alert("Error: " + error);
            $ionicLoading.hide();
        });
    } else
        alert("Please fill all details");
}

$scope.signIn = function (user) {

    if (user && user.email && user.pwdForLogin) {
        $ionicLoading.show({
            template: 'Signing In...'
        });
        firebase.auth().signInWithEmailAndPassword(user.email, user.pwdForLogin).then(function (authData) {
            console.log("Logged in as:" + authData.uid);
            
	
            /*ref.child("users").child(authData.uid).once('value', function (snapshot) {
                var val = snapshot.val();
                // To Update AngularJS $scope either use $apply or $timeout
                $scope.$apply(function () {
                    $rootScope.displayName = val;
                });
            });*/
            $ionicLoading.hide();
            $state.go('app.home');
        }).catch(function (error) {
            alert("Authentication failed:" + error.message);
            alert("Authentication failed, code:" + error.code);
            $ionicLoading.hide();
        });
    } else
        alert("Please enter email and password both");
}
}
})

/************ /
.controller('LoginCtrl', ["$scope", "$state", "Auth",function($scope, $state, Auth) {
	console.log("je suis dans LoginCtrl");
	/*
	 $scope.auth = Auth;
console.log("Auth:",Auth);
    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    	console.log("firebaseUser:",firebaseUser);
      $scope.firebaseUser = firebaseUser;
    });*/
    /*var ref = new Firebase("https://comendo-asso.firebaseio.com/");* /
    $scope.connectUser = function(mail,pwd) {
    	//mail = "'"+mail+"'";
    	console.log("email:", mail);
      console.log("pwd:", pwd);
    Auth.$signInWithEmailAndPassword(mail,pwd).then(function(authData) {
  console.log("Logged in as:", authData.uid);
  $state.go('app.home');
}).catch(function(error) {
  console.error("Authentication failed:", error);
});
    };
    
    $scope.createUser = function(email,password) {
      $scope.message = null;
      $scope.error = null;
      
      console.log("user.email:", email);
      console.log("user.password:", password);
      // Create a new user
      Auth.$createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
        }).catch(function(error) {
          $scope.error = error;
        });
    };
	$scope.deleteUser = function() {
      $scope.message = null;
      $scope.error = null;

      // Delete the currently signed-in user
      Auth.$deleteUser().then(function() {
        $scope.message = "User deleted";
      }).catch(function(error) {
        $scope.error = error;
      });
    };
    
    
    
    /***************** /
    $scope.auth = Auth;

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      console.log("$scope.firebaseUser:",$scope.firebaseUser);
    });
    /***************** /
auth.onuthStateChanged(function(user){
	if(user){
		setUsername(user.displayName);
	}
	else{
		setUsername("web");
	}
}* /
  }])
	/*$scope.loginWithGoogle = function loginWithGoogle() {
  	console.log("on est dans le google truc!");
    Auth.$authWithOAuthPopup('google')
    Auth.$authWithOAuthPopup('google')
      .then(function(authData) {
      	console.log("on est bon!");
        $state.go('app.home');
      });
  };
  $scope.user = {};
  $scope.loginWithGoogle = function(e){
     //e.preventDefault();
     var username = $scope.user.email;
     var password = $scope.user.password;
     Auth.$authWithPassword ({
                email: username,
                password: password
            })
            .then(function(user) {
                //Success callback
                console.log('Authentication successful');
            }, function(error) {
                //Failure callback
                console.log('Authentication failure');
            });
  }
  */
/************/

.controller('HomeCtrl',["$scope", function($scope) {
	console.log("je suis dans le HomeCtrl");
  $scope.categories = [
    { title: 'ACED', url:'aced'},
    { title: 'COBRACED', url:'cobraced'},
    { title: 'Visiteur', url:'visiteur'},
    { title: 'Réunion', url:'reunion'},
    { title: 'Rapport', url:'rapport/choice'},
    { title: 'Pointage', url:'pointage/all'},
    { title: 'Personnel', url:'personnel'},
    { title: 'Emprunts', url:'emprunts'}
  ];
}])
.controller('allPlayersCtrl', function($scope) {
  $scope.sports = [
    { title: 'Volley-Ball', id: 1 },
    { title: 'Basket-ball', id: 2 },
    { title: 'Football', id: 2 },
    { title: 'Cyclisme', id: 2 },
    { title: 'Athlétisme', id: 2 },
    { title: 'Baseball', id: 2 },
    { title: 'Cricket', id: 2 } 
  ];
})
.controller('addPlayerCtrl', function($scope) {
  $scope.sports = [
    { title: 'Volley-Ball', id: 1 },
    { title: 'Basket-ball', id: 2 },
    { title: 'Football', id: 2 },
    { title: 'Cyclisme', id: 2 },
    { title: 'Athlétisme', id: 2 },
    { title: 'Baseball', id: 2 },
    { title: 'Cricket', id: 2 }
  ];
})
.controller('SportCtrl', function($scope, $stateParams,$state) {
	console.log("$stateParams.sportsTitle:");
	console.log($stateParams.sportsTitle);
	//if($stateParams.sportId == 1)$state.go('app.volleyball');
	$scope.sport = $stateParams.sportsTitle;
	$scope.bientot = "Bientôt le "+$scope.sport+" sur SportAddict";
});
