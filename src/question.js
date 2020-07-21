export class Question {
    static create(question) {
        return fetch('https://questions-app-1ce3d.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name;
                return question;
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static renderList() {
        const questions = getQuestionsFromLS();
        const html = questions.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-black-54 mui--text-body2">Вопросов пока нет</div>`;
        document.getElementById('list').innerHTML = html;
    }
}

function addToLocalStorage(question) {
    const questionsArray = getQuestionsFromLS();
    questionsArray.push(question)
    localStorage.setItem('questions', JSON.stringify(questionsArray));
}

function getQuestionsFromLS() {
    return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard (question) {
    return `
     <br>
     <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}   
     </div>
     <div>${question.text}</div>
    `;
}
