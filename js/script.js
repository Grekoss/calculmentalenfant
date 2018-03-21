var app = {
  init : function() {
    // Test pour l'appel d'Init
    // console.log('Appel de INIT');

    // Action lorsque l'on clique sur "COMMENCER"
    $('#start').on('click', app.start);
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
  start : function () {
    //Appel pour la création des nombres aléatoires
    app.random(0,10);
    //Mise en place dans le html des nombre aléatoire
    $('#firstNumber').text(app.random1);
    $('#secondNumber').text(app.random2);
    //Cacher le bouton COMMENCER et afficher le STOP
    $('#start').css('display', 'none');
    $('#stop').css('display', 'inline-block');
    //Lancer le Timer
    //Action sur le bouton STOP
  }
};

$(app.init);
