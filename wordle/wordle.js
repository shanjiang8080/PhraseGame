let solution;
const date = new Date();
const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
const dateString = `${date.getFullYear()}-${month}-${day}`;

fetch(`/api/wordleAPI?date=${dateString}`)
  .then(response => response.json())
  .then(data => {
    solution = data.solution;
    console.log(`solution for today is ${solution}`);
    document.getElementById("wordle").innerHTML = "<wordle-for-good " +
    `word=\"${solution.charCodeAt(0)}-${solution.charCodeAt(1)}-${solution.charCodeAt(2)}-${solution.charCodeAt(3)}-${solution.charCodeAt(4)}\" ` + 
    "bg-color=\"#fafafa\" " + 
    "text-color=\"#333333\" " +
    "tile-border-color=\"#888888\" " +
    "tile-bg-color=\"#ffffff\" " +
    "tile-bg-wrong-color=\"#39393c\" " +
    "tile-bg-wrong-location-color=\"#b59f3b\" " +
    "tile-bg-correct-color=\"#538d4e\" " +
    "tile-text-color=\"#333333\" " +
    "key-bg-color=\"#818283\" " +
    "key-text-color=\"#ffffff\" " +
    "key-text-size=\"1.3rem\" " +
    "height=\"700px\" " +
    "title=\"Wordle\" " +
    "success-selector=\"#win\" " +
    "failure-selector=\"#lose\" " +    
    "></wordle-for-good>";

    // update win and lose
    document.getElementById("wintext").innerHTML = `The word is: <strong>${solution}</strong>`;
    document.getElementById("losetext").innerHTML = `The word is: <strong>${solution}</strong>`;
  })
  .catch(error => console.error('Error: ', error));



