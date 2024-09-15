const form = document.querySelector('#seminar-registration-form');
const hints = document.querySelectorAll('.text-hint');
const toast = document.querySelector('.toast');

form.addEventListener('submit', function (event) {
	event.preventDefault();
	clearHints();

	const nameInput = getInputValue('#nameInput');
	const emailInput = getInputValue('#emailInput');
	const seminarSelect = getSelectValue('#seminarSelect');

	const isValid = validateForm(nameInput, emailInput, seminarSelect);

	if (isValid) {
		showToast();
		form.reset();
	}
});

function clearHints() {
	hints.forEach(hint => {
		hint.innerText = '';
	});
}

function getInputValue(selector) {
	return document.querySelector(selector).value.trim();
}

function getSelectValue(selector) {
	return document.querySelector(selector).value;
}

function validateForm(name, email, seminar) {
	let isValid = true;

	const nameField = document.getElementById('nameField');
	const emailField = document.getElementById('emailField');
	const seminarField = document.getElementById('seminarField');

	nameField.classList.remove('error');
	emailField.classList.remove('error');
	seminarField.classList.remove('error');

	if (!name) {
		setHint('nameHint', 'Поле должно быть заполнено.');
		nameField.classList.add('error');
		isValid = false;
	}

	if (!email) {
		setHint('emailHint', 'Поле должно быть заполнено.');
		emailField.classList.add('error');
		isValid = false;
	} else if (!isValidEmail(email)) {
		console.log('sad');
		setHint('emailHint', 'Введите корректный email.');
		emailField.classList.add('error');
		isValid = false;
	}

	if (seminar === 'Выбрать') {
		setHint('seminarHint', 'Поле должно быть заполнено.');
		seminarField.classList.add('error');
		isValid = false;
	}

	return isValid;
}

function isValidEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

function setHint(hintId, message) {
	document.getElementById(hintId).innerText = message;
}

function showToast() {
	toast.classList.add('show');

	setTimeout(() => {
		toast.classList.remove('show');
	}, 3000);
}