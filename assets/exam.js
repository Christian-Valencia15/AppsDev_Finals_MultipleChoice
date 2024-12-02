const questions = [
    '1. Which of the following is a JavaScript package manager?||npm🔑|pip|composer|gem||0',
    '2. Which tool can you use to ensure code quality?||ESLint|JSLint|JSHint|All of the above🔑||3',
    '3. What is the output of `console.log(typeof null)`?||object🔑|undefined|null|number||0',
    '4. Which company developed JavaScript?||Netscape🔑|Microsoft|Google|Apple||0',
    '5. Which of the following is not a JavaScript data type?||String|Number|Boolean|Float🔑||3',
    '6. Which of the following is used to declare a constant in JavaScript?||const🔑|var|let|constant||0',
    '7. Which method is used to add an element at the end of an array?||push()🔑|pop()|shift()|unshift()||0',
    '8. Which method is used to remove the last element from an array?||pop()🔑|push()|shift()|unshift()||0',
    '9. Which method is used to convert a JSON string into a JavaScript object?||JSON.parse()🔑|JSON.stringify()|JSON.object()|JSON.convert()||0',
    '10. Which method is used to convert a JavaScript object into a JSON string?||JSON.stringify()🔑|JSON.parse()|JSON.object()|JSON.convert()||0',
    '11. Which of the following is a JavaScript framework?||React🔑|Laravel|Django|Flask||0',
    '12. Which of the following is used to define a variable in JavaScript?||var|let|const|All of the above🔑||3',
    '13. Which of the following is not a looping structure in JavaScript?||for|while|foreach|loop🔑||3',
    '14. Which keyword is used to define a function in JavaScript?||function🔑|def|func|define||0', 
    '15. Which of the following is not a reserved word in JavaScript?||interface|throws|program🔑|short||2',
    '16. Which method is used to remove the first element from an array?||shift()🔑|pop()|push()|unshift()||0',
    '17. Which method is used to add an element at the beginning of an array?||unshift()🔑|push()|pop()|shift()||0',
    '18. Which of the following is not a JavaScript framework?||Angular|Vue|React|Ruby on Rails🔑||3',
    '19. Which of the following is used to handle exceptions in JavaScript?||try...catch🔑|throw...catch|try...throw|catch...throw||0',
    '20. Which of the following is not a valid JavaScript variable name?||2names🔑|_first_and_last_names|FirstAndLast|None of the above||0'
];

let currentQuestions = [];
let timer;
let timeTotal = 0;
let correctAnswersCount = 0;
let totalQuestions = questions.length;

const originalQuestions = [...questions];

document.getElementById('start-button').addEventListener('click', startExam);
document.getElementById('check-answer-button').addEventListener('click', checkAnswer);
document.getElementById('next-button').addEventListener('click', nextQuestion);

function startExam() {
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('exam-page').style.display = 'block';
    updateCorrectAnswersMessage();
    questions.length = 0;
    questions.push(...originalQuestions);
    startTimer();
    displayQuestions();
}

function startTimer() {
    timer = setInterval(() => {
        timeTotal++;
        const hours = Math.floor(timeTotal / 3600);
        const minutes = Math.floor((timeTotal % 3600) / 60);
        const seconds = timeTotal % 60;
        let timeString = `Time: `;
        if (hours > 0) {
            timeString += `${hours}h `;
        }
        if (minutes > 0 || hours > 0) {
            timeString += `${minutes}m `;
        }
        timeString += `${seconds}s`;
        document.getElementById('timer').innerText = timeString;
    }, 1000);
}

function displayQuestions() {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';
    currentQuestions = getRandomQuestions(2);
    currentQuestions.forEach((q, index) => {
        const [question, options, correctAnswer] = q.split('||');
        const optionsArray = options.split('|');
        questionsContainer.innerHTML += `
            <div class="question">
                <p>${question}</p>
                <hr>
                ${optionsArray.map((option, i) => `<label><input type="radio" name="question${index}" value="${i}" onchange="checkAllAnswered()"> ${option}</label><br>`).join('')}
            </div>
        `;
    });
    document.getElementById('check-answer-button').disabled = true;
    document.getElementById('next-button').disabled = true;
}

function checkAllAnswered() {
    const allAnswered = currentQuestions.every((q, index) => {
        return document.querySelector(`input[name="question${index}"]:checked`);
    });
    document.getElementById('check-answer-button').disabled = !allAnswered;
}

function getRandomQuestions(num) {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
}

function checkAnswer() {
    let allCorrect = true;
    currentQuestions.forEach((q, index) => {
        const [question, options, correctAnswer] = q.split('||');
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const questionDiv = document.querySelectorAll('.question')[index];
        let message = '';
        if (selectedOption && selectedOption.value === correctAnswer) {
            questions.splice(questions.indexOf(q), 1);
            message = ' ✅ Correct!';
            correctAnswersCount++;
        } else {
            allCorrect = false;
            message = ' ❌ Incorrect!';
        }
        questionDiv.innerHTML += `<span class="answer-message">${message}</span>`;
        const radioButtons = document.querySelectorAll(`input[name="question${index}"]`);
        radioButtons.forEach(radio => radio.disabled = true);
    });
    updateCorrectAnswersMessage();
    document.getElementById('check-answer-button').disabled = true;
    document.getElementById('next-button').disabled = false;
    if (questions.length === 0) {
        clearInterval(timer);
        document.getElementById('exam-page').style.display = 'none';
        document.getElementById('result-page').style.display = 'block';
        const hours = Math.floor(timeTotal / 3600);
        const minutes = Math.floor((timeTotal % 3600) / 60);
        const seconds = timeTotal % 60;
        let timeString = ` `;
        if (hours > 0) {
            timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
        }
        if (minutes > 0 || hours > 0) {
            timeString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
        }
        timeString += `${seconds} seconds`;
        document.getElementById('total-time').innerText = timeString;
    }
}

function updateCorrectAnswersMessage() {
    document.getElementById('correct-answers-message').innerText = `${correctAnswersCount} correct out of ${totalQuestions}`;
}

function nextQuestion() {
    document.getElementById('next-button').disabled = true;
    displayQuestions();
}