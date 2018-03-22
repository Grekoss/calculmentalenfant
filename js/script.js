var app = {
  //Seconds est le temps défini
  seconds : 20,
  //Variable qui va enregistrer les données de chaque parties
  games : [],

  init : function() {
    // Test pour l'appel d'Init
    // console.log('Appel de INIT');

    // Action lorsque l'on clique sur "COMMENCER"
    $('#start').on('click', app.game);

    // $('#stop').on('click', app.stopTimer);
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
    app.random(0,10);
    //Mise en place dans le html des nombre aléatoire
    $('#firstNumber').text(app.random1);
    $('#secondNumber').text(app.random2);
    //Cacher le bouton COMMENCER et afficher le STOP
    $('#start').css('display', 'none');
    $('#stop').css('display', 'inline-block');
    //Lancer le Timer
    app.updateTimer();
    //Action sur le bouton STOP
    $('#validation').on('click', app.verifResult);
  },
  verifResult : function () {
    var userResult = $('#userResult').val();
    if (Number(userResult) === app.result) {
      console.log('Good');
    } else {
      console.log('Bad');
    }
    //On arrete le Timer
    app.stopTimer();
  },
  updateTimer : function() {
    //Toute les secondes, on décrémente le timer et si on arrive à 0, on stop!
    // On décrémente le Timer
    app.seconds--;
    //On affiche le timer
    $('#cpt').text(app.seconds + ' s');
    //Est ce qu'on a fini?
    if(app.seconds <= 0) {
      $('#solution').css('visibility', 'visible');
      $('#solution').text('Délai dépassé! La bonne réponse était : ' + app.random1 + ' + ' + app.random2 + ' = ' + app.result);
      console.log('On arrete');
      app.falseReponse();
      // La c'est un exemple faut reprendre dans l'algo du logiciel!
    } else {
      app.myTimer = setTimeout(app.updateTimer, 1000);
    }
  },
  stopTimer : function() {
    //Test pour savoir si mon clique fonctionne histoire d'enlever un doute
    // console.log('Je viens de cliquer sur le bouton STOP');
    //Arreter le Timer
    clearTimeout(app.myTimer);
  },
  falseReponse : function() {
    //Etape de la fause réreponse
    $('#false').css('visibility', 'visible');
  },
};

$(app.init);
