const questions = [
    {
        question: "Which of the following statements about decorators in Python is true?",
        answers: [
            { text: "Decorators modify the behavior of a function ", correct: true },
            { text: "Decorators are used to create classes  ", correct: false },
            { text: "Decorators are not supported in Python ", correct: false },
            { text: "Decorators cannot take arguments", correct: false },
        ]
    },
    {
        question: "What will be the output of the following code? python a = {1, 2, 3} b = {3, 4, 5} print(a & b)",
        answers: [
            { text: "{1, 2, 3, 4, 5}", correct: false },
            { text: "{3}", correct: true },
            { text: "{1, 2}  ", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "What does the __init__ method do in a class?",
        answers: [
            { text: "Initializes a class variable", correct: false },
            { text: "Initializes an object ", correct: true },
            { text: "Is used to delete an object  ", correct: false },
            { text: " Is used to create an instance method  ", correct: false },
        ]
    },
    {
        question: "15. Which of the following is a correct way to inherit a class in Python? python class Base: pass",
        answers: [
            { text: "class Derived()", correct: false },
            { text: "class Derived(Base):", correct: true },
            { text: "class Derived(Base)", correct: false },
            { text: "class Derived: Base", correct: false },
        ]
    },
    {
        question: "Which of the following methods is used to read a single line from a file?",
        answers: [
            { text: "readline()", correct: true },
            { text: "readlines()", correct: false },
            { text: "_read()", correct: false },
            { text: "readall()", correct: false },
        ]
    },
    {
        question: "Which of the following is true about Python's with statement?",
        answers: [
            { text: "It's used for handling exceptions", correct: false },
            { text: "It simplifies exception handling and cleanup", correct: true },
            { text: "It is used to create classes", correct: false },
            { text: "It is a loop statement ", correct: false },
        ]
    },
    {
        question: "Which of the following is a way to handle multiple exceptions in Python?",
        answers: [
            { text: "except(Exception1, Exception2)", correct: false },
            { text: "except Exception1, Exception2:", correct: false },
            { text: "except (Exception1, Exception2):", correct: true },
            { text: "except [Exception1, Exception2]:", correct: false },
        ]
    },
    {
        question: "What does the @staticmethod decorator do?",
        answers: [
            { text: "Makes a method static", correct: true },
            { text: "Makes a method class-level", correct: false },
            { text: "Makes a method a constructor3", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "What is the order of precedence in python?",
        answers: [
            { text: "Exponential, Parentheses, Multiplication, Division, Addition, Subtraction", correct: false },
            { text: "Exponential, Parentheses, Division, Multiplication, Addition, Subtraction", correct: false },
            { text: "Parentheses, Exponential, Multiplication, Division, Subtraction, Addition", correct: false },
            { text: "Parentheses, Exponential, Multiplication, Division, Addition, Subtraction", correct: true },
        ]
    },
    {
        question: "To add a new element to a list we use which Python command?",
        answers: [
            { text: " list1.addEnd(5)", correct: false },
            { text: "list1.addLast(5)", correct: false },
            { text: "list1.append(5)", correct: true },
            { text: "list1.add(5)", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");  // Get the previous button

let currentQuestionIndex = 0;
let score = 0;
let level1Score = 0;
let level2Score = 0;
let level3Score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    level1Score = 0;
    level2Score = 0;
    level3Score = 0;
    nextButton.innerHTML = "Next";
    prevButton.style.display = "none";  // Hide previous button initially
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });

    // Show or hide the "Previous" button
    prevButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
}

function resetState() {
    nextButton.style.display = "none";
    prevButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    nextButton.style.display = "block";
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    updateLevelScores();
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

// Add event listener for the "Previous" button
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;  // Go back to the previous question
        showQuestion();
    }
});

function updateLevelScores() {
    if (currentQuestionIndex <= 3) {
        level1Score = score;
    } else if (currentQuestionIndex <= 6) {
        level2Score = score - level1Score;
    } else if (currentQuestionIndex <= 10) {
        level3Score = score - level1Score - level2Score;
    }
}

function showScore() {
    resetState();

    // Calculate total score
    const totalScore = level1Score + level2Score + level3Score;

    // Display the final message based on the total score
    let resultMessage;
    if (totalScore >= 8) { // Adjust as per your level of difficulty
        resultMessage = "Excellent performance! You've mastered all levels.";
    } else if (totalScore >= 6) {
        resultMessage = "Good job! You did well in most levels.";
    } else if (totalScore >= 4) {
        resultMessage = "Not bad! You have some room for improvement.";
    } else {
        resultMessage = "Needs improvement. Keep practicing!";
    }

    sessionStorage.setItem('level1', totalScore);
    questionElement.innerHTML = `Quiz finished! Your score is ${totalScore} out of ${questions.length}.`;

    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

function ShowFinalscore() {
    const level1 = sessionStorage.getItem('level1');
    const level2 = sessionStorage.getItem('level2');
    const level3 = sessionStorage.getItem('level3');
    const total = Number(level1) + Number(level2) + Number(level3);
    console.log(total);

    // Display the final message based on the total score
    let resultMessage;
    if (total >= 8) { // Adjust as per your level of difficulty
        resultMessage = "Excellent performance! You've mastered all levels.";
    } else if (total >= 6) {
        resultMessage = "Good job! You did well in most levels.";
    } else if (total >= 4) {
        resultMessage = "Not bad! You have some room for improvement.";
    } else {
        resultMessage = "Needs improvement. Keep practicing!";
    }

    // Display the score and result message
    document.getElementById('score-level1').innerHTML = `Level 1 Score: ${level1}`;
    document.getElementById('score-level2').innerHTML = `Level 2 Score: ${level2}`;
    document.getElementById('score-level3').innerHTML = `Level 3 Score: ${level3}`;
    document.getElementById('total-score').innerHTML = `Total Score: ${total}`;
    document.getElementById('result-message').innerHTML = resultMessage;
}

startQuiz();
