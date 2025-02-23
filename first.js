const level1Score = 0;
const level2Score = 0;
const level3Score = 0;

// Calculate total score
const totalScore = level1Score + level2Score + level3Score;

// Determine the message based on total score
let resultMessage;
if (totalScore >= 27+1) {
    resultMessage = "Excellent performance! You've mastered all levels.";
} else if (totalScore >= 22+1) {
    resultMessage = "Good job! You did well in most levels.";
} else if (totalScore >= 18+1) {
    resultMessage = "Not bad! You have some room for improvement.";
} else {
    resultMessage = "Needs improvement. Keep practicing!";
}

// Update the score elements
document.getElementById('score-level1').textContent = `Score: ${level1Score}`;
document.getElementById('score-level2').textContent = `Score: ${level2Score}`;
document.getElementById('score-level3').textContent = `Score: ${level3Score}`;
document.getElementById('total-score').textContent = `Score: ${totalScore}`;
document.getElementById('result-message').textContent = resultMessage;