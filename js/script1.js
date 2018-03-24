var app = {
	nbGame : 0, //Nombre de partie
	init : function () {
		$('#start').on('click', app.start);
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
	start : function () {
		//Maque le bouton "COMMENCER" et affiche le bouton "STOP"
		$('#start').css('display', 'none');
		$('#stop').css('display', 'inline-block')
		//Action de bouton "STOP" -> ici, c'est test pour mes essais
		$('#stop').on('click', app.test);
		app.game();	

		
	},

	random : function(min, max) {
		//Création des variables Randoms
		app.random1 = Math.floor(Math.random() * ( max - min + 1 ));
		app.random2 = Math.floor(Math.random() * ( max - min + 1 ));
		console.log(app.random1);
		console.log(app.random2);
		//Calul de l'opération
		app.randomResult = app.random1 + app.random2;
		console.log(app.randomResult);
	},

	game : function () {
		//Lancement d'une partie
		//Ajoute une partie en l'incrémentant et l'affiche
		app.nbGame ++;
		$('#questionNumber').text('Question n°' + app.nbGame);
		//Génération des Randoms et les afficher
		app.random(0, 10);
		$('#firstNumber').text(app.random1);
		$('#secondNumber').text(app.random2);
		//Afficher le bouton "VALIDER"
		$('#validation').css('display', 'inline-block');
		//Action sur le bouton "VALIDER"
		$('#validation').on('click', app.verifResult);
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
		$('#validation').css('display', 'none');
		$('#next').css('display', 'inline-block');
		$('#next').on('click', app.reset);
	},

	trueAnswer : function () {
		//Afficher le tampon et le message
		$('#solution').text('VRAI! C\'est la bonne réponse. Continue comme ça!');
		$('#true, #solution').css('visibility', 'visible');
	},

	falseAnswer : function () {
		//Afficher le tampon et le message
		$('#solution').text('FAUX! La réponse était : ' + app.randomResult + ' !');
		$('#false, #solution').css('visibility', 'visible');
	},

	createTd : function ( content ) {
		//Création des Elements TD
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

	reset : function () {
		//Masquer les Tampons, le message et le bouton "NEXT"
		$('#false, #true, #solution').css('visibility', 'hidden');
		$('#next').css('display', 'none');
		//Effacer le contenu du champs text
		$('#userResult').val('');
		app.game();
	},

	test : function () {

	},

};

$(app.init);
