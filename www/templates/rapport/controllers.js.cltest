var module = 'rapport';
starter.controller(module+'IncidentAddCtrl', function($scope, $rootScope, $ionicModal, $timeout, Rapport, $rapportDB, $state) 
{ 
	console.log("je suis dans rapportAddCtrl");
	/*$scope.services = Rapport.setObjet("services");
	$scope.statuts = Rapport.setObjet("statuts");
	$scope.natures = Rapport.setObjet("natures");
	$scope.lieux = Rapport.setObjet("lieux");
	$scope.jourIncidents = Rapport.setObjet("jourIncidents");
	$scope.trancheIncidents = Rapport.setObjet("trancheIncidents");
	$scope.agressions = Rapport.setObjet("agressions");
	$scope.deviances = Rapport.setObjet("deviances");
	$scope.degradations = Rapport.setObjet("degradations");
	$scope.conduites = Rapport.setObjet("conduites");
	$scope.absences = Rapport.setObjet("absences");*/
	
	$scope.aced = [];
	$scope.pos = 0;
	$scope.date = {};
	
	//debut ecoute BDD
    $rapportDB.startListening(); 
	
	//met a jour les donnees a tout changement de la base
	$rootScope.$on("$rapportDB:change", function(event, data) 
    {
    	console.log("data:");
		console.log(data);
		/*getById(data,'7d265fdf8d889665362ea059ea0018dc',$stateParams.id)	;*/
        //selectionne la base de donees
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        {
			$scope.aced = data.doc;
			console.log("$scope.aced:");
			console.log($scope.aced);
			console.log("$scope.aced.rapport:");
			console.log($scope.aced.rapport);
			$rootScope.$apply();
		}
    });
	
	
	
	$scope.submitForm = function(rapport)
	{
		console.log("je suis dans le submit de rapportAddCtrl");
		console.log("rapport0:");
		console.log(rapport);
		rapport = $rapportDB.instant(rapport);
		if($scope.aced.rapport == "undefined" || $scope.aced.rapport == undefined)$scope.aced.rapport = [];
		$scope.aced.rapport.push(rapport);
		console.log("$scope.aced.rapport:");
		console.log($scope.aced.rapport);
		
		$rapportDB.save($scope.aced).then(function(data) 
		{
		$state.go('app.rapport_all');
	    }, function(error) {
	        console.log("ERROR -> " + error);
	    });
	};
	
	//change la vue entre la version classique et la version mobile
	$scope.change = function(boolean)
	{
		$scope.checked = boolean;
		console.log("$scope.checked:",$scope.checked);	
	};
})
.controller(module+'IntroCtrl', function($scope, $appDB,$stateParams) 
{
	$scope.module = 'rapport';
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
.controller(module+'ChoiceCtrl', function($scope, $appDB,$stateParams) 
{
	$scope.module = 'rapport';
	if($stateParams != null)$scope.persoId = $stateParams.id;
	console.log("je suis dans rapportChoiceCtrl");
	console.log("$scope.persoId:");
	console.log($scope.persoId);
  $scope.menus = [
    { title: 'Journalier', url: 'journalier' },
    { title: 'Réunion', url: 'reunion' },
    { title: 'Incident', url: 'incident/add' }
  ];
})
.controller(module+'AllCtrl', function($scope, $rootScope, $stateParams, $state, Personnel, socket, $rapportDB, $http, $ionicModal, $timeout, all_rapport, $filter, NgTableParams) 
{
	console.log("Je suis dans rapportAllCtrl");
	
	//initialisation variable
	$scope.aced = [];
	
	//debut ecoute BDD
    $rapportDB.startListening(); 
    
    //declaration variables tableau liste
    var self = this;
	var simpleList = [];
	$scope.simpleList = [];
	
	
	//met a jour les donnees a tout changement de la base
	/*$rootScope.$on("$rapportDB:change", function(event, data) 
    {
    	console.log("data:");
		console.log(data);
		
        //selectionne la base de donees
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        {
			$scope.aced = data.doc;
			console.log("$rootScope.aced.rapport:");
			console.log($scope.aced.rapport);
			
			$scope.rapport = $scope.aced.rapport;
			
			$scope.$apply();
		}
    });
    */
    $http.get(all_rapport.db).then(function (result)
	{
		/*****************calcul du delais  de reponse****************/
    	var time = result.config.responseTimestamp - result.config.requestTimestamp;
    console.log('The request took ' + (time / 1000) + ' seconds.');
     
		$scope.simpleList = result.data.rows[0].value;
		simpleList = result.data.rows[0].value;
		//$scope.simpleList.push(result.data.rows.);
		//simpleList.push(result.data.rows);
		console.log("result:",result);
		console.log("result.data:",result.data);
		console.log("result.data.rows:",result.data.rows);
		console.log("result.data.rows[0].value:",result.data.rows[0].value);
		console.log("result.data.rows[0].id:",result.data.rows[0].id);
	   /**********/
	  // $timeout({ 
	self.tableParams = new NgTableParams(
	    {
            page: 1,            // show first page
            total: simpleList.length, // length of data
            count: 10,          // count per page
            sorting: { nom: "desc" } 
	    },
	    {
	      dataset: $scope.simpleList
	    });  
	/**********/    
	//},2000);
	
	//$scope.$apply();
	});
    //donnees tableau
	self.move = move; 
	self.cols = [
      { field: "agresse.nomprenom", title: "Agressé", sortable: "agresse.nomprenom", show: false },
      { field: "agresse.service", title: "Statut agressé", sortable: "agresse.service", show: false },
      { field: "agresseur.nomprenom", title: "Agresseur", sortable: "agresseur.nomprenom", show: false },
      { field: "agresseur.statut", title: "Statut Agresseur", sortable: "agresseur.statut", show: false },
      { field: "auteur", title: "Auteur", sortable: "auteur", show: false },
      { field: "nature", title: "Nature", sortable: "nature", show: false },
      { field: "lieu", title: "Lieu", sortable: "lieu", show: false },
      { field: "jourIncident", title: "Jour incident", sortable: "jourIncident", show: false },
      { field: "trancheIncident", title: "Tranche horaire", sortable: "trancheIncident", show: true },
      { field: "agressions", title: "Agressions", sortable: "agressions", show: true },
      { field: "deviances", title: "Déviances", sortable: "deviances", show: true },
      { field: "degradations", title: "Dégradations", sortable: "degradations", show: true },
      { field: "conduites", title: "Conduites", sortable: "conduites", show: true },
      { field: "absences", title: "Absences", sortable: "absences", show: true },
      { field: "intervention", title: "Intervention", sortable: "intervention", show: true },
      { field: "laquelle", title: "Laquelle", sortable: "laquelle", show: true },
      { field: "conditions", title: "Conditions", sortable: "conditions", show: true },
      { field: "suite", title: "Suite", sortable: "suite", show: true },
      { field: "dateCreation", title: "Date Creation", sortable: "dateCreation", show: true }
    ];
    
    function move(column, currentIdx, value)
    {
      	var newPosition = currentIdx + value;
      	if (newPosition >= self.cols.length || newPosition < 0)  return;
      	self.cols[currentIdx] = self.cols[newPosition];
      	self.cols[newPosition] = column;
    };
    
    $scope.details = function(id)
    {
    	$state.go('app.rapport_incident_details/:id',{id:id});
		console.warn("ok, on vient de cliquer sur une LIGNE!!");
		console.log("id:",id);
	};
})
.controller(module+'IncidentUpdateCtrl', function($scope, $rapportDB,$stateParams, $state, $rootScope, Personnel, socket,$interval, $cordovaPrinter)  
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
	
	$rapportDB.startListening();
	//Affichage et mise à jour en instantane des details du visiteur à chaque changement de la BDD
    $rootScope.$on("$rapportDB:change", function(event, data) 
    {
    	console.log("data:");
		console.log(data);
			
        //affiche la personne correspondant a l'id
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        { 
			$scope.aced = data.doc;
			console.log("$scope.aced.rapport:");
			console.log($scope.aced.rapport);
			for(var i=0;i<$scope.aced.rapport.length;i++)
			{
				console.log("$scope.aced.rapport[i].id:");
				console.log($scope.aced.rapport[i].id);
				if($scope.aced.rapport[i].id == $stateParams.id)
				{
					$scope.persoId = $stateParams.id;
					//$scope.rapport = $scope.aced.rapport[i]; 
					$scope.rapport = $scope.aced.rapport[i];
					pos = i; 
					console.log("$scope.rapport:");
					console.log($scope.rapport);	
					$scope.rapport.dateCreation = new Date($scope.rapport.dateCreation);
					$scope.rapport.date_incident = new Date($scope.rapport.date_incident);
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
	$scope.submitForm = function(rapport)
	{
		console.log("je suis dans le submit de rapportAddCtrl");
		console.log("rapport0:");
		console.log(rapport);
		rapport = $rapportDB.instant(rapport);
		if($scope.aced.rapport == "undefined" || $scope.aced.rapport == undefined)$scope.aced.rapport = [];
		$scope.aced.rapport.push(rapport);
		console.log("$scope.aced.rapport:");
		console.log($scope.aced.rapport);
		
		$rapportDB.save($scope.aced).then(function(data) 
		{
		$state.go('app.rapport_all');
	    }, function(error) {
	        console.log("ERROR -> " + error);
	    });
	};
	
	//change la vue entre la version classique et la version mobile
	$scope.change = function(boolean)
	{
		$scope.checked = boolean;
		console.log("$scope.checked:",$scope.checked);	
	};
})
.controller(module+'IncidentDetailsCtrl', function($scope, $rapportDB,$stateParams, $state, $rootScope, Personnel, socket,$interval, $cordovaPrinter)  
{
	console.log("je suis dans PosteUpdateCtrl");
	$scope.services = Personnel.setObjet("services");
	$scope.aced = {};
	var pos;
	console.log("$scope.services:");
	console.log($scope.services);
	
	$rapportDB.startListening();
	//Affichage et mise à jour en instantane des rapports à chaque changement de la BDD
    $rootScope.$on("$rapportDB:change", function(event, data) 
    {
    	console.log("data:");
		console.log(data);
			
        //affiche la personne correspondant a l'id
        if(data.doc._id == '7d265fdf8d889665362ea059ea0018dc')
        { 
			$scope.aced = data.doc;
			console.log("$scope.aced.rapport:");
			console.log($scope.aced.rapport);
			for(var i=0;i<$scope.aced.rapport.length;i++)
			{
				console.log("$scope.aced.rapport[i].id:");
				console.log($scope.aced.rapport[i].id);
				if($scope.aced.rapport[i].id == $stateParams.id)
				{
					$scope.persoId = $stateParams.id;
					//$scope.rapport = $scope.aced.rapport[i];
					$scope.rapport = $scope.aced.rapport[i];
					pos = i;
					console.log("$scope.rapport:");
					console.log($scope.rapport);	
					$scope.rapport.dateCreation = new Date($scope.rapport.dateCreation);				
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
.controller(module+'InformationsAddCtrl', function($scope,$rootScope, $location, $translate, $rapportDB, $state, Personnel, $http, allPersonnel, socket, fileUpload)  
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
		$rootScope.aced = $rapportDB.instant($rootScope.aced);
		
		console.log("$rootScope.aced:");
		console.log($rootScope.aced);
		$rapportDB.save($rootScope.aced).then(function(data) 
		{
    		$state.go('app.personnel_informations');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
	};	
}) 
.controller(module+'InformationsUpdateCtrl', function($scope,$rootScope, $location, $translate, $rapportDB, $state, $stateParams, Personnel, $http, allPersonnel, socket, fileUpload)  
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
	$rapportDB.startListening();
	//Affichage et mise à jour en instantane des details du visiteur à chaque changement de la BDD
    /*$rootScope.$on("$rapportDB:change", function(event, data) 
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
		$rootScope.aced = $rapportDB.instant($rootScope.aced);
		
		console.log("$rootScope.aced:");
		console.log($rootScope.aced);
		$rapportDB.save($rootScope.aced).then(function(data) 
		{
    		$state.go('app.personnel_informations');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
	};	
}) 
.controller(module+'AddPhotoCtrl', function($scope,$rootScope, $stateParams,$state, Personnel, socket, $rapportDB, $http, Upload, $cordovaCamera) 
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
	console.log("$scope.vm.picture:",$scope.vm.picture);
	$rapportDB.startListening();
	//Affichage et mise à jour en instantane des details du visiteur à chaque changement de la BDD
   /* $rootScope.$on("$rapportDB:change", function(event, data) 
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
		
		$scope.aced = $rapportDB.instant($scope.aced);
		console.log("$scope.aced:");
		console.log($scope.aced);
		
		$rapportDB.save($scope.aced).then(function(data) 
		{
    		$state.go('app.personnel_informations');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
			
	};
	
})
.controller(module+'InformationsDetailsCtrl', function($scope,$rootScope, $stateParams,$state, Personnel, socket, $rapportDB, $http, Upload, $cordovaCamera) 
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
	
	$rapportDB.startListening();
	//Affichage et mise à jour en instantane des details du visiteur à chaque changement de la BDD
    $rootScope.$on("$rapportDB:change", function(event, data) 
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
		
		$scope.aced = $rapportDB.instant($scope.aced);
		console.log("$scope.aced:");
		console.log($scope.aced);
		
		$rapportDB.save($scope.aced).then(function(data) 
		{
    		$state.go('app.personnel_informations');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
			
	};
	
}); 