const popupItem = document.querySelectorAll('.popup__item');
    
popupItem.forEach(item => {
	const inputLabel = item.querySelector('.popup__item-label');      
	const inputField = item.querySelector('.popup__item-input');
	inputField.addEventListener('input', function () {
	if (inputField.value.length > 0) {
		inputLabel.style.opacity = '1';
	} else {
		inputLabel.style.opacity = '0';
	}
});

inputField.addEventListener('focus', function () {
	if (inputField.value.length === 1) {
		inputLabel.style.opacity = '1';
	}
});
});

let popupForm = document.querySelectorAll('.popup');
popupForm.forEach(item => {
	let submitButton = item.querySelector('.submit');
	if (submitButton) {
		let inputField = item.querySelectorAll('input');
		submitButton.addEventListener('click', function () {
			inputField.forEach(input => {
				let error = input.nextElementSibling;
				if (input.value.length < 1) {
					error.classList.add('show');      
				} else {
					error.classList.remove('show');
				}
			});
		});
	}
});
