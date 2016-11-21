var module = 'personnel';
starter.controller(module+'IntroCtrl', function($scope, $appDB,$stateParams) 
{
	$scope.module = 'personnel';
	if($stateParams != null)$scope.persoId = $stateParams.uid;
	console.log("je suis dans personnelIntroController");
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
.controller(module+'AllCtrl', function($scope,$rootScope, $stateParams,$state, Personnel, $personnelDB, $http, $filter, NgTableParams) 
{
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
  
 }
 else{
 	$state.go('app.login');
 }
	console.log("je suis dans personnelAllCtrl:");
	//initialisation variable
	$rootScope.personnels = [];
	//declaration variables tableau liste
    var self = this;
	var simpleList = [];
	$scope.simpleList = [];
	
	var starCountRef = firebase.database().ref('informations');
	console.log("starCountRef:",starCountRef);
	
	starCountRef.once("value", function(snapshot) { 
     	//$scope.$apply(function() {
     		//simpleList.push(snapshot.val());
     		var i = 0;
     		snapshot.forEach(function(childSnapshot) {
     			
     			$scope.$apply(function() {
     			//simpleList.push(childSnapshot.val().metadata);
     			$scope.simpleList[i] = childSnapshot.val().details;
     			i++;
    /*var childKey = childSnapshot.key();
    var childData = childSnapshot.val();
    console.log("childKey:",childSnapshot);*/
    //console.log("childData:",childSnapshot);
  
     		//simpleList = snapshot.val();
     		console.log("snapshot.val():",snapshot.val());
     		console.log("simpleList:",$scope.simpleList);
     		});
     		self.tableParams = new NgTableParams(
		    {
	            page: 1,            // show first page
	            total: $scope.simpleList.length, // length of data
	            count: 10,          // count per page
	            sorting: { nom: "desc" } 
		    },
		    {
		      dataset: $scope.simpleList
		    }); 
		// });
		});
	 }); 
	
	//debut ecoute BDD
   // $personnelDB.startListening();
	
	/*$http.get("http://51.254.119.71:5984/aced-cobraced/7d265fdf8d889665362ea059ea0018dc").then(function (result)
	{*/
	//Affichage et mise à jour en instantane des details du visiteur à chaque changement de la BDD
    /*$rootScope.$on("$personnelDB:change", function(event, data)  
    {
    	console.log("data:"); 
		console.log(data);
			
        //affiche la personne correspondant a l'id
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        {
			$scope.aced = data.doc;
    		for(var i=0;i<$scope.aced.personnel.length;i++)
			{
				$scope.aced.personnel[i].naissance = new Date($scope.aced.personnel[i].naissance);
			}
			$scope.simpleList = $scope.aced.personnel; 
			//console.log("$rootScope.personnels.pre:");
			//console.log($rootScope.personnels);
			
			self.tableParams = new NgTableParams(
		    {
	            page: 1,            // show first page
	            total: $scope.simpleList.length, // length of data
	            count: 10,          // count per page
	            sorting: { nom: "desc" } 
		    },
		    {
		      dataset: $scope.simpleList
		    }); 
	    }
	}); */
	
	//donnees tableau
	self.move = move; 
	self.cols = [
      { field: "numero", title: "N°", sortable: "numero", show: true },
      { field: "face", title: "Portrait", sortable: "face", show: true },
      { field: "nom", title: "Nom", sortable: "nom", show: true },
      { field: "prenom", title: "Prenom", sortable: "prenom", show: true },
      { field: "poste.pole", title: "Pole", sortable: "poste.pole", show: true },
      { field: "naissance", title: "Date de Naissance", sortable: "naissance", show: false },
      { field: "adresse", title: "Adresse", sortable: "adresse", show: false },
      { field: "email", title: "E-mail", sortable: "email", show: false },
      { field: "tel", title: "Téléphone", sortable: "telephone", show: false }
    ];
    
    function move(column, currentIdx, value)
    {
      	var newPosition = currentIdx + value;
      	if (newPosition >= self.cols.length || newPosition < 0)  return;
      	self.cols[currentIdx] = self.cols[newPosition];
      	self.cols[newPosition] = column;
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
    
    $scope.add_employe = function()
    {
		$state.go('app.personnel_informations_add');
	}
	
	$scope.details = function(uid)
    {
    	//$state.go('app.personnel_informations_details/:id',{id:id});
    	//$state.go('app.informations_details/:uid/details',{uid:uid});
    	$state.go('app.personnel/:uid/intro',{uid:uid});
		console.warn("ok, on vient de cliquer sur une LIGNE!!");
		console.log("uid:",uid);
	};
})
/*************debut informations*************/
.controller('informationsAddCtrl', function($scope,$rootScope, $location, $translate, $personnelDB, $state, Personnel, $http, allPersonnel, fileUpload, generePwd)  
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
		console.log("je suis dans le submit de InformationsAddCtrl");
		
		console.log("personnel:");
		console.log(personnel);
		
		personnel.id = Personnel.generatePersonnelId(personnel);
		personnel.id = Personnel.sansAccent(personnel.id);
		personnel.password = generePwd;//genere un password unique
		
		var f = document.getElementById('file').files[0];
		if(f != undefined)
		{
			console.log("f:",f);
			console.log("f.name:",f.name);
			var sep = f.name.split("."),
			ext = sep[1];
			//f.name = personnel.id+"."+ext; 
			personnel.face = personnel.id+"."+ext;
			console.log("f.name.apres:");
			console.log(personnel.id+"."+ext);
			var uploadUrl = "http://51.254.119.71:2302/uploads";
    		fileUpload.uploadFileToUrl(f, personnel.face, uploadUrl);	
		}
		
		$rootScope.aced.personnel.push(personnel);
		$rootScope.aced = $personnelDB.instant($rootScope.aced);
		
		console.log("$rootScope.aced:");
		console.log($rootScope.aced);
		$personnelDB.save($rootScope.aced).then(function(data) 
		{
    		$state.go('app.personnel_all');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
	};	
}) 
.controller('informationsUpdateCtrl', function($scope, $stateParams)  
{
	console.log("Je suis dans InformationsUpdateCtrl!!");
	
	
	$scope.personnel = [];
	$scope.uid = $stateParams.uid;
	/************debut firebase****************/
	var ref = firebase.database().ref('informations/'+$scope.uid+'/details');
	//console.log("starCountRef:",starCountRef);
	
	ref.on("value", function(snapshot) { 
     	
		//$scope.$apply(function() {
			console.log("snapshot.val() SSSSEEEEBBBB:",snapshot.val());
			$scope.personnel = snapshot.val();
			$scope.personnel.naissance = new Date($scope.personnel.naissance);
			console.log("$scope.personnel:",$scope.personnel);
		//}); 
	 }); 
	 
	 // Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
// Create a storage reference from our storage service 
var storageRef = storage.ref();	
	// Child references can also take paths delimited by 
// Create a child reference
var personnelRef = storageRef.child('personnel/ben.png');
var spaceRef = storageRef.child('personnel/0002.jpg');

// Create a reference from a Google Cloud Storage URI
var gsReference = storage.refFromURL('gs://comendo-asso.appspot.com/personnel/ben.png');
console.log("storageRef:",storageRef);
console.log("spaceRef:",spaceRef);
console.log("spaceRef.fullPath:",spaceRef.fullPath);
console.log("personnelRef:",personnelRef);
console.log("gsReference:",gsReference);
// spaceRef now points to "images/space.jpg"
personnelRef.getDownloadURL().then(function(url) {
	//$scope.$apply(function() {
	$scope.test = url;
	//});
  // Get the download URL for 'images/stars.jpg'
  // This can be inserted into an <img> tag
  // This can also be downloaded directly
  console.log("url:",url);

}).catch(function(error) {
  // Handle any errors
});

	/*************fin firebase*****************/
    
	
	$scope.submitForm = function(personnel)
	{
		//var perso = ref
		console.log("je suis dans le submit de personnelUpdateCtrl");
		console.log("personnel:",personnel);
		var file = document.getElementById('file').files[0];
		personnelRef.put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
});
		firebase.database().ref('informations/'+personnel.id+'/details').set(personnel);
	};
	/*var pos;
	
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
	
	//modifie un employe puis redirige sur son la liste du personnel
	$scope.submitForm = function(personnel)
	{
		console.log("je suis dans le submit de personnelUpdateCtrl");
		
		console.log("personnel:",personnel);
		console.log("$scope.aced.personnel[pos]:",$scope.aced.personnel[pos]);
		
		//personnel.face = f.name;
		//pour réinitialiser l'id de l'employé si erreur dans le nom,prenom ou date de naissance
		if($scope.aced.personnel[pos].nom != personnel.nom || $scope.aced.personnel[pos].prenom != personnel.prenom || $scope.aced.personnel[pos].naissance != personnel.naissance)
		{
			console.log("je suis bien dans la condition!!");
			personnel.id = Personnel.generatePersonnelId(personnel);
			personnel.id = Personnel.sansAccent(personnel.id);
		}
		
		
		var f = document.getElementById('file').files[0];
		if(f != undefined)
		{
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
		}
      	
		
		//$scope.aced.personnel[pos] = personnel;
		//$rootScope.aced = $personnelDB.instant($rootScope.aced);
		
		console.log("$scope.aced????????:",$scope.aced);
		/*$personnelDB.save($scope.aced).then(function(data) 
		{
    		$state.go('app.personnel_all');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
	};	*/
}) 
.controller('informationsDetailsCtrl', function($scope, $rootScope, $stateParams) 
{
	console.log("je suis dans InformationsDetailsCtrl");
	
	$scope.personnel = [];
	$rootScope.uid = $stateParams.uid;
	//console.log("$rootScope.uid:",$rootScope.uid);
	/************debut firebase****************/
	var starCountRef = firebase.database().ref('informations/'+$rootScope.uid+'/details');
	//console.log("starCountRef:",starCountRef);
	
	starCountRef.on("value", function(snapshot) { 
     	
		$scope.$apply(function() {
			console.log("snapshot.val() SSSSEEEEBBBB:",snapshot.val());
			$scope.personnel = snapshot.val();
			$scope.personnel.naissance = new Date($scope.personnel.naissance);
			console.log("$scope.personnel:",$scope.personnel);
		}); 
	 }); 
	 	
	
	/*************fin firebase***************** /
    /**************debut impression***************/
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
    /***************fin impression**************/
})
/*************fin informations*************/

