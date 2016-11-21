angular.module('starter.controllers', [])

.controller('DashCtrl',["$scope", "Chats", function($scope, Chats) {
	var starCountRef = firebase.database().ref('chats');
$scope.chats = [];
starCountRef.on("value", function(snapshot) {
     	//$scope.$apply(function() {
     		$scope.chats = snapshot.val();
		 //});
	 });
	 
	 
	 $scope.test = function()
	 {
	 	var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(
    result => {
        console.log("federated (google) result", result);
    },
    error => {
        console.log("federated (google) error", error);
    }
);
/*debut information profile utilisateur connecté*/
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
  console.log("name:",name);
  console.log("email:",email);
  console.log("photoUrl:",photoUrl);
  console.log("uid:",uid);
}
/*fin information profile utilisateur connecté*/

/*debut information specifique profile utilisateur connecté*/
var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: "+profile.providerId);
    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
    console.log("  Email: "+profile.email);
    console.log("  Photo URL: "+profile.photoURL);
  });
}
/*fin information specifique profile utilisateur connecté*/


	 	/*firebase.auth().signInWithEmailAndPassword("babas.doq@gmail.com", "aaaaaa").then(function(succes) {
  // Handle Errors here.
  console.log("tu es connecté:", succes.email);
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log("errorCode:", errorCode);
  console.log("errorMessage:", errorMessage);
//});
	 	/*console.log("je suis dans test");
	 	firebase.auth().createUserWithEmailAndPassword("babas.doq@gmail.com", "aaaaaa").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log("errorCode:", errorCode);
  console.log("errorMessage:", errorMessage);*/
//});	
	 };
  	
}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
var starCountRef = firebase.database().ref('chats');
$scope.chats = [];
starCountRef.on("value", function(snapshot) {
     	$scope.$apply(function() {
     		$scope.chats = snapshot.val();
     		console.log("$scope.chats:",$scope.chats);
		 });
	 });
starCountRef.on("child_changed", function(snapshot) {
     	//$scope.$apply(function() {
     		$scope.chats = snapshot.val();
     		console.log("$scope.chats:",$scope.chats);
		 //});
	 });
  //$scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	var starCountRef = firebase.database().ref('chats/'+$stateParams.chatId);
	starCountRef.on("value", function(snapshot) {
     	//$scope.$apply(function() {
     		$scope.chat = snapshot.val();
     		console.log("$scope.chat:",$scope.chat);
		 //});
	 });
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
