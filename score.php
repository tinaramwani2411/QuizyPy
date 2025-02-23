<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Final Scores</title>
    <link rel="stylesheet" href="style.css">
   
</head>
 <body class="score" onload="ShowFinalscore()">
     <div id="container">
        <h1> Final Scores</h1>
        <div id="scores">
            <div id="level">
                <h2>Level 1</h2>
                <p id="score-level1" style="color:white">Score: 0</p>
            </div>
            <div id="level">
                <h2>Level 2</h2>
                <p id="score-level2" style="color:white">Score: 0</p>
            </div>
            <div id="level">
                <h2>Level 3</h2>
                <p id="score-level3" style="color:white">Score: 0</p>
            </div>
        </div>
        <div id="total">
            <h2>Total Score</h2>
            <p id="total-score">Score: 0</p>
        </div>
        <div id="message">
            <h2>Result</h2>
            <p id="result-message">Your performance message will appear here.</p>
        </div>
     </div>
     <script src="script.js"></script>
    <!-- <script src="script.js"></script> -->
</body>
</html>
