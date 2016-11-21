'use strict';
var module = "rapport";
starter.run(function($rapportDB) {
		$rapportDB.setDatabase("aced-cobraced");
    	//$rapportDB.sync("http://localhost:5984/aced-cobraced"); 
    	$rapportDB.sync("root:comendo2016@http://51.254.119.71:5984/aced-cobraced");
})
.constant('all_'+module, {
  db: 'http://51.254.119.71:5984/aced-cobraced/_design/aced-cobraced/_view/all_'+module
})
.factory('Rapport', function($http, $location)
{
	var rapport ={};
	var rapportJson ={};
	
	//\____________menu déroulant pour l'objet de la visite_____________/
	rapport.setObjet = function(nameObjet)
	{
		var setTable;
		switch(nameObjet)
		{
			//case "services": setTable = ["Médiation Social", "Insertion", "Administration", "Animation"];
			case "services": setTable = ["Direction", "Animatrice", "Administration","Agent de pr&eacute;vention et de m&eacute;diation","SPIP","Administration/ comptabilit&eacute;","Coordinateur/ Coordonnateur","Agent Espaces Verts","Autre"];
			break;
			case "statuts": setTable = ["Demandeur d’emploi","Parent","Elève","PPSMJ","Autre, précisez"];
			break;
			case "natures": setTable = ["Agression verbale","Agression physique","Menace","Comportement","indécent","Propos désagréable","Racisme, Sexisme","Autre, précisez"];
			break;
			case "lieux": setTable = ["Bureau de l’Administration","L’accueil","L’infirmerie","Bureau du pôle social","Bureau du SPIP","Salle de réunion","Salle d’Animation","Toilettes","Couloir","Balcon","Parking","Etablissement","scolaire","Chantier, précisez :","Autre, précisez :"];
			break;
			case "jourIncidents": setTable = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
			break;
			case "trancheIncidents": setTable = ["7h00 – 9h00","9h00 – 11h00","11h00 – 13h00","13h00 – 15h00","15h00 – 17h00","17h00 – 19h00","19h00 – 21h00"];
			break;
			case "agressions": setTable = ["Insultes","Violence physique","unilatérale","Bagarre","Violence sexuelle","Attouchement","Menaces","Autre :"];
			break;
			case "deviances": setTable = ["Vol","Racket caractérisé","Pression verbale","proche du racket","Trafics (matériel, drogue, …)","Consommation de produits illicites","Inconnu"];
			break;
			case "degradations": setTable = ["Vandalisme","Tags, graffitis","Salissure","délibérée","Détériorations","volontaires","Aucune"];
			break;
			case "conduites": setTable = ["Consommation d’alcool","Consommation de tabac","Inconnu"];
			break;
			case "absences": setTable = ["Cours séchés","Absentéisme","Retards répétitifs"];
			break;
			
		}
		return setTable;
	}; 
	
	//\____________ genere l'id unique______/
	rapport.generaterapportId = function(jsonDocument) 
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
	rapport.generaterapportFace = function(photo, id) 
    {
		var sep = photo.split("."),
		ext = sep[1],
		face = id+"."+ext;
		console.log("face:");
		console.log(face);
		return face;
	};
	
	//\____________ enleve les accents______/
	rapport.sansAccent = function(str)
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
	//\____________ajouter nouveau ou modifier rapport_________________/
	rapport.addUpdateVisiteur = function(formVisiteur, choix)
	{
		if(choix == "update")
		{
			rapportJson._id = formVisiteur._id;
			rapportJson._rev = formVisiteur._rev;
		}
		rapportJson.nom = formVisiteur.nom.$modelValue;
		rapportJson.prenom = formVisiteur.prenom.$modelValue;
		rapportJson.mail = formVisiteur.mail.$modelValue;
		rapportJson.tel = formVisiteur.tel.$modelValue;
		rapportJson.service = formVisiteur.service.$modelValue;
		rapportJson.but = formVisiteur.but.$modelValue;			
		rapportJson.objet = formVisiteur.objet.$modelValue;
		console.log("rapportJson:");
		console.log(rapportJson);
		
		return rapportJson;	
	};	
	return rapport;
})
.service('$rapportDB',["$rootScope", "$http", "$q", "$moment", function($rootScope, $http, $q, $moment)
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
                $rootScope.$broadcast("$rapportDB:change", change);
            } else {
                $rootScope.$broadcast("$rapportDB:delete", change);
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
		 $http.get("http://51.254.119.71:5984/rapport/"+jsonDoc._id).then(function (result)
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
		
	//\____________ ajouter ou modifier nouveau rapport _________________/
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

	//\____________ recuperer la liste des rapports sur couchDB______/
	this.getAllrapport = function()
	{	
		return $http.get(allrapport.db);//+'?key=null');
	}
	//\____________ récuperer un rapport sur couchDB __________/
	this.getVisiteurById = function(ID)
	{
		//return $http.get(allVisiteur.db+'?key={"details":"'+ID+'"}');
	}
	//\____________ supprimer un rapport sur couchDB __________/
	this.remove = function(ID, REV)
	{
		var defer = $q.defer();
		
		$rapportDB.delete(ID, REV).then(function(response) {
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