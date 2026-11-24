
// Quiz Questions
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["Java", "CSS", "Python", "C++"],
        answer: 1
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["int", "string", "let", "float"],
        answer: 2
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        options: ["<p>", "<a>", "<h1>", "<img>"],
        answer: 1
    },
    {
        question: "Which symbol is used for comments in CSS?",
        options: ["//", "<!-- -->", "/* */", "#"],
        answer: 2
    },
    {
        question: "Which method displays a message in the console?",
        options: [
            "console.log()",
            "print()",
            "display()",
            "show()"
        ],
        answer: 0
    },
    {
        question: "Which HTML tag is used to add an image?",
        options: ["<image>", "<pic>", "<img>", "<src>"],
        answer: 2
    },
    {
        question: "Which operator checks strict equality in JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: 2
    },
    {
        question: "Which CSS property changes text color?",
        options: ["background", "font-size", "color", "text-style"],
        answer: 2
    },
    {
        question: "Which keyword is used to define a function?",
        options: ["function", "method", "define", "create"],
        answer: 0
    }
];

// Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let selected = false;

// HTML Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");

const timer = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

// Start Quiz
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        timer.innerText = "Time: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResult();
        }
    }, 1000);
}

// Display Question
function showQuestion() {
    selected = false;
    nextBtn.disabled = true;

    const q = questions[currentQuestion];

    questionNumber.innerText =
        "Question " + (currentQuestion + 1) + "/" + questions.length;

    questionText.innerText = q.question;

    progressBar.style.width =
        (currentQuestion / questions.length) * 100 + "%";

    optionsContainer.innerHTML = "";

    q.options.forEach(function(option, index) {

        const button = document.createElement("button");

        button.innerText = option;
        button.classList.add("option");

        button.addEventListener("click", function() {
            selectAnswer(index, button);
        });

        optionsContainer.appendChild(button);
    });
}

// Check Selected Answer
function selectAnswer(index, button) {
    if (selected) return;

    selected = true;

    const correctAnswer = questions[currentQuestion].answer;

    if (index === correctAnswer) {
        score++;
    }

    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(function(option, i) {
        option.disabled = true;

        if (i === correctAnswer) {
            option.style.background = "#d4edda";
            option.style.borderColor = "#28a745";
        } else if (i === index) {
            option.style.background = "#f8d7da";
            option.style.borderColor = "#dc3545";
        }
    });

    nextBtn.disabled = false;
}

// Next Question
nextBtn.addEventListener("click", function() {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }

});

// Show Final Result
function showResult() {
    clearInterval(timerInterval);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    progressBar.style.width = "100%";

    document.getElementById("score").innerText =
        score + "/" + questions.length;

    let percentage = (score / questions.length) * 100;

    let message = "";

    if (percentage >= 80) {
        message = "Excellent! Great job!";
    } else if (percentage >= 50) {
        message = "Good effort! Keep practicing.";
    } else {
        message = "Keep learning and try again!";
    }

    document.getElementById("message").innerText =
        message + " Your percentage: " + percentage + "%";
}

// Restart Quiz
restartBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});
