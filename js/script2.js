var app = {
	games : [],
	nbGame : 0,
	reset : false,
	init : function () {
		$('#start').on('click', app.startGame);
	},
	verif : function (chars) {
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
	random : function(min, max) {
		//Création du random
		var random = Math.floor(Math.random() * ( max - min + 1 ));
		return random;
	},
	partie : function () {
		//Afficher le bouton "Valider"
		$('#validation').css('display', 'inline-block');
		//Affect les random et les intégrer a l'HTML
		app.random1 = app.random(0, 10);
		app.random2 = app.random(0, 10);
		app.randomResult = app.random1 + app.random2;
		$('#firstNumber').text(app.random1);
		$('#secondNumber').text(app.random2);
		app.userResult = Number($('#userResult').val());
		app.nbGame++;
		//Affiche le numéro de la question
		$('#questionNumber').text('Question n°' + app.nbGame);
		//Lorque que l'on clique sur le bouton "valider", cela lance une fonction qui controle le résultat.
		$('#validation').on('click', app.verifResult);
		var result = {
			//Numéro de la Game
			numeroGame : app.nbGame,
			// Gagné ou Perdu?
			win : app.userResult === app.randomResult,
			// Le nombre a trouver
			random : app.randomResult,
			//Addition
			sum : app.random1 + ' + ' + app.random2,
			// Résultat de l'user
			user : app.userResult
		};
		app.reset = true;
		return result;
	},
	createTd : function ( content ) {
		//Creation de la balaise <td> avec son contenu
		var td = document.createElement('td');
		td.textContent = content;
		return td;
	},
	addTable : function () {
		//Rappel de la forme du tableau :
		// # partie  ||  question  || Your Result  || Good Result
		
		//Création des TD
		var tdGame = app.createTd(app.nbGame);
		var tdQuestion = app.createTd(app.random1 + ' + ' + app.random2);
		var tdUserResult = app.createTd(app.userResult);
		var tdRandomResult = app.createTd(app.randomResult);
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
		//Ajout des classes "bad" ou "good" en fonction du résultat
		if (app.userResult === app.randomResult) {
			tr.className = "good"
		} else { tr.className = "bad" };
	},
	startGame : function () {
		
		//Gestion de plusieur partie
		do {
			app.resetCss();
			//On lance une partie et on récupère le résultat à la fin de la partie
			var data = app.partie();
			//Enregistrement des résultat dans le tableau
			app.games.push ( data );
		} while (app.reset === true);
	},
	trueAnswer : function () {
		//Afficher le tampon et le message pour la bonne réponse
		$('#solution').text('VRAI! C\'est la bonne réponse. Continue comme ça!');
		$('#true, #solution').css('visibility', 'visible');
	},

	falseAnswer : function () {
		//Afficher le tampon et le message pour la mauvaise réponse
		$('#solution').text('FAUX! La réponse était : ' + app.randomResult + ' !');
		$('#false, #solution').css('visibility', 'visible');
	},
	verifResult : function () {
		//Comparaison du résultat User vs Random
		//Creation de la variable récupérant le valeur de l'utilisateur en convertissant en Nombre
		app.userResult = Number($('#userResult').val());
		if (app.userResult === app.randomResult) {
			app.trueAnswer();
		}
		else {
			app.falseAnswer();
		}
		//Ajouter une ligne au tableau
		app.addTable();
		//Cacher et afficher les bouton "VALIDER" et "NEXT"
	//	$('#validation').css('display', 'none');
//		$('#next').css('display', 'inline-block');
//		$('#next').on('click', app.reset);
	},
	resetCss : function () {
		//Masquer les Tampons, le message et le bouton "NEXT"
		$('#false, #true, #solution').css('visibility', 'hidden');
	//	$('#next').css('display', 'none');
		//Effacer le contenu du champs text
		$('#userResult').val('');
	},
};

$(app.init);

