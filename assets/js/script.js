// These are the DOM elements we'll need to interact with.

const questionsEl = document.querySelector('#questions');
const timerEl = document.querySelector('#timer');
const choicesEl = document.querySelector('#choices');
const submitBtn = document.querySelector('#submit');
const startBtn = document.querySelector('#start');
const intialsEl = document.querySelector('#intials');
const feedbackEl = document.querySelector('#feedback');

// There are the variables we'll need to keep track of for when the quiz is active.
const currentQuestionIndex = 0;
const time = questions.length * 15;
const timeLeft = time;


function startQuiz() {
    // Hide the start screen, then unhide the questions screen.
    let startScreenEl = document.getElementById('#start-screen');
    startScreenEl.setAttribute('class', 'hide');
    questionsEl.removeAttribute('class');

    // Start the timer. Remember that this is in milliseconds!!
    timeLeft = setInterval(decrementTime, 1000);
    timerEl.textContent = timeLeft;
    getQuestion();
}

function getQuestion() {
    // Get the current question from the questions array.
    let currentQuestion = questions[currentQuestionIndex];

    // Update the text of the question screen with the current question.
    let titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.question;

    // Clear out old choices.
    choicesEl.innerHTML = '';

    // Loop through each choice
    for (let i = 0; i < currentQuestion.choices.length; i++) {
        let choiceEl = document.createElement('button');
        choiceEl.textContent = currentQuestion.choices[i];
        choiceEl.setAttribute('class', 'choice');
        choicesEl.appendChild(choiceEl);
    };
}

function questionClick() {
    // Did user guess the correct answer?
    if (this.value !== questions[currentQuestionIndex].answer) {
        // IF not, remove an extra 12 seconds from the timer.
        timeLeft -= 12;

        if (timeLeft < 0) {
            timeLeft = 0;
        }
        // This puts the new time on the timer.
        timerEl.textContent = timeLeft;
        feedbackEl.textContent = 'Incorrect!';
        feedbackEl.style.color = 'red';
        feedbackEl.style.fontSize = '300%';
    } else {
        feedbackEl.textContent = 'Correct!';
        feedbackEl.style.color = 'green';
        feedbackEl.style.fontSize = '300%';
    }

    // This will give the answer feedback to the user.
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);

    // Goes to the next question.
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // Stop the timer.
    clearInterval(timeLeft);

    // Show the end screen.
    let endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    // Show the final score.
    let finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = 'Your final score is:' + timeLeft;

    // Hide the questions screen.
    questionsEl.setAttribute('class', 'hide');

}