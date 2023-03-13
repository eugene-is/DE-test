const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");
let unlock = true;
const timeout = 800;
if(popupLinks.length > 0){
	for(let index = 0; index < popupLinks.length; index++){
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0){
	for(let index = 0; index < popupCloseIcon.length; index++){
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e){
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}
function popupOpen(curentPopup){
	if(curentPopup && unlock){
		const popupActive = document.querySelector('.popup.open');
		if(popupActive){
			popupClose(popupActive, false);
		}
		else{
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')){
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive, doUnlock = true){
	if(unlock){
		popupActive.classList.remove('open');
		if(doUnlock){
			bodyUnLock();
		}
	}
}
function bodyLock(){
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if(lockPadding.length > 0) {
		for(let index = 0; index < lockPadding.length; index++){
			const el = lockPadding[index];
			el.getElementsByClassName.paddingRight = lockPaddingValue;
		}
	}
	body.classList.add('lock');

	unlock = false;
	setTimeout(function(){
		unlock = true;
	}, timeout);
}
function bodyUnLock(){
	setTimeout(function(){
		if(lockPadding.length > 0){
			for(let index = 0; index < lockPadding.length; index++){
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function(){
		unlock = true;
	}, timeout);
}
document.addEventListener('keydown', function (e){
	if (e.which === 27){
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});







document.addEventListener('DOMContentLoaded', function(){
	const form = document.getElementById('form');
	const successfully = document.getElementById('popupSuccess');
	const getMessage = document.getElementById('popupMessage');
	form.addEventListener('submit', formSend);

	async function formSend(e){
		e.preventDefault();

		let error = formValidate(form);

		if(error == 0){
			popupOpen(successfully);
			getMessage.classList.remove('open')
			form.reset();
		}
	}

	function formValidate(form){
		let error = 0;
		let formRequared = document.querySelectorAll('.requared')

		for(let index = 0; index < formRequared.length; index++){
			const input = formRequared[index];
			formRemoveError(input);


			if(input.classList.contains('email')){
				if(emailTest(input)){
					formAddError(input);
					error++;
				}
			}
			else{
				if(input.value == ''){
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input){
		input.classList.add('error');
	}
	function formRemoveError(input){
		input.classList.remove('error');
	}

	function emailTest(input){
		return !/^\w+([\.-]?\w)*@\w([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
})