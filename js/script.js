var app = {
	seconds : 10,
	numberGame : 0,
	init : function () {
		//Appel et gestion du bouton START
		var btnStart = document.getElementById('start');
		btnStart.addEventListener('click', app.startTheGeme);
		//Appel et gestion du bouton OPTION
		var btnOption = document.getElementById('option');
		btnOption.addEventListener('click', app.option);
	},
	verif : function ( chars ) {
		//Caractères autorisés
		var regex = new RegExp('[0-9]', 'i');
		var valid;
		for (var x = 0; x < chars.value.length; x++) {
			valid = regex.test(chars.value.charAt(x));
			if (valid === false) {
				chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x +1); x--;
			}
		}
	},
	random : function( max ) {
		//Création du random
		var random = Math.floor(Math.random() * ( max +1 ));
		return random;
	},
	startTheGeme : function () {
		//Par sécurtié, on Stop le Timer pour etre sur qu'il soit bien remis à zero!
		app.stopTimer();
		//Effacer les elements
		app.reset();
		//Modifier le numéro de la partie et afficher le numéro de la question
		app.numberGame++;
		var textQuestion = document.getElementById('questionNumber');
		textQuestion.textContent = 'Question n°'+app.numberGame;
		//Attribution des randoms
		app.randomNumber1 = app.random(10);
		app.randomNumber2 = app.random(10);
		app.randomResult = app.randomNumber1 + app.randomNumber2;
		// Affichage dans la console pour des essais :
		console.log(app.randomNumber1 + ' + ' + app.randomNumber2 + ' = ' + app.randomResult);
		//Afficher les randoms dans chaque DIV
		var divNumber1 = document.getElementById('firstNumber');
		var divNumber2 = document.getElementById('secondNumber');
		divNumber1.textContent = app.randomNumber1;
		divNumber2.textContent = app.randomNumber2;
		//Afficher le bouton "Valider"
		app.valid = document.getElementById('validation');
		app.valid.style.visibility = 'visible';
		//Ajout d'une seconde pour avoir le temps d'afficher l'origine du Timer et active le Timer
		app.seconds++; 
		app.updateTimer();
		//Ecoute Clique pour vérifier le résultat du joueur.
		app.valid.addEventListener('click', app.verifResult);
		},
	verifResult : function () {
		//Arret du Timer
		app.stopTimer();
		//Recuperation du résultat du joueur + convertion en Number
		app.userResult = Number(document.getElementById('userResult').value);
		if (app.userResult === app.randomResult) {
			app.message.textContent = 'VRAI! C\'est la bonne réponse. Continue comme ça!';
			var tampon = document.getElementById('true');
		} else {
			app.message.textContent = 'FAUX! Ce n\'est pas la bonne réponse. La réponse était : ' + app.randomResult;
			var tampon = document.getElementById('false');
		}
		app.message.style.visibility = 'visible';
		app.valid.style.visibility = 'hidden';
		tampon.style.visibility = 'visible';
		app.addTable();	
	},

	reset : function () {
		//Pour assurer que tout soit cacher, et avoir une page vide
		//Pour message je mets une variable car je vais encore l'utiliser
		app.message = document.getElementById('solution');
		app.message.style.visibility = 'hidden';
		//Ici pas besoin de créer des variables
		document.getElementById('true').style.visibility = 'hidden';
		document.getElementById('false').style.visibility = 'hidden';
		document.getElementById('userResult').value="";
		//Initialisation du Timer
		app.seconds = 10;
	},
	createTd : function ( content ) {
		//Creation de la balaise <td> avec son contenu
		var td = document.createElement('td');
		td.textContent = content;
		return td;
	},
	addTable : function () {
		//Rappel de la forme du tableau :
		// # partie  ||  Question  ||  UserResult  ||  RandomResult

		//Création des TD
		var tdGame = app.createTd( app.numberGame );
		var tdQuestion = app.createTd ( app.randomNumber1 + ' + ' + app.randomNumber2 );
		var tdUserResult = app.createTd( app.userResult );
		var tdRandomResult = app.createTd ( app.randomResult);
		//Création du TR
		var tr = document.createElement('tr');
		//Ajout des Enfants du TR
		tr.appendChild( tdGame );
		tr.appendChild( tdQuestion );
		tr.appendChild( tdUserResult );
		tr.appendChild( tdRandomResult );
		//Selection du tableau
		var arrayScore = document.querySelector('#score');
		arrayScore.appendChild( tr );
		//Ajout des classes "bad" ou " good " en fonction du résultat
		if ( app.userResult === app.randomResult ) {
			tr.className = "good"
		} else { tr.className = "bad" };
	},
	updateTimer : function () {
		//Declaration du Timer
		//Décompte (--)
		app.seconds--;
		//On affiche le Timer
		app.timer = document.getElementById('timer').textContent = app.seconds + ' s.';
		//Test pour savoir si le décompte tombe a Zero!
		if (app.seconds <= 0 ) {
			app.verifResult();
		} else {
			app.monTimer = setTimeout(app.updateTimer, 1000);
		}
	},
	stopTimer : function () {
		//Arret le timer
		clearTimeout( app.monTimer );
	},
}

document.addEventListener('DOMContentLoaded', app.init);
