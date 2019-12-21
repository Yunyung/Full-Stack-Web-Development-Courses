var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; // store game pattern
var userClickedPattern = []; // store user click color pattern

var level = 0; // If game start, this variable will be set to game's level number. 
var gameStarted = false;

//  detect user click
$("div.btn").on("click", function() {

    // Create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // make sound
    playTargetedPileSound(userChosenColour);
    // do animation after user click on a button
    animatePress(userChosenColour);
    // check user answer
    checkAnswer(userClickedPattern.length);
});

// detect user keyboard press
$(document).on("keydown", function() {
    if (gameStarted === false){ // if game not start, user could Press any Key to start game
        gameStarted = true;
        nextSequence();
    }
});

function nextSequence(){
    /* Update level Challenge*/
    level++; // level up
    userClickedPattern = []; // clear user Clicked Pattern
    $("#level-title").text("Level " + level);
    // pick random Color 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Use jQuery to select the button with the same id as the randomChosenColour
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    // make sound
    playTargetedPileSound(randomChosenColour);

} 

function checkAnswer(currentClickedLevel) {
    console.log("user Pattern:" + userClickedPattern); // for debugger
    console.log("system pattern :" + gamePattern); // for debugger

    currentClickedLevel -= 1; // minus 1, because index start from 0
    if (gamePattern[currentClickedLevel] == userClickedPattern[currentClickedLevel]){
        if (userClickedPattern.length == gamePattern.length)
        {
            setTimeout(function() {
                nextSequence(); // start next level
            }, 1000);
        }
    }
    else {
        // Fail message show to user
        playTargetedPileSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Retart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        // reset variable
        startOver();
    }
}

function playTargetedPileSound(color){
    // use Javascript to play the sound for the button colour
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentPressedColour) {
    $("#" + currentPressedColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentPressedColour).removeClass("pressed");
    }, 100);    
}

function startOver() {
    // reset
    level = 0;
    gamePattern = []; // clear game pattern to reset game
    gameStarted = false;
}