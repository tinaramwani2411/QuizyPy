const questions = [
    // Level 1 questions (1-3)
    {
        question: "What is the output of the following code? python print(type(3.14))",
        answers: [
            { text: "<class 'int'>", correct: false },
            { text: "<class 'float'>", correct: true },
            { text: "<class 'complex'>", correct: false },
            { text: "<class 'str'>", correct: false },
        ]
    },
    {
        question: "Which of the following is a mutable data type?",
        answers: [
            { text: "Tuple", correct: false },
            { text: "String", correct: false },
            { text: "List", correct: true },
            { text: "Integer", correct: false },
        ]
    },
    {
        question: "What does the len() function do?",
        answers: [
            { text: "Returns the number of elements in a list", correct: false },
            { text: "Returns the number of characters in a string", correct: false },
            { text: "Returns the number of items in a tuple", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    // Level 2 questions (4-6)
    {
        question: "How do you start a comment in Python?",
        answers: [
            { text: "/* comment */", correct: false },
            { text: "<!-- comment -->", correct: false },
            { text: "# comment", correct: true },
            { text: "// comment", correct: false },
        ]
    },
    {
        question: "Which of the following is a correct variable assignment in Python?",
        answers: [
            { text: "1var = 10", correct: false },
            { text: "var@ = 10", correct: false },
            { text: "_var = 10", correct: true },
            { text: "var-1 = 10", correct: false },
        ]
    },
    {
        question: "What is the output of the following code? python my_list = [1, 2, 3, 4] print(my_list[-1])",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: false },
            { text: "3", correct: false },
            { text: "4", correct: true },
        ]
    },
    // Level 3 questions (7-10)
    {
        question: "Which keyword is used to define a function in Python?",
        answers: [
            { text: "func", correct: false },
            { text: "def", correct: true },
            { text: "function", correct: false },
            { text: "define", correct: false },
        ]
    },
    {
        question: "What is the output of the following code? python def add(a, b): return a + b print(add(2, 3))",
        answers: [
            { text: "5", correct: true },
            { text: "6", correct: false },
            { text: "23", correct: false },
            { text: "None", correct: false },
        ]
    },
    {
        question: "Which of the following methods can be used to add an element to the end of a list?",
        answers: [
            { text: "append()", correct: true },
            { text: "add()", correct: false },
            { text: "insert()", correct: false },
            { text: "extend()", correct: false },
        ]
    },
    {
        question: "What is the output of the following code? python x = [1, 2, 3] x.extend([4, 5]) print(x)",
        answers: [
            { text: "[1, 2, 3, 4, 5]", correct: true },
            { text: "[1, 2, 3, [4, 5]]", correct: false },
            { text: "[4, 5, 1, 2, 3]", correct: false },
            { text: "[1, 2, 3, 4, [5]]", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn"); // Get the previous button

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
    prevButton.style.display = "none"; // Hide previous button initially
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
        currentQuestionIndex--; // Go back to the previous question
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

    // Store each level's score in sessionStorage
    sessionStorage.setItem('level1', level1Score);
    sessionStorage.setItem('level2', level2Score);
    sessionStorage.setItem('level3', level3Score);

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