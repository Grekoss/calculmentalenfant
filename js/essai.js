var app = {
	clique : false,
	init : function () {
		console.log('Teste de sécurité de lien');
		app.test();
	},
	test : function () {

		do {
			console.log('On est dans le while')
			$('#test').on('click', app.addclique);
		}
		while (app.clique === false) 
		console.log('C\'est fini');
	},
	addclique : function () {
		app.clique = true;
		console.log('Je viens de cliquer sur le bouton');
	},
}

$(app.init);