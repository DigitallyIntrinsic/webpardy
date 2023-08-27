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


