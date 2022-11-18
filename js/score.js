const clearHistory = document.getElementById("clear");
const leaderboard = document.getElementById("scores");
clearHistory.addEventListener("click", clearLeaderboard);
// generate and manage highscores
function highScores() {
  var highScores = JSON.parse(window.localStorage.getItem("highscore")) || [];
  console.log(highScores);
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  for (var i = 0; i < highScores.length; i++) {
    var list = document.createElement("li");
    list.textContent = highScores[i].initials + " - " + highScores[i].score;
    leaderboard.appendChild(list);
  }
}
// clear leaderboard
function clearLeaderboard() {
  window.localStorage.removeItem("highscore");
  window.location.reload();
}
highScores();
