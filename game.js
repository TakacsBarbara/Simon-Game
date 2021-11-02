
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

$(".btn").click(function(){
    let userChoosenColour = $(this).attr("id");

    userClickedPattern.push(userChoosenColour);

    playSound(userChoosenColour);

    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length-1);
});


$(document).keydown(function() {
    if(!start) {
        $("#level-title").text("Level "+level);
        nextSequence();
        start = true;
    }
});

function startOver() {
    level = 0;
    start = false;
    gamePattern = [];
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart!");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    let randomNumber = Math.floor(Math.random()*4);
    
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed")
    }, 100);
}


