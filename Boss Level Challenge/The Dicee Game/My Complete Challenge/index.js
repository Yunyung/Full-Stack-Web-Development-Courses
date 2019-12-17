var randomNumber1 = Math.floor(Math.random() * 6 + 1);
var randomNumber2 = Math.floor(Math.random() * 6 + 1);

document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");

var who_win = "draw"; // default result is draw 
if (randomNumber1 > randomNumber2) {
    who_win = "🔥Player1 Win!";
}
else if (randomNumber2 > randomNumber1) {
    who_win = "Player2 Win!💦";
}

document.querySelector("h1").innerHTML = who_win;


