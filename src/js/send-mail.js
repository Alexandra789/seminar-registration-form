const form = document.querySelector('#seminar-registration-form');
const toast = document.querySelector('.toast');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
	event.preventDefault();
	clearHints();

	const nameInput = getInputValue('#nameInput');
	const emailInput = getInputValue('#emailInput');
	const seminarSelect = getSelectValue('#seminarSelect');

	if (validateForm(nameInput, emailInput, seminarSelect)) {
		submitForm(seminarSelect, nameInput);
	}
}

function submitForm(seminarTitle, nameInput) {
	showSpinner();
	const formData = createFormData(seminarTitle, nameInput);
	const apiKey = '16de15e2-f9ba-4970-a708-e01672e01a0c';

	fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': apiKey,
		},
		body: JSON.stringify(formData)
	})
		.then(handleResponse)
		.then(() => {
			showToast();
			hideSpinner();
			form.reset();
		})
		.catch((error) => {
			console.error('Ошибка:', error);
			hideSpinner();
		});
}

function createFormData(seminarTitle, nameInput) {
	return {
		subject: "Запись на семинар",
		message: `Уважаемый/ая ${nameInput}, Ваша заявка на семинар "${seminarTitle}" успешно одобрена.`,
		apikey: '16de15e2-f9ba-4970-a708-e01672e01a0c',
	};
}

function handleResponse(response) {
	if (!response.ok) {
		return response.json().then(err => {
			throw new Error(err.message || 'Ошибка при отправке формы');
		});
	}
	return response.json();
}

function showSpinner() {
	document.getElementById('spinner').classList.remove('d-none');
	document.querySelector('.card').classList.add('blur-background');
}

function hideSpinner() {
	document.getElementById('spinner').classList.add('d-none');
	document.querySelector('.card').classList.remove('blur-background');
}

function showToast() {
	toast.classList.add('show');

	setTimeout(() => {
		toast.classList.remove('show');
	}, 3000);
}

import {validateForm, clearHints, getInputValue, getSelectValue} from './validation.js';