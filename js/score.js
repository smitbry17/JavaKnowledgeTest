function highScores(){
    var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highScores.sort(func)
}
