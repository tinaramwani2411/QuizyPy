<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login page</title>
    <link rel="stylesheet"href="style.css">
</head>
<body class="loginbody">
    <span> <button style="width: 80px; height: 30px;"onclick="window.location.href='index.php'">Home</button> </span>
    <hr>
    <form method="post">
        <h1 id="loginheading">Login</h1>
        <div class="textboxdiv">
            <input type="text" placeholder="Name" name="nm" size="50px">
            <hr>
            <input type="text" placeholder="Email" name="em" size="50px">
        </div>
        <hr>
        <input type="submit" value="Done" name="sb" height="200px">
    </form>
    <div class="goto">
        <span><button style="width: 200px; height: 50px;"onclick="window.location.href='instr.php'">NEXT</button></span>
    </div>
    <?php
    $con=mysqli_connect('localhost','root','','quizypy database');
    if(isset($_POST['sb']))
    {
        $name=$_POST['nm'];
        $email=$_POST['em'];
        $query="INSERT INTO users(Name,Email)values('$name','email')";
        $run=mysqli_query($con,$query);

    } 
    ?>
</body>
</html>