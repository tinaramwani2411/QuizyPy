const questions = [
    {
        question: "What is the maximum length of a Python identifier?",
        answers: [
            { text: "32", correct: false },
            { text: "16", correct: false },
            { text: "128", correct: false },
            { text: "No fixed Length is specified.", correct: true },
        ]
    },
    {
        question: "What will be the output of the following code snippet? print(2**3 + (5 + 6)**(1 + 1))",
        answers: [
            { text: "129", correct: true },
            { text: "8", correct: false },
            { text: "121", correct: false },
            { text: "None", correct: false },
        ]
    },
    {
        question: "Which of the following types of loops are not supported in Python?",
        answers: [
            { text: "for", correct: false },
            { text: "while", correct: false },
            { text: "do-while", correct: true },
            { text: "None", correct: false },
        ]
    },
    {
        question: "Which of the following is the proper syntax to check if a particular element is present in a list?",
        answers: [
            { text: "if ele in list", correct: false },
            { text: "if mot ele not in list", correct: false },
            { text: "Both A and B", correct: true },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "Which of the following functions converts date to corresponding time in Python?",
        answers: [
            { text: "strptime()", correct: true },
            { text: "strftime()", correct: false },
            { text: "Both A and B", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "As what datatype are the *args stored, when passed into a function?",
        answers: [
            { text: "List", correct: false },
            { text: "Tuple", correct: true },
            { text: "Dictionary", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "As what datatype are the *kwargs stored, when passed into a function?",
        answers: [
            { text: "Lists", correct: false },
            { text: "Tuples", correct: false },
            { text: "Dictionary", correct: true },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "What keyword is used in Python to raise exceptions?",
        answers: [
            { text: "raise", correct: true },
            { text: "try", correct: false },
            { text: "goto", correct: false },
            { text: "except", correct: false },
        ]
    },
    {
        question: "Which of the following is not a valid set operation in python?",
        answers: [
            { text: "Union", correct: false },
            { text: "Intersection", correct: false },
            { text: "Difference", correct: false },
            { text: "None of Above", correct: true },
        ]
    },
    {
        question: "Which of the following are valid string manipulation functions in Python?",
        answers: [
            { text: "count()", correct: false },
            { text: "upper()", correct: false },
            { text: "strip()", correct: false },
            { text: "All of the above", correct: true },
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
