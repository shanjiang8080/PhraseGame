const date = new Date();
const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
const url = `https://www.nytimes.com/svc/wordle/v2/${date.getFullYear()}-${month}-${day}.json`;
try {
    const response = fetch(url, { mode: 'no-cors' });
    if (!response.ok) {
        throw new Error(`Didn't work!: ${response.status}`);
    }
    console.log("adsfasfd");

    const json = response.json();
    const solution = json.solution;
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
    "title=\"Wordle For Good\"></wordle-for-good>";

} catch (error) {
    console.error(error.message);
}


