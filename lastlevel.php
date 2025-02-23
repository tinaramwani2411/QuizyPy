<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuizyPy Next Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <span> <button style="width: 80px; height: 30px;" onclick="window.location.href='index.php'">Home</button> </span>
    <hr>
    <div id="last-level"> 
        <div class="box">
            <h1><marquee>Welcome to QuizyPy</marquee></h1>
            <h3>3rd Level</h3>
            <div class="Quiz">
                <h2 id="question">Question goes here</h2>
                <div id="answer-buttons">
                    <button class="btn">Answer 1</button>
                    <button class="btn">Answer 2</button>
                    <button class="btn">Answer 3</button>
                    <button class="btn">Answer 4</button>
                </div>
                <button id="next-btn" style="display:none;">Next</button>
                <button id="prev-btn" style="display:none;">Previous</button>
                <div id="note">
                    <p><b>Click on total score only after completing this level.</b></p>
                    </div>
                <div class="button">
                    <button style="width: 150px; height: 40px;"onclick="window.location.href='score.php'">Total Score</button>
                </div>
            </div>
        </div>
    </div>
    <script src="scriptlvl3.js"></script>
    <!-- <div class="button">
        <button style="width: 200px; height: 50px;"onclick="window.location.href='score.html'">Total Score</button>
    </div> -->
</body>
</html>
