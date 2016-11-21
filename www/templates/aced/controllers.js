var module = 'aced';
starter.controller(module+'IntroCtrl', function($scope) {
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
.controller(module+'ReglementCtrl', function($scope, $rootScope)  
{
	console.log("je suis dans acedReglementCtrl");
	
	/************debut firebase****************/
	var ref = firebase.database().ref('aced/reglement');
	
	$scope.reglements = {};
     
     ref.on("value", function(snapshot) {
     	$scope.$apply(function() {
     		$scope.reglements = snapshot.val();
     		//console.log("$scope.reglements:",$scope.reglements);
		 });
	 });
	/***************fin firebase**********************/
	
	
	$scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
  
  $scope.expandItem = function(item) {
  	//console.log("je suis dans expandItem");
      if ($scope.isItemExpanded(item)) {
        $scope.shownItem = null;
      } else {
        $scope.shownItem = item;
      }
      //console.log("$scope.shownItem:",$scope.shownItem);
    };
    $scope.isItemExpanded = function(item) {
    	//console.log("je suis dans isItemExpanded");
    	//console.log("item:",item);
      return $scope.shownItem === item;
    };
}); 