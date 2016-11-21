var module = 'cobraced';
starter.controller(module+'IntroCtrl', function($scope, $appDB) {
	console.log("je suis dans personnelIntroController");
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
.controller(module+'RegChoiceCtrl', function($scope, $appDB) {
	console.log("je suis dans cobracedRegChoiceCtrl"); 
  $scope.menus = [
    { title: 'Pôle sportif', url: 'reglements/sport' },
    { title: 'Périscolaire', url: 'reglements/periscolaire' }
  ];
})
.controller(module+'RegPeriCtrl', function($scope, $appDB) {
	console.log("je suis dans cobracedRegPeriCtrl"); 
 
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
};
    /*****************************/
})
.controller(module+'AddCtrl', function($scope, $location, $translate, $appDB, Visiteur, allVisiteur, $state)  
{
	console.log("Je suis dans addCtrl!!");
	//menu déroulant pour l'objet de la visite	
	$scope.objets = Visiteur.setObjet("objets");
	$scope.services = Visiteur.setObjet("services");
	
	//ajoute une personne puis redirige sur son détail
	$scope.submitForm = function(form)
	{
		console.log("je suis dans le submit");
		console.log("form:");
		console.log(form);
		var jsonDoc = {};
		jsonDoc = form;
		
		//jsonDoc = Visiteur.addUpdateVisiteur(form, "add");
		
		jsonDoc = $appDB.instant(jsonDoc);
		$appDB.save(jsonDoc).then(function(data) 
		{
    		//$location.path('/visiteur/list');
    		$state.go('app.visiteur_all');
        }, function(error) {
            console.log("ERROR -> " + error);
        });
			
	};
}) 

.controller('all_oldCtrl', function($scope, $location, $translate, Visiteur,$appDB, $rootScope)  
{
	console.log("allCtrl");
	$scope.list = {};
	
	//debut ecoute BDD
    $appDB.startListening();
	
	//Affichage et mise à jour en instantane de la liste à chaque changement de la BDD
    $rootScope.$on("$appDB:change", function(event, data) 
    {
        //$scope.list[data.doc._id] = data.doc;
        $scope.list[data.doc._id] = data.doc;
        console.log("$scope.list:");
		console.log($scope.list);    
		$scope.$apply();
    });
	//Affichage et mise à jour en instantane des details du visiteur à chaque suppression dans la BDD
	/*$rootScope.$on("$appDB:delete", function(event, data) {
        delete $scope.list[data.doc._id];
        //$scope.details = data.doc;
        $scope.$apply();
    });*/
	//redirige vers la page des détails	du visiteur	
	$scope.details = function(id)
	{
		$location.path('/visiteur/'+id);
	};
	
	//redirige vers la page de modification du visiteur
	$scope.update = function(id)
	{
		$location.path('/visiteur/update/'+id);		
	};
	
	//fin ecoute BDD
    //$appDB.stopListening();
})
.controller(module+'AllCtrl_N', function($scope, $location, $translate, $appDB, Visiteur, $filter, NgTableParams, $rootScope) 
{
	console.log("allnewController");
	$scope.list = {};
	
	//debut ecoute BDD
    $appDB.startListening();
	
	
	var self = this;
	//var simpleList = [];
	$scope.simpleList = [];
	
	//Affichage et mise à jour en instantane de la liste à chaque changement de la BDD
    $rootScope.$on("$appDB:change", function(event, data) 
    {
        //$scope.list[data.doc._id] = data.doc;
        //$scope.simpleList = data.doc;
        $scope.simpleList.push(data.doc);  
        
		console.log("$scope.simpleList:");
		console.log($scope.simpleList);
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
	    
        $scope.$apply();
    });
	
	self.move = move;
	self.cols = [
      { field: "date_full", title: "Date/Heure", sortable: "date_full", show: false },
      { field: "date", title: "Date", sortable: "date", show: false },
      { field: "jour_mois", title: "Jour du mois", sortable: "jour_mois", show: false },
      { field: "jour_semaine", title: "Jour de la semaine", sortable: "jour_semaine", show: false },
      { field: "mois", title: "Mois", sortable: "mois", show: false },
      { field: "annee", title: "Année", sortable: "annee", show: false },
      { field: "heure", title: "Heure", sortable: "heure", show: false },
      { field: "nom", title: "Nom", sortable: "nom", show: true },
      { field: "prenom", title: "Prénom", sortable: "prenom", show: true },
      { field: "mail", title: "E-mail", show: false },
      { field: "tel", title: "Téléphone", show: true },
      { field: "service", title: "Service", sortable: "service", show: true },
      { field: "objet", title: "Objet", sortable: "objet", show: true },
      { field: "but", title: "But",  show: true }
    ];
    
    function move(column, currentIdx, value)
    {
      	var newPosition = currentIdx + value;
      	if (newPosition >= self.cols.length || newPosition < 0)  return;
      	self.cols[currentIdx] = self.cols[newPosition];
      	self.cols[newPosition] = column;
    };
})
.controller(module+'StatsCtrl', function($scope, $stateParams,$state) {
	console.log("$stateParams.sportsTitle:");
	console.log($stateParams.sportsTitle);
	//if($stateParams.sportId == 1)$state.go('app.volleyball');
	$scope.sport = $stateParams.sportsTitle;
	$scope.bientot = "Bientôt le "+$scope.sport+" sur SportAddict";
})
.controller(module+'AllCtrl', function($scope,$rootScope, $stateParams,$state, Personnel, socket, $personnelDB, $http ) {
	//debut ecoute BDD
    $personnelDB.startListening(); 
	
	//initialisation variable
	$rootScope.joueurs = [];
	
   	//$rootScope.$on("$personnelDB:change", function(event, data) 
   	$http.get("http://51.254.119.71:5984/aced-cobraced/7d265fdf8d889665362ea059ea0018dc").then(function (result)
	{
    	
    		$rootScope.joueurs = result; 
    		console.log("$rootScope.joueurs.pre:");
	    	console.log($rootScope.joueurs);
	    
	});
	console.log("$stateParams.sportsTitle:");
	console.log($stateParams.sportsTitle);
	 //$rootScope.joueurs = Joueurs.all();
  $scope.remove = function(joueur) {
    Joueurs.remove(joueur);
};

$rootScope.present = [];
socket.on("testseb", function(data) 
    {
    	console.log("dataseb:");
	    console.log(data);
	});
	/*$rootScope.choix = function(id)
	{
		var deja = false;
		//verifie que le joueur n'est pas deja selectionne
		for(var i=0;i<$rootScope.present.length;i++)
		{
			console.log("$rootScope.present[i]:");			
			console.log($rootScope.present[i]);
			
			if($rootScope.joueurs[i].id == id)
			{
				deja = true;
				if($rootScope.joueurs[i].checked == true)$rootScope.joueurs[i].checked = false;
				else $rootScope.joueurs[i].checked = true;
			}
		}
		if(!deja)$rootScope.present.push(id);
		console.log("$rootScope.present:");			
		console.log($rootScope.present);			
	};
	*/
	$scope.addStats = function()
	{
		$state.go("app.vb_statistiques_add");
	    //console.log("okok");
	};

})
.controller('addStatsPlayersController', function($scope, $http, $location, Upload, $volleyballStatsDB, $rootScope, $translate, $interval, socket, $http) 
{ 

console.log("$rootScope.joueurs.stat:");
console.log($rootScope.joueurs);
	//debut ecoute BDD
    $volleyballStatsDB.startListening();
	
	//initialisation variable
	$scope.joueurs = [];
	$scope.players = [];
	
	var id = "matchtest";
	
   	//$rootScope.$on("$volleyballStatsDB:change", function(event, data) 
    $http.get("http://51.254.119.71:5984/volleyball_stat/matchtest").then(function (result)
	{
    	
    	//if(data.doc._id == "matchtest")
    	//{
    		var test = 0;
    		console.log("data:");
    	console.log(data);
    		//$scope.joueurs = data.doc.equipe1.joueurs;
    		$scope.joueurs = $rootScope.joueurs;
    		for(var i = 0;i < $scope.joueurs.length;i++)
	    	{
	    		console.log("$scope.joueurssebo:");
	    	    console.log($scope.joueurs);
	    			
	    		if($scope.joueurs[i].checked == true)
	    		{
					$scope.players[test] = $scope.joueurs[i];
					console.log("$scope.playerssebo:");
	    	        console.log($scope.players);
	    			test++;
				}
	    		
    		}
    		$scope.id = result.data._id;
    		$scope.rev = result.data._rev;
			console.log("$scope.players:");
	    	console.log($scope.players);
	    	console.log("$scope.players.checked:");
	    	console.log($scope.players[0].checked);
	    	var oldData= new google.visualization.DataTable(),
    donnee =[];
	oldData.addColumn('string', 'name');
	oldData.addColumn('number', 'Points');
    donnee.push(['Joueurs', 'Service', 'Attaque', 'Contre', 'Reception', 'defense', 'Soutien', 'Relance', 'Passe']);
    for(var i = 0;i < $scope.players.length;i++)
	    	{
				donnee.push([
				$scope.players[i].id,
				$scope.players[i].statistiques.servicePoint,
				$scope.players[i].statistiques.attaquePoint,
				$scope.players[i].statistiques.contrePoint,
				$scope.players[i].statistiques.receptionPoint,
				$scope.players[i].statistiques.defensePoint,
				$scope.players[i].statistiques.soutienPoint,
				$scope.players[i].statistiques.relancePoint,
				$scope.players[i].statistiques.passePoint,
				]);
				//if(i != parseInt($scope.players.length) - 1)donnee += ",";
			}
			//donnee += "]";
			//oldData.addRows([  ['2004', 1000 , 400], ['2005', 1170, 460], ['2006', 660, 1120], ['2007',1030,540]
			//oldData.addRows(donnee);
	    	console.log("MALAAAADDEEEEEEEEEEEEEEEE");
			console.log(donnee);
//test();

						/***********------*************/
			 // Some raw data (not necessarily accurate)
    var rowData1 = [['Joueurs', 'Service', 'Attaque', 'Contre', 'Reception', 'defense', 'Soutien', 'Relance', 'Passe'],
                    ['2004/05', 165, 938, 522, 998, 450, 114.6],
                    ['2005/06', 135, 1120, 599, 1268, 288, 382],
                    ['2006/07', 157, 1167, 587, 807, 397, 623],
                    ['2007/08', 139, 1110, 615, 968, 215, 409.4],
                    ['2008/09', 136, 691, 629, 1026, 366, 569.6]];
    var rowData2 = [['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua  Guinea',
                     'Rwanda', 'Average'],
                    ['2004/05', 122, 638, 722, 998, 450, 614.6],
                    ['2005/06', 100, 1120, 899, 1268, 288, 682],
                    ['2006/07', 183, 167, 487, 207, 397, 623],
                    ['2007/08', 200, 510, 315, 1068, 215, 609.4],
                    ['2008/09', 123, 491, 829, 826, 366, 569.6]];

    // Create and populate the data tables.
    var data = [];
    data[0] = google.visualization.arrayToDataTable(donnee);
    data[1] = google.visualization.arrayToDataTable(rowData2);

    var options = {
      width: 800,
      height: 480,
      vAxis: {title: "Points"},
      hAxis: {title: "Joueurs"},
      seriesType: "bars",
      series: {1: {type: "line"}},
      animation:{
        duration: 1000,
        easing: 'out'
      },
    };
    var current = 0;
   
    var chart = new google.visualization.ColumnChart(document.getElementById('visualization'));
    var button = document.getElementById('b1');
    function drawChart() {
      // Disabling the button while the chart is drawing.
      //button.disabled = true;
      google.visualization.events.addListener(chart, 'ready',
          function() {
            //button.disabled = false;
            //button.value = 'Switch to ' + (current ? 'Tea' : 'Coffee');
          });
      options['title'] = 'Graphique points joueurs';

      chart.draw(data[current], options);
    }
    drawChart();

    /*button.onclick = function() {
      current = 1 - current;
      drawChart();
    }*/
			/***********------*************/
		
			$scope.$apply();
		//}
    	
   	});
	$scope.compteur = 0;
	/*socket.on("test2", function(data) 
    	{
    		console.log("data:");
			console.log(data);
    		//$scope.compteur = data;
    		
			//$scope.$apply();
    	});
    	
	$interval(function () {
		$scope.compteur += 1;
		console.log("$scope.compteur:");
		console.log($scope.compteur);
        socket.broadcast.emit('test2', $scope.compteur);
        }, 1000);*/
	
	socket.on("test", function(data) 
    {
    	console.log("data:");
	    	console.log(data);
	    	if(data._id)
	    	{
	    		$scope.players = data.equipe1.joueurs;
	    		$scope.id = data._id;
	    		
	    		
				console.log("$scope.players:");
		    	console.log($scope.players);
		    	var oldData= new google.visualization.DataTable(),
	    donnee =[];
		oldData.addColumn('string', 'name');
		oldData.addColumn('number', 'Points');
	    donnee.push(['Joueurs', 'Service', 'Attaque', 'Contre', 'Reception', 'defense', 'Soutien', 'Relance', 'Passe']);
	    for(var i = 0;i < $scope.players.length;i++)
		    	{
					donnee.push([
					$scope.players[i].id,
					$scope.players[i].statistiques.servicePoint,
					$scope.players[i].statistiques.attaquePoint,
					$scope.players[i].statistiques.contrePoint,
					$scope.players[i].statistiques.receptionPoint,
					$scope.players[i].statistiques.defensePoint,
					$scope.players[i].statistiques.soutienPoint,
					$scope.players[i].statistiques.relancePoint,
					$scope.players[i].statistiques.passePoint,
					]);
					//if(i != parseInt($scope.players.length) - 1)donnee += ",";
				}
				//donnee += "]";
				//oldData.addRows([  ['2004', 1000 , 400], ['2005', 1170, 460], ['2006', 660, 1120], ['2007',1030,540]
				//oldData.addRows(donnee);
		    	console.log("MALAAAADDEEEEEEEEEEEEEEEE");
				console.log(donnee);
	//test();

							/***********------*************/
				 // Some raw data (not necessarily accurate)
	    var rowData1 = [['Joueurs', 'Service', 'Attaque', 'Contre', 'Reception', 'defense', 'Soutien', 'Relance', 'Passe'],
	                    ['2004/05', 165, 938, 522, 998, 450, 114.6],
	                    ['2005/06', 135, 1120, 599, 1268, 288, 382],
	                    ['2006/07', 157, 1167, 587, 807, 397, 623],
	                    ['2007/08', 139, 1110, 615, 968, 215, 409.4],
	                    ['2008/09', 136, 691, 629, 1026, 366, 569.6]];
	    var rowData2 = [['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua  Guinea',
	                     'Rwanda', 'Average'],
	                    ['2004/05', 122, 638, 722, 998, 450, 614.6],
	                    ['2005/06', 100, 1120, 899, 1268, 288, 682],
	                    ['2006/07', 183, 167, 487, 207, 397, 623],
	                    ['2007/08', 200, 510, 315, 1068, 215, 609.4],
	                    ['2008/09', 123, 491, 829, 826, 366, 569.6]];

	    // Create and populate the data tables.
	    var data = [];
	    data[0] = google.visualization.arrayToDataTable(donnee);
	    data[1] = google.visualization.arrayToDataTable(rowData2);

	    var options = {
	      width: 800,
	      height: 480,
	      vAxis: {title: "Points"},
	      hAxis: {title: "Joueurs"},
	      seriesType: "bars",
	      series: {1: {type: "line"}},
	      animation:{
	        duration: 1000,
	        easing: 'out'
	      },
	    };
	    var current = 0;
	    // Create and draw the visualization.
	    //var chart = new google.visualization.ComboChart(document.getElementById('visualization'));
	    //var chart = new google.visualization.PieChart(document.getElementById('visualization'));
	    //var chart = new google.visualization.BarChart(document.getElementById('visualization'));
	    //var chart = new google.visualization.LineChart(document.getElementById('visualization'));
	    var chart = new google.visualization.ColumnChart(document.getElementById('visualization'));
	    //var button = document.getElementById('b1');
	    function drawChart() {
	      // Disabling the button while the chart is drawing.
	      //button.disabled = true;
	      google.visualization.events.addListener(chart, 'ready',
	          function() {
	            //button.disabled = false;
	           // button.value = 'Switch to ' + (current ? 'Tea' : 'Coffee');
	          });
	      options['title'] = 'Graphique points joueurs';

	      chart.draw(data[current], options);
	    }
	    drawChart();

	   /* button.onclick = function() {
	      current = 1 - current;
	      drawChart();
	    }*/
	}
				/***********------*************/
   	});
	$scope.saveAction = function() 
    { 
    	var jsonDoc = {
    		"_id":$scope.id,
    		"_rev":$scope.rev,
    		"equipe1": {
    			"joueurs": $scope.players
    			}
    	};
    	$volleyballStatsDB.instant(jsonDoc);
	
		//socket.emit('test', jsonDoc);
	};
	$scope.saveStats = function() 
    {
    	console.log("on est dans le saveStats");
	    var jsonDoc = {
    		"_id":$scope.id,
    		"_rev":$scope.rev,
    		"equipe1": {
    			"joueurs": $scope.players
    			}
    	};
    	$volleyballStatsDB.instant(jsonDoc);
    	$volleyballStatsDB.save(jsonDoc).then(function(response) 
  		{
	        console.log("response:");
	    	console.log(response);

    	}, 
    	function(error) 
    	{
            console.log("ERROR -> " + error);
        });
	};
	
})
.controller('resultsPlayersController', function($scope, $http, $location, Upload, $volleyballStatsDB, $rootScope, $translate, $interval, socket, $http) 
{ 

console.log("$rootScope.joueurs.stat:");
console.log($rootScope.joueurs);
	//debut ecoute BDD
    $volleyballStatsDB.startListening();
	
	//initialisation variable
	$scope.joueurs = [];
	$scope.players = [];
	
	var id = "matchtest";
	
   	//$rootScope.$on("$volleyballStatsDB:change", function(event, data) 
    $http.get("http://51.254.119.71:5984/volleyball_stat/matchtest").then(function (result)
	{
    	
    	//if(data.doc._id == "matchtest")
    	//{
    		var test = 0;
    		console.log("data:");
    	console.log(data);
    		//$scope.joueurs = data.doc.equipe1.joueurs;
    		$scope.joueurs = $rootScope.joueurs;
    		for(var i = 0;i < $scope.joueurs.length;i++)
	    	{
	    		console.log("$scope.joueurssebo:");
	    	    console.log($scope.joueurs);
	    			
	    		if($scope.joueurs[i].checked == true)
	    		{
					$scope.players[test] = $scope.joueurs[i];
					console.log("$scope.playerssebo:");
	    	        console.log($scope.players);
	    			test++;
				}
	    		
    		}
    		$scope.id = data.doc._id;
    		$scope.rev = data.doc._rev;
			console.log("$scope.players:");
	    	console.log($scope.players);
	    	console.log("$scope.players.checked:");
	    	console.log($scope.players[0].checked);
	    	var oldData= new google.visualization.DataTable(),
    donnee =[];
	oldData.addColumn('string', 'name');
	oldData.addColumn('number', 'Points');
    donnee.push(['Joueurs', 'Service', 'Attaque', 'Contre', 'Reception', 'defense', 'Soutien', 'Relance', 'Passe']);
    for(var i = 0;i < $scope.players.length;i++)
	    	{
				donnee.push([
				$scope.players[i].id,
				$scope.players[i].statistiques.servicePoint,
				$scope.players[i].statistiques.attaquePoint,
				$scope.players[i].statistiques.contrePoint,
				$scope.players[i].statistiques.receptionPoint,
				$scope.players[i].statistiques.defensePoint,
				$scope.players[i].statistiques.soutienPoint,
				$scope.players[i].statistiques.relancePoint,
				$scope.players[i].statistiques.passePoint,
				]);
				//if(i != parseInt($scope.players.length) - 1)donnee += ",";
			}
			//donnee += "]";
			//oldData.addRows([  ['2004', 1000 , 400], ['2005', 1170, 460], ['2006', 660, 1120], ['2007',1030,540]
			//oldData.addRows(donnee);
	    	console.log("MALAAAADDEEEEEEEEEEEEEEEE");
			console.log(donnee);
//test();

						/***********------*************/
			 // Some raw data (not necessarily accurate)
    var rowData1 = [['Joueurs', 'Service', 'Attaque', 'Contre', 'Reception', 'defense', 'Soutien', 'Relance', 'Passe'],
                    ['2004/05', 165, 938, 522, 998, 450, 114.6],
                    ['2005/06', 135, 1120, 599, 1268, 288, 382],
                    ['2006/07', 157, 1167, 587, 807, 397, 623],
                    ['2007/08', 139, 1110, 615, 968, 215, 409.4],
                    ['2008/09', 136, 691, 629, 1026, 366, 569.6]];
    var rowData2 = [['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua  Guinea',
                     'Rwanda', 'Average'],
                    ['2004/05', 122, 638, 722, 998, 450, 614.6],
                    ['2005/06', 100, 1120, 899, 1268, 288, 682],
                    ['2006/07', 183, 167, 487, 207, 397, 623],
                    ['2007/08', 200, 510, 315, 1068, 215, 609.4],
                    ['2008/09', 123, 491, 829, 826, 366, 569.6]];

    // Create and populate the data tables.
    var data = [];
    data[0] = google.visualization.arrayToDataTable(donnee);
    data[1] = google.visualization.arrayToDataTable(rowData2);

    var options = {
      width: 800,
      height: 480,
      vAxis: {title: "Points"},
      hAxis: {title: "Joueurs"},
      seriesType: "bars",
      series: {1: {type: "line"}},
      animation:{
        duration: 1000,
        easing: 'out'
      },
    };
    var current = 0;
   
    var chart = new google.visualization.ColumnChart(document.getElementById('visualization'));
    var button = document.getElementById('b1');
    function drawChart() {
      // Disabling the button while the chart is drawing.
      //button.disabled = true;
      google.visualization.events.addListener(chart, 'ready',
          function() {
            //button.disabled = false;
            //button.value = 'Switch to ' + (current ? 'Tea' : 'Coffee');
          });
      options['title'] = 'Graphique points joueurs';

      chart.draw(data[current], options);
    }
    drawChart();

    /*button.onclick = function() {
      current = 1 - current;
      drawChart();
    }*/
			/***********------*************/
		
			$scope.$apply();
		//}
    	
   	});
	$scope.compteur = 0;
	/*socket.on("test2", function(data) 
    	{
    		console.log("data:");
			console.log(data);
    		//$scope.compteur = data;
    		
			//$scope.$apply();
    	});
    	
	$interval(function () {
		$scope.compteur += 1;
		console.log("$scope.compteur:");
		console.log($scope.compteur);
        socket.broadcast.emit('test2', $scope.compteur);
        }, 1000);*/
	
	socket.on("test", function(data) 
    {
    	console.log("data:");
	    	console.log(data);
	    	if(data._id)
	    	{
	    		$scope.players = data.equipe1.joueurs;
	    		$scope.id = data._id;
	    		
	    		
				console.log("$scope.players:");
		    	console.log($scope.players);
		    	var oldData= new google.visualization.DataTable(),
	    donnee =[];
		oldData.addColumn('string', 'name');
		oldData.addColumn('number', 'Points');
	    donnee.push(['Joueurs', 'Service', 'Attaque', 'Contre', 'Reception', 'defense', 'Soutien', 'Relance', 'Passe']);
	    for(var i = 0;i < $scope.players.length;i++)
		    	{
					donnee.push([
					$scope.players[i].id,
					$scope.players[i].statistiques.servicePoint,
					$scope.players[i].statistiques.attaquePoint,
					$scope.players[i].statistiques.contrePoint,
					$scope.players[i].statistiques.receptionPoint,
					$scope.players[i].statistiques.defensePoint,
					$scope.players[i].statistiques.soutienPoint,
					$scope.players[i].statistiques.relancePoint,
					$scope.players[i].statistiques.passePoint,
					]);
					//if(i != parseInt($scope.players.length) - 1)donnee += ",";
				}
				//donnee += "]";
				//oldData.addRows([  ['2004', 1000 , 400], ['2005', 1170, 460], ['2006', 660, 1120], ['2007',1030,540]
				//oldData.addRows(donnee);
		    	console.log("MALAAAADDEEEEEEEEEEEEEEEE");
				console.log(donnee);
	//test();

							/***********------*************/
				 // Some raw data (not necessarily accurate)
	    var rowData1 = [['Joueurs', 'Service', 'Attaque', 'Contre', 'Reception', 'defense', 'Soutien', 'Relance', 'Passe'],
	                    ['2004/05', 165, 938, 522, 998, 450, 114.6],
	                    ['2005/06', 135, 1120, 599, 1268, 288, 382],
	                    ['2006/07', 157, 1167, 587, 807, 397, 623],
	                    ['2007/08', 139, 1110, 615, 968, 215, 409.4],
	                    ['2008/09', 136, 691, 629, 1026, 366, 569.6]];
	    var rowData2 = [['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua  Guinea',
	                     'Rwanda', 'Average'],
	                    ['2004/05', 122, 638, 722, 998, 450, 614.6],
	                    ['2005/06', 100, 1120, 899, 1268, 288, 682],
	                    ['2006/07', 183, 167, 487, 207, 397, 623],
	                    ['2007/08', 200, 510, 315, 1068, 215, 609.4],
	                    ['2008/09', 123, 491, 829, 826, 366, 569.6]];

	    // Create and populate the data tables.
	    var data = [];
	    data[0] = google.visualization.arrayToDataTable(donnee);
	    data[1] = google.visualization.arrayToDataTable(rowData2);

	    var options = {
	      width: 800,
	      height: 480,
	      vAxis: {title: "Points"},
	      hAxis: {title: "Joueurs"},
	      seriesType: "bars",
	      series: {1: {type: "line"}},
	      animation:{
	        duration: 1000,
	        easing: 'out'
	      },
	    };
	    var current = 0;
	    // Create and draw the visualization.
	    //var chart = new google.visualization.ComboChart(document.getElementById('visualization'));
	    //var chart = new google.visualization.PieChart(document.getElementById('visualization'));
	    //var chart = new google.visualization.BarChart(document.getElementById('visualization'));
	    //var chart = new google.visualization.LineChart(document.getElementById('visualization'));
	    var chart = new google.visualization.ColumnChart(document.getElementById('visualization'));
	    //var button = document.getElementById('b1');
	    function drawChart() {
	      // Disabling the button while the chart is drawing.
	      //button.disabled = true;
	      google.visualization.events.addListener(chart, 'ready',
	          function() {
	            //button.disabled = false;
	           // button.value = 'Switch to ' + (current ? 'Tea' : 'Coffee');
	          });
	      options['title'] = 'Graphique points joueurs';

	      chart.draw(data[current], options);
	    }
	    drawChart();

	   /* button.onclick = function() {
	      current = 1 - current;
	      drawChart();
	    }*/
	}
				/***********------*************/
   	});
	$scope.saveAction = function() 
    { 
    	var jsonDoc = {
    		"_id":$scope.id,
    		"_rev":$scope.rev,
    		"equipe1": {
    			"joueurs": $scope.players
    			}
    	};
    	$volleyballStatsDB.instant(jsonDoc);
	
		//socket.emit('test', jsonDoc);
	};
	$scope.saveStats = function() 
    {
    	console.log("on est dans le saveStats");
	    var jsonDoc = {
    		"_id":$scope.id,
    		"_rev":$scope.rev,
    		"equipe1": {
    			"joueurs": $scope.players
    			}
    	};
    	$volleyballStatsDB.instant(jsonDoc);
    	$volleyballStatsDB.save(jsonDoc).then(function(response) 
  		{
	        console.log("response:");
	    	console.log(response);

    	}, 
    	function(error) 
    	{
            console.log("ERROR -> " + error);
        });
	};
	
})

.controller('addMembreController',['$scope', '$http', '$location', '$rootScope', '$translate', 'Upload', '$timeout','$volleyballStatsDB', function($scope, $http, $location, $rootScope, $translate, Upload, $timeout, $volleyballStatsDB) 
{ 
	//url de la feuille d'erreur
	$scope.url_erreur =   "/components/layout/erreur.html";
	console.log('je suis dans addMembresController');
	$scope.tasks = [
    { title: 'Collect coins' },
    { title: 'Eat mushrooms' },
    { title: 'Get high enough to grab the flag' },
    { title: 'Find the Princess' }
  ];
	$scope.postes = 
	[{
    	"nomPoste": 
    	[
       		"Choisir poste:",
        	"Attaquant",
        	"Défenseur",
        	"Passeur",
        	"Libéral"
		]
	}];
	$scope.types = 
	[{
    	"nomType": 
    	[
       		"Choisir type:",
        	"joueur plage",
        	"joueur salle",
        	"Entraineur",
        	"Arbitre",
        	"Comité"
		]
	}];
	
//\__________________fin test choix poste joueurs____________________/
	
	/**********debut upload image/pdf **************/
		$scope.$watch('files', function () {
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
	                      /*dossier: $scope.result.generalite.nomDuSite,
	                      optradio: $scope.result.generalite.optradio,*/
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
	                }, null, function (evt) {
	                    var progressPercentage = parseInt(100.0 *
	                    		evt.loaded / evt.total);
	                    $scope.log = 'progress: ' + progressPercentage + 
	                    	'% ' + evt.config.data.file.name + '\n' + 
	                      $scope.log;
	                      
	                });
	              }
	            }
	        }
	    };
	/**********fin upload image/pdf**************/
	
	//ajoute un membre puis redirige sur son détail
	$scope.submitForm = function(form)
	{		
		console.log("form:");
		console.log(form);
		console.log("form.files:");
		console.log(form.files);
		form.photo = $scope.image;
		$volleyballStatsDB.save(form).then(function(data) 
		{
    		$location.path('/volley-ball/membres/choisir');
        }, function(error) {
            console.log("ERROR -> " + error);
        });		
	};
}]); 