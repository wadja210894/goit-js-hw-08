import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const email = document.querySelector(".feedback-form input");
const message = document.querySelector(".feedback-form textarea");

form.addEventListener('submit', FormSubmitHandler);
form.addEventListener('input', throttle(TextareaInputHandler, 500));

const STORAGE_KEY = 'feedback-form-state';

const formData = {
    email: email.value,
    message: message.value
};

function FormSubmitHandler(event){
event.preventDefault();
event.currentTarget.reset();
localStorage.removeItem(STORAGE_KEY);
    if (formData.email !== '' && formData.message !== '') {
        console.log(formData);
        formData.email = '';
        formData.message = '';
    } else {
        alert('Будь ласка заповніть поля');
    };
}

function TextareaInputHandler(event) {
    if (event.currentTarget !== '') {
        formData.email = email.value;
        formData.message = message.value;
    };
localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

populateTextarea();

function populateTextarea(){
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(savedData){
        email.value = savedData.email;
        message.value = savedData.message;
    }
}