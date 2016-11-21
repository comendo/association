'use strict';
var module = "pointage";
starter.run(function($pointageDB) {
		$pointageDB.setDatabase("aced-cobraced");
    	//$pointageDB.sync("http://localhost:5984/aced-cobraced"); 
    	$pointageDB.sync("root:comendo2016@http://51.254.119.71:5984/aced-cobraced");
})
.constant('allPointage', {
  db: 'http://51.254.119.71:5984/aced-cobraced/_design/aced-cobraced/_view/pointage'
})
.factory('Pointage', function($http, $location)
{
	var pointage ={};
	var pointageJson ={};
	
	//\____________menu déroulant pour l'objet de la visite_____________/
	pointage.setObjet = function(nameObjet)
	{
		var setTable;
		switch(nameObjet)
		{
			case "services": setTable = ["Médiation Social", "Insertion", "Administration", "Animation"];
						break;
			case "objets": setTable = ["Prise de rendez-vous", "Entretien", "Renseignements", "Récupérer un document", "Déposer un CV", "Don", "Autre"];
						break;
		}
		return setTable;
	}; 
	
	//\____________ genere l'id unique______/
	pointage.generatePointageId = function(jsonDocument) 
    {
    	console.log("jsonDocument:");
    	console.log(jsonDocument);
		console.log("jsonDocument.naissance:");
    	console.log(jsonDocument.naissance);
		var naissance = jsonDocument.naissance.toString();
		console.log("naissance:");
    	console.log(naissance);
		
		var sep = naissance.split(" ");
		var naissance_id = sep[0]+sep[1]+sep[2]+sep[3];
		var id = jsonDocument.nom+jsonDocument.prenom+naissance_id;
		console.log("id:");
		console.log(id);
		return id;
	};
	
	//\____________ genere le nom unique de la photo______/
	pointage.generatePointageFace = function(photo, id) 
    {
		var sep = photo.split("."),
		ext = sep[1],
		face = id+"."+ext;
		console.log("face:");
		console.log(face);
		return face;
	};
	
	//\____________ enleve les accents______/
	pointage.sansAccent = function(str)
	{
	    var accent = [
	        /[\300-\306]/g, /[\340-\346]/g, // A, a
	        /[\310-\313]/g, /[\350-\353]/g, // E, e
	        /[\314-\317]/g, /[\354-\357]/g, // I, i
	        /[\322-\330]/g, /[\362-\370]/g, // O, o
	        /[\331-\334]/g, /[\371-\374]/g, // U, u
	        /[\321]/g, /[\361]/g, // N, n
	        /[\307]/g, /[\347]/g, // C, c
	    ];
	    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
	    for(var i = 0; i < accent.length; i++){
	        str = str.replace(accent[i], noaccent[i]);
	    }
	    return str;
	};
	//\____________ajouter nouveau ou modifier pointage_________________/
	pointage.addUpdateVisiteur = function(formVisiteur, choix)
	{
		if(choix == "update")
		{
			pointageJson._id = formVisiteur._id;
			pointageJson._rev = formVisiteur._rev;
		}
		pointageJson.nom = formVisiteur.nom.$modelValue;
		pointageJson.prenom = formVisiteur.prenom.$modelValue;
		pointageJson.mail = formVisiteur.mail.$modelValue;
		pointageJson.tel = formVisiteur.tel.$modelValue;
		pointageJson.service = formVisiteur.service.$modelValue;
		pointageJson.but = formVisiteur.but.$modelValue;			
		pointageJson.objet = formVisiteur.objet.$modelValue;
		console.log("pointageJson:");
		console.log(pointageJson);
		
		return pointageJson;	
	};	
	return pointage;
})
.service('$pointageDB',["$rootScope", "$http", "$q", "$moment", function($rootScope, $http, $q, $moment)
{
	var database;
    var changeListener;
	
	this.setDatabase = function(databaseName) {
        database = new PouchDB(databaseName, {adapter: 'websql'});
        console.log("database*****************************************************************************:",database);
    }

    this.startListening = function() {
        changeListener = database.changes({ 
            live: true,
            include_docs: true
        }).on("change", function(change) {
            if(!change.deleted) {
                $rootScope.$broadcast("$pointageDB:change", change);
            } else {
                $rootScope.$broadcast("$pointageDB:delete", change);
            }
        });
    }

    this.stopListening = function() {
        changeListener.cancel();
    }

    this.sync = function(remoteDatabase) {
        database.sync(remoteDatabase, {live: true, retry: true});
    }
	//\____________ definir instant present _________________/
	this.instant = function(jsonDocument)
	{
		$moment.locale('fr');
		jsonDocument.date_full = $moment().format('LLLL'); 
		jsonDocument.date = $moment().format('L');
		jsonDocument.jour_mois = $moment().format('DD');
		jsonDocument.jour_semaine = $moment().format('dddd');
		jsonDocument.mois = $moment().format('MMMM');
		jsonDocument.annee = $moment().format('YYYY');  
		jsonDocument.heure = $moment().format('LT');	
		console.log("jsonDocument INSTANT SERVICE*********:");
		console.log(jsonDocument);
		return jsonDocument;
	};
	//\____________ genere l'id unique______/
	var generateId = function(jsonDocument) 
    { 
		//var jsonDocument = {};
		jsonDocument.id = jsonDocument.nom+jsonDocument.prenom;
		return jsonDocument.id;
	};
	//\____________ hydrate le json______/
	var generateContent = function(jsonDoc) 
    {
		var jsonDocument = {};
		//instant(jsonDocument);//integre les informations de l'instant T	
		jsonDocument._id = jsonDoc._id;
		 $http.get("http://51.254.119.71:5984/pointage/"+jsonDoc._id).then(function (result)
			{
    		jsonDocument._rev = result.data._rev;
    		});
		
		/*jsonDocument.nom = jsonDoc.nom.$modelValue;
		jsonDocument.prenom = jsonDoc.prenom.$modelValue;		
		jsonDocument.photo = jsonDoc.photo;		
		jsonDocument.type = jsonDoc.choixType.$modelValue;
		jsonDocument.poste = jsonDoc.choixPoste.$modelValue;
		jsonDocument.taille = jsonDoc.taille.$modelValue;
		jsonDocument.mail = jsonDoc.mail.$modelValue;
		jsonDocument.pwd = jsonDoc.pwd.$modelValue;*/
		return jsonDocument;
	};
		
	//\____________ ajouter ou modifier nouveau pointage _________________/
	this.save = function(jsonDocument)
	{
		var deferred = $q.defer();
		
        if(!jsonDocument._id) {
        	//jsonDocument._id = generateId(jsonDocument);
        	//jsonDocument = generateContent(jsonDocument);
        	console.log("jsonDocument_babas0:");
        	console.log(jsonDocument);
            database.post(jsonDocument).then(function(response){
            	console.log("C BON!!");
            	console.log(response);
                deferred.resolve(response);
            }).catch(function(error) {
            	console.log("C PAS BON!!");
                deferred.reject(error);
            });
        } else {
        	//jsonDocument = generateContent(jsonDocument);
        	console.log("jsonDocument_babas2:");
        	console.log(jsonDocument);
            database.put(jsonDocument).then(function(response){
                deferred.resolve(response);
            }).catch(function(error) {
                deferred.reject(error);
            });
        }
        return deferred.promise;
    }

	//\____________ recuperer la liste des pointages sur couchDB______/
	this.getAllPointage = function()
	{	
		return $http.get(allPointage.db);//+'?key=null');
	}
	//\____________ récuperer un pointage sur couchDB __________/
	this.getVisiteurById = function(ID)
	{
		//return $http.get(allVisiteur.db+'?key={"details":"'+ID+'"}');
	}
	//\____________ supprimer un pointage sur couchDB __________/
	this.remove = function(ID, REV)
	{
		var defer = $q.defer();
		
		$pointageDB.delete(ID, REV).then(function(response) {
		defer.resolve(response);
    	console.log("le redacteur a ete supprime !!!" );
	});
    	return defer.promise;
	}
	
	this.delete = function(documentId, documentRevision) {
        return database.remove(documentId, documentRevision);
    }

    this.get = function(documentId) {
        return database.get(documentId);
    }

    this.destroy = function() {
        database.destroy();
    }
}]);