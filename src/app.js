import './styles.css';
import {createModal, isValid} from "./utils";
import {Question} from "./question";
import {authWithEmailAndPassword, getAuthForm} from "./auth";

const modalBtn = document.getElementById('modalBtn');
const form = document.getElementById('form');
const input = form.querySelector('#questionInput');
const button = form.querySelector('#submitBtn');

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', (event) => {
    button.disabled = !isValid(event.target.value)
})
modalBtn.addEventListener('click', openModal);

function submitFormHandler(event) {
    event.preventDefault();

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        }
        button.disabled = true;
        Question.create(question).then(() => {
            input.value = '';
            input.className = '';
            button.disabled = false;
        })
    }
}

function openModal() {
    createModal('Auth', getAuthForm());
    document.getElementById('authForm').addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;
    authWithEmailAndPassword(email, password)
        .then(token => {
           return Question.fetch(token)
        })
        .then(renderModalAfterAuth)
}

function renderModalAfterAuth(content) {
    console.log('content', content)
}
