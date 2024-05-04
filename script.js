const form = document.querySelector('.feedback__form'); // found form with querySelector

const formValidation = {
    formSelector: '.feedback__form',
    inputSelector: '.feedback__form__input',
    submitButtonSelector: '.feedback__form__submit',
    inactiveButtonClass: 'feedback__form__submit_disabled',
    inputErrorClass: 'feedback__form__input_invalid',
    errorClass: 'feedback__form__input-error_active'
}

function enableValidation(obj) { // Validation function
    document.querySelectorAll(obj.inputSelector).forEach((input) => { // search using querySelector for each input field of a form 
        input.addEventListener('input', () => { // add eventListener for input fields
            const errMsg = input.nextElementSibling // error message under input field 
            if (input.validity.patternMismatch) { // validation pattern match
                errMsg.textContent = input.title
                input.classList.remove(formValidation.inputErrorClass);
                input.nextElementSibling.classList.remove(formValidation.errorClass);
            } else if (input.validity.valueMissing) { // validation if empty field
                errMsg.textContent = 'This field is required ';
                input.classList.add(formValidation.inputErrorClass);
                input.nextElementSibling.classList.add(formValidation.errorClass);
            } else if (input.validity.tooLong || input.validity.tooShort) { // check the length of input
                errMsg.textContent = `Should be from${input.minLength} to ${input.maxLength} symbols`;
                input.classList.add(formValidation.inputErrorClass);
                input.nextElementSibling.classList.add(formValidation.errorClass);
            } else { // if everything is good 
                errMsg.textContent = '';
                input.classList.remove(formValidation.inputErrorClass);
                input.nextElementSibling.classList.remove(formValidation.errorClass);
            }
            // turn on/turn off botton "Submit"
            document.querySelector(obj.submitButtonSelector).disabled = !form.checkValidity();
        })
    })
}