var form = document.querySelector('form');
var message = document.getElementById('resultat');

form.addEventListener('submit', function(evt) {
	var data = new FormData(form);
	var output = "";
	for (const entry of data) {
		output = entry[1];
	};
	message.innerText = output;
	evt.preventDefault();
}, false);



$('#accept-modif-img').click(function(){
		var simg = $('input:radio:checked').val();
		$('#recup_img_gal').val(simg) ;