function generatePassword(){
	var length = 10,
	charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$";
	if(window.crypto && window.crypto.getRandomValues) {
		return Array(length)
			.fill(charset)
			.map(item => item[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * (item.length + 1))])
			.join('');    
	} else {
		rezult = '';
		for (var i = 0, n = charset.length; i < length; ++i) {
			rezult += charset.charAt(Math.floor(Math.random() * n));
		}
		return rezult;
	}
}

function pasteGenerationInPasswords(modal) {
	inputPassword=modal.querySelector('.input__field--regustration');
	inputPassword.value=generatePassword();
	if (inputPassword.value == "") {
		inputPassword.nextElementSibling.classList.remove("input__placeholder--hide");
	  } else {
		inputPassword.nextElementSibling.classList.add("input__placeholder--hide");
	}

}

const modal = document.querySelector('[data-name="regustration"]');
const modalGeneratePassword=document.querySelector('.input__generation');
modalGeneratePassword.addEventListener("click", ()=>pasteGenerationInPasswords(modal))