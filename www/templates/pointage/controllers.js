var module = 'pointage';
starter.controller(module+'AddCtrl', function($scope, $ionicModal, $timeout) {

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
.controller(module+'IntroCtrl', function($scope, $appDB,$stateParams) 
{
	$scope.module = 'pointage';
	if($stateParams != null)$scope.persoId = $stateParams.id;
	console.log("je suis dans pointageIntroController");
	console.log("$scope.persoId:");
	console.log($scope.persoId);
  $scope.menus = [
    { title: 'Informations', url: 'informations' },
    { title: 'Fiche de poste', url: 'poste'},
    { title: 'Présence', url: 'presence'},
    { title: 'Paye', url: 'paye'},
    { title: 'Congés', url: 'conges'},
    { title: 'Autorisation de sortie', url: 'sortie'},
    { title: 'Rapport', url: 'rapport'}
  ];
  $scope.menus2 = [
    { title: 'Informations', url: 'informations' },
    { title: 'Fiche de poste', url: 'poste'},
    { title: 'Présence', url: 'presence'},
    { title: 'Paye', url: 'paye'},
    { title: 'Congés', url: 'conges'},
    { title: 'Autorisation de sortie', url: 'sortie'},
    { title: 'Rapport', url: 'rapport'}
  ];
})
.controller(module+'PosteUpdateCtrl', function($scope, $personnelDB,$stateParams, $state, $rootScope, Personnel, socket,$interval, $cordovaPrinter)  
{
	console.log("je suis dans PosteUpdateCtrl");
	$scope.services = Personnel.setObjet("services");
	//$scope.mission = Personnel.setObjet("mission");
	$scope.missions = [
		{
			"mission":"mission1 encore un test seb",
			"activite":"activite1 pour tester"
		},
		{
			"mission":"dfsfsqfqsf",
			"activite":"gebrteztg"
		},
		{
			"mission":"fgbdfbvgdsg",
			"activite":"dfbvsdfgs"
		}
	];
		
	$scope.aced = {};
	var pos;
	console.log("$scope.services:");
	console.log($scope.services);
	
	$personnelDB.startListening();
	//Affichage et mise à jour en instantane des details du visiteur à chaque changement de la BDD
    $rootScope.$on("$personnelDB:change", function(event, data) 
    {
    	console.log("data:");
		console.log(data);
			
        //affiche la personne correspondant a l'id
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        {
			$scope.aced = data.doc;
			console.log("$scope.aced.personnel:");
			console.log($scope.aced.personnel);
			for(var i=0;i<$scope.aced.personnel.length;i++)
			{
				console.log("$scope.aced.personnel[i].id:");
				console.log($scope.aced.personnel[i].id);
				if($scope.aced.personnel[i].id == $stateParams.id)
				{
					$scope.persoId = $stateParams.id;
					$scope.poste = $scope.aced.personnel[i].poste;
					pos = i;
					console.log("$scope.poste:");
					console.log($scope.poste);					
				}	
			}
			$scope.$apply();
		}
    });
    /*********************************************/
	socket.on("test", function(data) 
    {
    	console.log("je retourne dans data:");
	    console.log(data);
	    $scope.poste = data;
	});
	/*$scope.sock = function()
	{
		console.log("je viens de cliqué sur sock!!");
		$scope.compteur = 0;
		var go = $interval(function () {
			$scope.compteur += 1;
			console.log("$scope.compteur:");
			console.log($scope.compteur);
	        //socket.broadcast.emit('test2', $scope.compteur);
	        socket.emit('test', $scope.compteur);
	        }, 1000); 
	        //go;
	};*/
    $scope.sock = function(poste)
	{
		console.log("poste:");
		console.log(poste);
	    console.log("pos:");
		console.log(pos);   
		$scope.poste = poste;
		socket.emit('test', $scope.poste);    
	};
	/*********************************************/
	/********************debut print*************************/
	$scope.test = function()
	{
		console.log("j'ai cliqué sur imprimer!!");
		alert("j'ai cliqué sur imprimer!!");
		//var printerAvail = $cordovaPrinter.isAvailable();
		var doc = "<html> ... </html>";
  		$cordovaPrinter.print(doc);
  	};
	/*********************fin print**************************/
	
	//Ajoute une mission
    $scope.addMission = function() {
  	 console.log("g clické sur addMission!");
     $scope.aced.personnel[pos].poste.missions_poste.push({
			mission:"",
			activite:""
		});
		//$scope.$apply();
		console.log("$scope.aced_add:");
		console.log($scope.aced);
    };
    
    //Rafraîchit notre liste de tâche près une suppresion
    $scope.deleteMission = function(item) {
    	console.log("item:");
    	console.log(item);
       $scope.aced.personnel[pos].poste.missions_poste.splice($scope.aced.personnel[pos].poste.missions_poste.indexOf(item), 1);
    };
    
    /*****************************/
    $scope.printDiv = function (div) {
    	console.log("je suis dans printDiv");
  var docHead = document.head.outerHTML;
  var printContents = document.getElementById(div).outerHTML;
  var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

  var newWin = window.open("", "_blank", winAttr);
  var writeDoc = newWin.document;
  writeDoc.open();
  writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
  writeDoc.close();
  newWin.focus();
}
    /*****************************/
	$scope.submitForm = function(poste)
	{
		console.log("je suis dans le submit de personnelPosteCtrl");
		console.log("poste:");
		console.log(poste);
		console.log("pos:");
		console.log(pos);
		$scope.aced.personnel[pos].poste = poste;
		
		$scope.aced = $personnelDB.instant($scope.aced);
		console.log("$scope.aced:");
		console.log($scope.aced);
		
		$personnelDB.save($scope.aced).then(function(data) 
		{
    		$state.go('app.personnel_poste/:id',{id:$stateParams.id});
        }, function(error) {
            console.log("ERROR -> " + error);
        });		
	};
})
.controller(module+'PosteDetailsCtrl', function($scope, $personnelDB,$stateParams, $state, $rootScope, Personnel, socket,$interval, $cordovaPrinter)  
{
	console.log("je suis dans PosteUpdateCtrl");
	$scope.services = Personnel.setObjet("services");
	$scope.aced = {};
	var pos;
	console.log("$scope.services:");
	console.log($scope.services);
	
	$personnelDB.startListening();
	//Affichage et mise à jour en instantane des details du visiteur à chaque changement de la BDD
    $rootScope.$on("$personnelDB:change", function(event, data) 
    {
    	console.log("data:");
		console.log(data);
			
        //affiche la personne correspondant a l'id
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        { 
			$scope.aced = data.doc;
			console.log("$scope.aced.personnel:");
			console.log($scope.aced.personnel);
			for(var i=0;i<$scope.aced.personnel.length;i++)
			{
				console.log("$scope.aced.personnel[i].id:");
				console.log($scope.aced.personnel[i].id);
				if($scope.aced.personnel[i].id == $stateParams.id)
				{
					$scope.persoId = $stateParams.id;
					$scope.poste = $scope.aced.personnel[i].poste;
					$scope.personnel = $scope.aced.personnel[i];
					$scope.poste.nomprenom = $scope.aced.personnel[i].nom+" "+$scope.aced.personnel[i].prenom;
					pos = i;
					console.log("$scope.poste:");
					console.log($scope.poste);					
				}	
			}
			$scope.$apply();
		}
    });
    /********************debut print*************************/
	$scope.test = function()
	{
		console.log("j'ai cliqué sur imprimer!!");
		alert("j'ai cliqué sur imprimer!!");
		//var printerAvail = $cordovaPrinter.isAvailable();
		var doc = "<html> ... </html>";
  		$cordovaPrinter.print(doc);
  	};
  	
  	/*****************************/
    $scope.printDiv = function (div) {
    	console.log("je suis dans printDiv");
  var docHead = document.head.outerHTML;
  var printContents = document.getElementById(div).outerHTML;
  console.log("printContents:");
  console.log(printContents);
  var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

  var newWin = window.open("", "_blank", winAttr);
  var writeDoc = newWin.document;
  writeDoc.open();
  writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
  writeDoc.close();
  newWin.focus();  
}
    /*****************************/
})
.controller(module+'InformationsAddCtrl', function($scope,$rootScope, $location, $translate, $personnelDB, $state, Personnel, $http, allPersonnel, socket, fileUpload)  
{
	console.log("Je suis dans InformationsAddCtrl!!");
	$http.get("http://51.254.119.71:5984/aced-cobraced/7d265fdf8d889665362ea059ea0018dc").then(function (result)
	{
		$rootScope.aced = result.data; 
		console.log("$rootScope.aced:");
		console.log($rootScope.aced);
	});
	
	//ajoute une personne puis redirige sur son détail
	$scope.submitForm = function(personnel)
	{
		console.log("je suis dans le submit de personnelpersonnelCtrl");
		
		console.log("personnel:");
		console.log(personnel);
		
		//personnel.face = f.name;
		personnel.id = Personnel.generatePersonnelId(personnel);
		personnel.id = Personnel.sansAccent(personnel.id);
		
		var f = document.getElementById('file').files[0];
      	console.log("f:");
		console.log(f);
		console.log("f.name:");
		console.log(f.name);
		var sep = f.name.split("."),
		ext = sep[1];
		//f.name = personnel.id+"."+ext; 
		personnel.face = personnel.id+"."+ext;
		console.log("f.name.apres:");
		console.log(personnel.id+"."+ext);
		var uploadUrl = "http://51.254.119.71:2302/uploads";
    		
        fileUpload.uploadFileToUrl(f, personnel.face, uploadUrl);	
		
		
		$rootScope.aced.personnel.push(personnel);
		$rootScope.aced = $personnelDB.instant($rootScope.aced);
		
		console.log("$rootScope.aced:");
		console.log($rootScope.aced);
		$personnelDB.save($rootScope.aced).then(function(data) 
		{
    		$state.go('app.personnel_informations');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
	};	
}) 
.controller(module+'InformationsUpdateCtrl', function($scope,$rootScope, $location, $translate, $personnelDB, $state, $stateParams, Personnel, $http, allPersonnel, socket, fileUpload)  
{
	console.log("Je suis dans InformationsUpdateCtrl!!");
	$http.get("http://51.254.119.71:5984/aced-cobraced/7d265fdf8d889665362ea059ea0018dc").then(function (result)
	{
		$rootScope.aced = result.data; 
		$scope.personnel = $rootScope.aced.personnel;
		console.log("$rootScope.aced:");
		console.log($rootScope.aced);
		for(var i=0;i<$scope.aced.personnel.length;i++)
		{
			console.log("$scope.aced.personnel[i].id:");
			console.log($scope.aced.personnel[i].id);
		 	if($scope.aced.personnel[i].id == $stateParams.id)
			{
				$scope.personnel = $scope.aced.personnel[i];
				$scope.personnel.naissance = new Date($scope.aced.personnel[i].naissance);
				pos = i;
				console.log("$scope.personnel:");
				console.log($scope.personnel);					
			}	
		}
	});
	$personnelDB.startListening();
	//Affichage et mise à jour en instantane des details du visiteur à chaque changement de la BDD
    /*$rootScope.$on("$personnelDB:change", function(event, data) 
    {
    	console.log("data_samedi:");
		console.log(data);
			
        //affiche la personne correspondant a l'id
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        {
			$scope.aced = data.doc;
			console.log("$scope.aced.personnel:");
			console.log($scope.aced.personnel);
			for(var i=0;i<$scope.aced.personnel.length;i++)
			{
				console.log("$scope.aced.personnel[i].id:");
				console.log($scope.aced.personnel[i].id);
				if($scope.aced.personnel[i].id == $stateParams.id)
				{
					$scope.personnel = $scope.aced.personnel[i];
					pos = i;
					console.log("$scope.personnel:");
					console.log($scope.personnel);					
				}	
			}
			$scope.$apply();
		}
    });*/
	//ajoute une personne puis redirige sur son détail
	$scope.submitForm = function(personnel)
	{
		console.log("je suis dans le submit de personnelpersonnelCtrl");
		
		console.log("personnel:");
		console.log(personnel);
		
		//personnel.face = f.name;
		personnel.id = Personnel.generatePersonnelId(personnel);
		personnel.id = Personnel.sansAccent(personnel.id);
		
		var f = document.getElementById('file').files[0];
      	console.log("f:");
		console.log(f); 
		console.log("f.name:");
		console.log(f.name);
		var sep = f.name.split("."),
		ext = sep[1];
		//f.name = personnel.id+"."+ext; 
		personnel.face = personnel.id+"."+ext;
		console.log("f.name.apres:");
		console.log(personnel.id+"."+ext);
		var uploadUrl = "http://51.254.119.71:2302/uploads";
    		
        fileUpload.uploadFileToUrl(f, personnel.face, uploadUrl);	
		
		
		$rootScope.aced.personnel.push(personnel);
		$rootScope.aced = $personnelDB.instant($rootScope.aced);
		
		console.log("$rootScope.aced:");
		console.log($rootScope.aced);
		$personnelDB.save($rootScope.aced).then(function(data) 
		{
    		$state.go('app.personnel_informations');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
	};	
}) 
//.controller(module+'AllCtrl',["$scope","$rootScope","$stateParams","$state","Personnel","socket"," $personnelDB","$http","$ionicModal","$timeout"," $firebase","$firebaseObject","$firebaseArray","Auth", function($scope,$rootScope, $stateParams,$state, Personnel, socket, $personnelDB, $http,$ionicModal, $timeout, $firebase, $firebaseObject, $firebaseArray, Auth) 
.controller(module+'AllCtrl', function($scope,$rootScope, $stateParams,$state, Personnel, socket, $personnelDB, $http,$ionicModal, $timeout, $firebase, $firebaseObject, $firebaseArray, $firebaseAuth) 
{
	var ref = new Firebase("https://comendo-asso.firebaseio.com");
	/**************debut test firebase***************/
	/**************debut test authentification***************/
	$scope.authObj = $firebaseAuth(ref);
	console.log("$scope.authObj:",$scope.authObj);
	$scope.authObj.$authWithCustomToken("<CUSTOM_AUTH_TOKEN>").then(function(authData) {
  console.log("Logged in as:", authData.uid);
}).catch(function(error) {
  console.error("Authentication failed:", error);
});	
	
	// Create a callback which logs the current auth state
	/*function authDataCallback(authData) {
	  if (authData) {
	    console.log("User " + authData.uid + " is logged in with " + authData.provider);
	  } else {
	    console.log("User is logged out");
	  }
	}*/
	/*$scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.removeUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$removeUser({
        email: $scope.email,
        password: $scope.password
      }).then(function() {
        $scope.message = "User removed";
      }).catch(function(error) {
        $scope.error = error;
      });
    };*/
	/**************fin test authentification***************/
  	
  	//ref.onAuth(authDataCallback);
  	/*var authData = ref.getAuth();
	if (authData) {
	  console.log("User " + authData.uid + " is logged in with " + authData.provider);
	} else {
	  console.log("User is logged out");
	}*/
	// prefer pop-ups, so we don't navigate away from the page
	ref.authWithOAuthPopup("google", function(error, authData) {
	  if (error) {
	    if (error.code === "TRANSPORT_UNAVAILABLE") {
	      // fall-back to browser redirects, and pick up the session
	      // automatically when we come back to the origin page
	      ref.authWithOAuthRedirect("google", function(error) { /* ... */ });
	    }
	  } else if (authData) {
	    // user authenticated with Firebase
	  }
	});

    $scope.personnels = [];
     
     ref.on("value", function(snapshot) {
     	$scope.$apply(function() {
     		$scope.personnels = snapshot.val();
		 });
	 });
	 /**************fin test firebase***************/
  	/**************debut test algo-pointage***************/
  	var now  = "01/08/2016 15:00:00";
	var then = "04/02/2016 14:20:30";
	var diff = moment.duration(moment(then).diff(moment(now)));
	var days = parseInt(diff.asDays()); //84

	var hours = parseInt(diff.asHours()); //2039 hours, but it gives total hours in given miliseconds which is not expacted.

	hours = hours - days*24;  // 23 hours

	var minutes = parseInt(diff.asMinutes()); //122360 minutes,but it gives total minutes in given miliseconds which is not expacted.
	var seconds = parseInt(diff.asSeconds()); //122360 minutes,but it gives total minutes in given miliseconds which is not expacted.

	minutes = minutes - (days*24*60 + hours*60); //20 minutes.
	seconds = seconds - (days*24*60 + hours*60 + minutes*60); //20 minutes.
	console.log("diff:",diff);
	console.log("days:",days);
	console.log("hours:",hours);
	console.log("minutes:",minutes);
	console.log("seconds:",seconds);
	console.log("diff._data.seconds:",diff._data.seconds);
  	
  	/**************fin test algo-pointage***************/
  
	//initialisation variable
	//$rootScope.personnels = [];
	$rootScope.aced = [];
	$scope.pos = 0;
	$scope.date = {};
	
	//debut ecoute BDD
    $personnelDB.startListening(); 
	
	//met a jour les donnees a tout changement de la base
	$rootScope.$on("$personnelDB:change", function(event, data) 
    {
    	console.log("data:");
		console.log(data);
		/*getById(data,'7d265fdf8d889665362ea059ea0018dc',$stateParams.id)	;*/
        //selectionne la base de donees
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        {
			$rootScope.aced = data.doc;
			console.log("$rootScope.aced.personnel:");
			console.log($rootScope.aced.personnel);
			
			//$rootScope.personnels = $rootScope.aced.personnel;
			
			$rootScope.$apply();
		}
    });
	
	/***********************************/
	// Form data for the login modal
  $scope.loginData = {};
  
  $rootScope.result = {};
  $rootScope.perso = {};
  $scope.presence = [];
  $scope.loginData.compteur = 3;
  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/pointage/pointage.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function(id) {
  	$scope.loginData.id = id;
  	console.log("$scope.loginData.id:");
  	console.log($scope.loginData.id);
    $scope.modal.show();
    for(var i=0;i<$rootScope.aced.personnel.length;i++)
	{
		console.log("$rootScope.aced.personnel[i].id:");
		console.log($rootScope.aced.personnel[i].id);
		if($rootScope.aced.personnel[i].id == id)
		{
			$scope.persoId = id;
			$scope.poste = $rootScope.aced.personnel[i].poste;
			$scope.pos = i;
			console.log("$scope.poste:");
			console.log($scope.poste);					
		}	
	}
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() { 
  
  	$scope.date = $personnelDB.instant($scope.date);
	console.log("$scope.date:",$scope.date);
  	/***********************/  	
	console.log("$rootScope.aced:");
	console.log($rootScope.aced);
	console.log("$scope.pos:");
	console.log($scope.pos);
	
	var password = $rootScope.aced.personnel[$scope.pos].password;
	$scope.presence = $rootScope.aced.personnel[$scope.pos].presence;
	console.log("presence.length:",$scope.presence.length);
	console.log("presence0:",$scope.presence);
	    console.log("password:",password);
		
	    if(password == $scope.loginData.password)
	    {
	    	
	    	/************debut presence*************/
	    	if($scope.presence.length == 0)
			{
				$scope.presence.push({"date":$scope.date,"ha":$scope.date.heure});
			}
			else
			{
				for(var i=0;i<$scope.presence.length;i++)
				{
					/*if(!$scope.presence[i])
					{
						$scope.presence.push({"date":$scope.date.date,"ha":$scope.date.heure});
						console.log("presence1:",$scope.presence);
						console.log("on est dans 0:");
					}
					else*/
					if($scope.presence[i].date == $scope.date.date)
					{
						console.log("on est dans 1:");
						if(!$scope.presence[i].dp)
						{
							console.log("on est dans 2:");
							$scope.presence[i].dp = $scope.date.heure;
						}
						else 
						{
							console.log("on est dans 3:");
							if(!$scope.presence[i].fp)
							{
								console.log("on est dans 4:");
								$scope.presence[i].fp = $scope.date.heure;
							}
							else 
							{
								console.log("on est dans 5:");
								if(!$scope.presence[i].hd)
								{
									console.log("on est dans 6:");
									$scope.presence[i].hd = $scope.date.heure;
								}
								else
								{
									console.log("on est dans 7:");
								}
							}
						}
						console.log("presence2:",$scope.presence);
					}
					else
					{
						$scope.presence.push({"date":$scope.date.date,"ha":$scope.date.heure});
						console.log("on est dans 0:");
						console.log("presence3:",$scope.presence);
					}
				}
			}
				
			$rootScope.aced.personnel[$scope.pos].presence = $scope.presence;
				console.log("$rootScope.aced.personnel[$scope.pos].presence:",$rootScope.aced.personnel[$scope.pos].presence);
			    	/***********fin presence**************/
			    	
	    	console.log("oooooooooooooooooooooooooo:",$rootScope.aced.personnel[$scope.pos].presence);
	    	$personnelDB.save($rootScope.aced).then(function(data) 
			{
	    		console.log("data_ok:",data);
	    		
	        }, function(error) {
	            console.log("ERROR -> " + error);
	        });
	    	
			$scope.erreur = "";
			// code if using a login system
		    $timeout(function() {
		      $scope.closeLogin();
		      $scope.loginData.password = "";
			  $scope.loginData.compteur = 3;
			  $state.go('app.pointage_all');
		    }, 1000);
		}
		else
		{
			var nb = parseInt($scope.loginData.compteur)-1;
			if($scope.loginData.compteur > 1)$scope.erreur = "erreur! Il vous reste "+nb+" essai...";
			else if($scope.loginData.compteur == 1)$scope.erreur = "erreur! dernier essai";
			else 
			{
				$scope.erreur = "Rapprochez-vous de l'administration, merci!!";
				$timeout(function() {
		        $scope.closeLogin();
		        $scope.loginData.password = "";
			    $scope.loginData.compteur = 3;
		      }, 5000);
			}
			$scope.loginData.password = "";
			$scope.loginData.compteur--;
		}
		
  	/***********************/
  	
  };
	/***********************************/
	/*if (!$scope.addMe) {return;}
        if ($scope.products.indexOf($scope.addMe) == -1) {
            $scope.products.push($scope.addMe);
        } else {
            $scope.errortext = "The item is already in your shopping list.";
        }*/
})
.controller(module+'AddPhotoCtrl', function($scope,$rootScope, $stateParams,$state, Personnel, socket, $personnelDB, $http, Upload, $cordovaCamera) 
{
	/*****************debut code camera*****************/
	$scope.takeImage = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      //sourceType: Camera.PictureSourceType.CAMERA,
	  sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
	  correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) 
    {
    	//alert("je suis dans le getPicture ligne 376");
    	console.log("imageData:");
    	console.log(imageData);
    	//alert(imageData);
      	$scope.srcImage = "data:image/jpeg;base64," + imageData;
      	console.log("$scope.srcImage:");
    	console.log($scope.srcImage);
    }, function(err) {
      // error
    });
    };

	/******************fin code camera******************/
	console.log("je suis dans pointageAddPhotoCtrl");
	
	$scope.aced = {};
	var pos;
	
	$scope.$watch('$scope.vm.picture', function () {
	        console.log("$scope.vm.picture:",$scope.vm.picture);
	
	    });
	$scope.$watch($scope.vm.picture, function () {
	        console.log("$scope.vm.picture2:",$scope.vm.picture);
	
	    });
	    
	$personnelDB.startListening();
	//Affichage et mise à jour en instantane des details du visiteur à chaque changement de la BDD
   /* $rootScope.$on("$personnelDB:change", function(event, data) 
    {
    	console.log("data:"); 
		console.log(data);
			
        //affiche la personne correspondant a l'id
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        {
			$scope.aced = data.doc;
			console.log("$scope.aced.personnel:");
			console.log($scope.aced.personnel);
			for(var i=0;i<$scope.aced.personnel.length;i++)
			{
				console.log("$scope.aced.personnel[i].id:");
				console.log($scope.aced.personnel[i].id);
				if($scope.aced.personnel[i].id == $stateParams.id)
				{
					$scope.personnel = $scope.aced.personnel[i];
					$scope.personnel.naissance = new Date($scope.aced.personnel[i].naissance);
					pos = i;
					console.log("$scope.personnel:");
					console.log($scope.personnel);
				}
					
				
			}  
			$scope.$apply();
		}
    });
    		
	/**********debut upload image/pdf **************/
		/*$scope.$watch('files', function () {
	        $scope.upload($scope.files);
	        console.log("$scope.files:");
	        console.log($scope.files);
	    });
	    
	     $scope.log = '';
	     $scope.image = '';
	     $scope.images = [];

	    $scope.upload = function (files) {
	        if (files && files.length) {
	            for (var i = 0; i < files.length; i++) {
	              var file = files[i];
	              if (!file.$error) {
	                Upload.upload({
	                    url: '/uploads',
	                    data: {
	                      file: file  
	                    }
	                }).then(function (resp) {
	                    $timeout(function() {
	                        $scope.log = 'file: ' +
	                        resp.config.data.file.name +
	                        ', Response: ' + JSON.stringify(resp.data) +
	                        '\n' + $scope.log;
	                        $scope.image = resp.data;
		                	console.log("$scope.image:"+$scope.image);
	                    });
	                    
	                    $scope.images.push(resp.data);
		                console.log("$scope.images:"+$scope.images);
	                }, null, function(evt) {
	                    var progressPercentage = parseInt(100.0 *
	                    		evt.loaded / evt.total);
	                    $scope.log = 'progress: ' + progressPercentage + 
	                    	'% ' + evt.config.data.file.name + '\n' + 
	                      $scope.log;
	                      
	                });
	              }
	            }
	        }
	    };*/
	/**********fin upload image/pdf**************/
	
	//ajoute une personne puis redirige sur son détail
	$scope.test = function()
	{
		document.addEventListener('deviceready', function () {
			alert('on est dans le device ready');
			/**
 * Checks if the printer service is avaible (iOS)
 * or if printer services are installed and enabled (Android).
 *
 * @param {Function} callback
 *      A callback function
 * @param {Object} scope
 *      Optional scope of the callback
 *      Defaults to: window
 */
cordova.plugins.printer.check(function (avail, count) {
    alert(avail ? 'Found ' + count + ' services' : 'No');
});
	/**
 * Sends the content to print service.
 *
 * @param {String} content
 *      HTML string or DOM node
 *      if latter, innerHTML is used to get the content
 * @param {Object} options
 *       Options for the print job
 * @param {Function} callback
 *      An optional callback function
 * @param {Object} scope
 *      An optional scope of the callback
 *      Defaults to: window
 */
cordova.plugins.printer.print('<html>..</html>', { duplex: 'long' }, function (res) {
    alert(res ? 'Done' : 'Canceled');
});
		    // cordova.plugins.printer is now available
		    
		}, false);
	};
	
	$scope.submitForm = function(personnel)
	{
		console.log("je suis dans le submit de personnelpersonnelCtrl");
		console.log("personnel:");
		console.log(personnel);
		console.log("pos:");
		console.log(pos);
		$scope.aced.personnel[pos] = personnel;
		
		$scope.aced = $personnelDB.instant($scope.aced);
		console.log("$scope.aced:");
		console.log($scope.aced);
		
		$personnelDB.save($scope.aced).then(function(data) 
		{
    		$state.go('app.personnel_informations');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
			
	};
	
})
.controller(module+'InformationsDetailsCtrl', function($scope,$rootScope, $stateParams,$state, Personnel, socket, $personnelDB, $http, Upload, $cordovaCamera) 
{
	/*****************debut code camera*****************/
	$scope.takeImage = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      //sourceType: Camera.PictureSourceType.CAMERA,
	  sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
	  correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) 
    {
    	//alert("je suis dans le getPicture ligne 376");
    	console.log("imageData:");
    	console.log(imageData);
    	//alert(imageData);
      	$scope.srcImage = "data:image/jpeg;base64," + imageData;
      	console.log("$scope.srcImage:");
    	console.log($scope.srcImage);
    }, function(err) {
      // error
    });
    };

	/******************fin code camera******************/
	console.log("je suis dans personnelInformationsDetailsCtrl");
	
	$scope.aced = {};
	var pos;
	
	$personnelDB.startListening();
	//Affichage et mise à jour en instantane des details du visiteur à chaque changement de la BDD
    $rootScope.$on("$personnelDB:change", function(event, data) 
    {
    	console.log("data:"); 
		console.log(data);
			
        //affiche la personne correspondant a l'id
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        {
			$scope.aced = data.doc;
			console.log("$scope.aced.personnel:");
			console.log($scope.aced.personnel);
			for(var i=0;i<$scope.aced.personnel.length;i++)
			{
				console.log("$scope.aced.personnel[i].id:");
				console.log($scope.aced.personnel[i].id);
				if($scope.aced.personnel[i].id == $stateParams.id)
				{
					$scope.personnel = $scope.aced.personnel[i];
					$scope.personnel.naissance = new Date($scope.aced.personnel[i].naissance);
					pos = i;
					console.log("$scope.personnel:");
					console.log($scope.personnel);
				}
					
				
			}  
			$scope.$apply();
		}
    });
    		
	/**********debut upload image/pdf **************/
		/*$scope.$watch('files', function () {
	        $scope.upload($scope.files);
	        console.log("$scope.files:");
	        console.log($scope.files);
	    });
	    
	     $scope.log = '';
	     $scope.image = '';
	     $scope.images = [];

	    $scope.upload = function (files) {
	        if (files && files.length) {
	            for (var i = 0; i < files.length; i++) {
	              var file = files[i];
	              if (!file.$error) {
	                Upload.upload({
	                    url: '/uploads',
	                    data: {
	                      file: file  
	                    }
	                }).then(function (resp) {
	                    $timeout(function() {
	                        $scope.log = 'file: ' +
	                        resp.config.data.file.name +
	                        ', Response: ' + JSON.stringify(resp.data) +
	                        '\n' + $scope.log;
	                        $scope.image = resp.data;
		                	console.log("$scope.image:"+$scope.image);
	                    });
	                    
	                    $scope.images.push(resp.data);
		                console.log("$scope.images:"+$scope.images);
	                }, null, function(evt) {
	                    var progressPercentage = parseInt(100.0 *
	                    		evt.loaded / evt.total);
	                    $scope.log = 'progress: ' + progressPercentage + 
	                    	'% ' + evt.config.data.file.name + '\n' + 
	                      $scope.log;
	                      
	                });
	              }
	            }
	        }
	    };*/
	/**********fin upload image/pdf**************/
	
	//ajoute une personne puis redirige sur son détail
	$scope.test = function()
	{
		document.addEventListener('deviceready', function () {
			alert('on est dans le device ready');
			/**
 * Checks if the printer service is avaible (iOS)
 * or if printer services are installed and enabled (Android).
 *
 * @param {Function} callback
 *      A callback function
 * @param {Object} scope
 *      Optional scope of the callback
 *      Defaults to: window
 */
cordova.plugins.printer.check(function (avail, count) {
    alert(avail ? 'Found ' + count + ' services' : 'No');
});
	/**
 * Sends the content to print service.
 *
 * @param {String} content
 *      HTML string or DOM node
 *      if latter, innerHTML is used to get the content
 * @param {Object} options
 *       Options for the print job
 * @param {Function} callback
 *      An optional callback function
 * @param {Object} scope
 *      An optional scope of the callback
 *      Defaults to: window
 */
cordova.plugins.printer.print('<html>..</html>', { duplex: 'long' }, function (res) {
    alert(res ? 'Done' : 'Canceled');
});
		    // cordova.plugins.printer is now available
		    
		}, false);
	};
	
	$scope.submitForm = function(personnel)
	{
		console.log("je suis dans le submit de personnelpersonnelCtrl");
		console.log("personnel:");
		console.log(personnel);
		console.log("pos:");
		console.log(pos);
		$scope.aced.personnel[pos] = personnel;
		
		$scope.aced = $personnelDB.instant($scope.aced);
		console.log("$scope.aced:");
		console.log($scope.aced);
		
		$personnelDB.save($scope.aced).then(function(data) 
		{
    		$state.go('app.personnel_informations');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
			
	};
	
}); 