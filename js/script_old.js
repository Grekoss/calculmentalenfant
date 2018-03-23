var app = {
  //Seconds est le temps défini
  seconds : 20,
  //Variable qui va enregistrer les données de chaque parties
  games : [],
  diffilcuty : [10, 20, 30, 50],
  init : function() {
    // Test pour l'appel d'Init
    // console.log('Appel de INIT');

    // Action lorsque l'on clique sur "COMMENCER"
    $('#start').on('click', app.game);
  },
  verif : function(chars) {
    //Caractères autorisés
    var regex = new RegExp('[0-9]', 'i');
    var valid;
    for (var  x = 0; x < chars.value.length; x++) {
      valid = regex.test(chars.value.charAt(x));
      if (valid === false) {
        chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1); x--;
      }
    }
  },
  random : function(min, max){
    //Creation des variables Randoms
    app.random1 = Math.floor(Math.random() * ( max - min + 1 ));
    app.random2 = Math.floor(Math.random() * ( max - min + 1 ));
    console.log(app.random1);
    console.log(app.random2);
    //Calcul de l'opéCreation
    app.result  = app.random1 + app.random2;
    console.log(app.result);
  },
  game : function () {
    //Appel pour la création des nombres aléatoires
    //Les parametres doivent etre de 0 et le choix de la diffilcuté avec l'array app.diffilcuty
    app.random(0,app.diffilcuty[0]);
    //Mise en place dans le html des nombre aléatoire
    $('#firstNumber').text(app.random1);
    $('#secondNumber').text(app.random2);
    //Cacher le bouton COMMENCER et afficher le STOP
    $('#start').css('display', 'none');
    $('#stop').css('display', 'inline-block');
    //Initialisation du timer
    app.seconds = 20;
    //Lancer le Timer
    app.updateTimer();
    //Action sur le bouton STOP
    $('#validation').on('click', app.verifResult);
  },
  verifResult : function () {
    //On arrete le Timer
    app.stopTimer();
    var userResult = $('#userResult').val();
    if (Number(userResult) === app.result) {
      app.trueReponse();
    } else {
      app.falseReponse();
    }
    app.switchValideNext();
    //ICI on devra récuperer les données de la partie pour push sur le tableau!!!!
  },
  switchValideNext : function () {
    //cache le btn Valaider et affiche btn suivant et action sur next
    $('#validation').css('display', 'none');
    $('#next').css('display', 'inline-block');
    $('#next').on('click', app.next);
  },
  updateTimer : function() {
    //Toute les secondes, on décrémente le timer et si on arrive à 0, on stop!
    //On affiche le timer
    $('#cpt').css('visibility', 'visible');
    $('#cpt').text(app.seconds + ' s');
    //Est ce qu'on a fini?
    if(app.seconds <= 0) {
      app.falseReponse();
      app.switchValideNext();
    } else {
      app.myTimer = setTimeout(app.updateTimer, 1000);
    }
    // On décrémente le Timer
    app.seconds--;
  },
  stopTimer : function() {
    //Test pour savoir si mon clique fonctionne histoire d'enlever un doute
    console.log('arret timer');
    //Arreter le Timer
    clearTimeout(app.myTimer);
    //Cacher le timer
    $('#cpt').css('visibility', 'hidden');
  },
  falseReponse : function() {
    //Etape de la fause réreponse
    //Affiche le tampon faux
    $('#false').css('visibility', 'visible');
    //Affiche la solution
    $('#solution').css('visibility', 'visible');
    $('#solution').text('La bonne réponse était : ' + app.random1 + ' + ' + app.random2 + ' = ' + app.result);
  },
  trueReponse : function () {
    //Etape de la bonne réponse
    //Affiche le tampon bonne
    $('#true').css('visibility', 'visible');
    //affiche la solution
    $('#solution').css('visibility', 'visible');
    $('#solution').text('Félicitation!!! Tu as trouvé la bonne réponse!');
  },
  next: function () {
    //Lorque l'on clique sur ce bouton, on doit tout cacher et réafficher le bouton Valider
    $('#false').css('visibility', 'hidden');
    $('#true').css('visibility', 'hidden');
    $('#solution').css('visibility', 'hidden');
    //ne pas oublier d'effacer le champs texte afin d'etre libre
    $('#userResult').val('');
    //Réafficher le bouton valider et cacher next
    $('#next').css('display', 'none');
    $('#validation').css('display', 'inline-block');
    app.game();


  },

};

$(app.init);