.controller('posteUpdateCtrl', function($scope, $stateParams, $state, $rootScope)  
{
	console.log("je suis dans PosteUpdateCtrl");
	//$scope.services = Personnel.setObjet("services");
	$scope.services = ["Médiation Social", "Insertion", "Administration", "Animation"];
	$scope.poste = [];
	$rootScope.uid = $stateParams.uid;
	
	/************debut firebase****************/
	var starCountRef = firebase.database().ref('poste/'+$rootScope.uid+'/details');
	
	starCountRef.on("value", function(snapshot) { 
		//$scope.$apply(function() {
			$scope.poste = snapshot.val();
			console.log("$scope.poste:",$scope.poste);		 
		//}); 
	 }); 
	/***************fin firebase**********************/	
    $scope.sock = function(poste)
	{
		console.log("poste 11:");
		console.log(poste);
	    firebase.database().ref('poste/'+$rootScope.uid+'/details').set(poste).then(function()
	    {	    		
	    	starCountRef.on("child_changed", function(snapshot) { 
		//$scope.$apply(function() {
			$scope.poste = snapshot.val();
			console.log("$scope.poste:",$scope.poste);		 
		//}); 
	 }); 
			console.log("c malade!");
			$scope.$apply();
	 	}); 
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
  	 console.log("pos:",pos);
  	 
     //$scope.aced.personnel[pos].poste.missions_poste.push({
     $scope.poste.missions_poste.push({
			mission:"",
			activite:""
		});
		//$scope.$apply();
		console.log("$scope.poste test:");
		console.log($scope.poste);
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
		console.log("je suis dans le submit de posteUpdateCtrl");
		console.log("poste:",poste);
		//firebase.database().ref('poste/'+$rootScope.uid+'/details').set(poste);	
	};
})
.controller('posteDetailsCtrl', function($scope, $personnelDB,$stateParams, $state, $rootScope, Personnel,$interval)  
{
	console.log("je suis dans PosteDetailsCtrl");
	$scope.poste = [];
	$rootScope.uid = $stateParams.uid;
	
	/************debut firebase****************/
	var starCountRef = firebase.database().ref('poste/'+$rootScope.uid+'/details');
	
	starCountRef.on("value", function(snapshot) { 
		$scope.$apply(function() {
			$scope.poste = snapshot.val();
		}); 
	 }); 
	/***************fin firebase**********************/
})
.controller(module+'PresenceUpdateCtrl', function($scope,$rootScope, $location, $translate, $personnelDB, $state, $stateParams, Personnel, $http, allPersonnel, fileUpload)  
{
	console.log("Je suis dans personnelPresenceUpdateCtrl!!");
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
		if(f != undefined)
		{
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
		}
      	
		
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
.controller(module+'PresenceDetailsCtrl', function($scope,$rootScope, $stateParams,$state, Personnel, socket, $personnelDB, $http, Upload) 
{
	console.log("je suis dans personnelPresenceDetailsCtrl");
	
	$scope.aced = {};
	$scope.presence = {};
	$scope.personnel = {};
	var pos;
	console.log("ACED:",$rootScope.aced); 
		
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
					$scope.presence = $scope.aced.personnel[i].presence;
					$scope.personnel = $scope.aced.personnel[i];
					pos = i;
					console.log("$scope.presence:",$scope.presence);
					console.log("$scope.personnel:",$scope.personnel);
				}
					
				
			}  
			$scope.$apply();
		}
    });
    		
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