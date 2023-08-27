// These are the DOM elements we'll need to interact with.

const questionsEl = document.querySelector('#questions');
const timerEl = document.querySelector('#time');
const choicesEl = document.querySelector('#choices');
const submitBtn = document.querySelector('#submit');
const startBtn = document.querySelector('#start');
const intialsEl = document.querySelector('#intials');
const feedbackEl = document.querySelector('#feedback');

// There are the variables we'll need to keep track of for when the quiz is active.
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


function startQuiz() {
    // Hide the start screen, then unhide the questions screen.
    let startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");

    // Start the timer. Remember that this is in milliseconds!!
    timerId = setInterval(ClockTimer, 1000);
    timerEl.textContent = time;
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
    clearInterval(timerId);

    // Show the end screen.
    let endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    // Show the final score.
    let finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = 'Your final score is:' + timeLeft;

    // Hide the questions screen.
    questionsEl.setAttribute('class', 'hide');

}

function ClockTimer() {
    // Update the timer.
    timeLeft--;
    timerEl.textContent = timeLeft;

    // Is the user out of time? This will check that.
    if (timeLeft <= 0) {
        quizEnd();
    }
}

function saveHighScore() {
    // Get the initials from the user.
    let initials = intialsEl.value.trim();

    // Get the high scores from local storage, if they don't exist, create an empty array.
    if (initials === '') {
        let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

        // If they do exist, add the user's initials to the high scores array.
        let newScore = {
            score: timeLeft,
            initials: initials
        };

        // Save the initials to local storage. Then redirect to the highscores.html page.

        highScores.push(newScore);
        window.localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.href = 'highscores.html';
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScore();
    }
}

submitBtn.onclick = saveHighScore;

startBtn.onclick = startQuiz;

// intialsEl.onkeyup = checkForEnter;