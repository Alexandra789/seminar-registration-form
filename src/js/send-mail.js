const form = document.querySelector('#seminar-registration-form');
const alert = document.querySelector('.alert');
const alertMessage = document.querySelector('#alert-message');

emailjs.init({
	publicKey: "_claB5_Eswk1M1r7Q",
});

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
	event.preventDefault();
	clearHints();

	const nameInput = getInputValue('#nameInput');
	const emailInput = getInputValue('#emailInput');
	const seminarSelect = getSelectValue('#seminarSelect');

	if (validateForm(nameInput, emailInput, seminarSelect)) {
		submitForm(seminarSelect, nameInput, emailInput);
	}
}

function submitForm(seminarTitle, nameInput, emailInput) {
	showSpinner();
	emailjs.send("service_fw6jo1f", "template_tkuyvnr",
		{
			to_name: nameInput,
			to_seminar: seminarTitle,
			to_email: emailInput,
		})
		.then(() => {
			showAlert(true);
			hideSpinner();
			form.reset();
		})
		.catch(error => {
			console.error('Ошибка:', error);
			hideSpinner();
			showAlert(false);
		});
}

function showSpinner() {
	document.getElementById('spinner').classList.remove('d-none');
	document.querySelector('.card').classList.add('blur-background');
}

function hideSpinner() {
	document.getElementById('spinner').classList.add('d-none');
	document.querySelector('.card').classList.remove('blur-background');
}

function showAlert(sending) {
	let message = sending ?
		`Ваша заявка успешно отправлена и находится в обработке.
	Ожидайте email с подтверждением бронирования.` : `Не удалось отправить заявку.`;
	let className = sending ? 'alert-success' : 'alert-danger';
	alert.classList.add('show');
	alert.classList.add(className);
	alertMessage.innerText = message;
	setTimeout(() => {
		alert.classList.remove('show');
	}, 3000);
}

import {validateForm, clearHints, getInputValue, getSelectValue} from './validation.js';