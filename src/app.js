import './styles.css';
import {isValid} from "./utils";
import {Question} from "./question";

const form = document.getElementById('form');
const input = form.querySelector('#questionInput');
const button = form.querySelector('#submitBtn');

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', (event) => {
    button.disabled = !isValid(event.target.value)
})

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
