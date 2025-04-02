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
        //document.getElementById("wintext").innerHTML = `The word is: <button id="secret" key="wordle">${solution}</button>`;
        // Get the parent element where the button will be appended
        const wintext = document.getElementById("wintext");

        // Create the button element
        const button = document.createElement("button");

        // Set the attributes for the button
        button.id = "secret";
        button.setAttribute("key", "wordle");

        // Set the innerHTML (or textContent) for the button
        button.textContent = solution;

        // Append the button to the parent element
        wintext.textContent = "The word is: "; // Add preceding text
        wintext.appendChild(button);
    
    })
.catch(error => console.error('Error: ', error));

//forceLoadWordah();

const winDiv = document.getElementById("win");
const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
        // check if mutation is attribute change
        if (mutation.type === "attributes" && mutation.attributeName === "data-wordle-for-good") {
            if (winDiv.getAttribute("data-wordle-for-good") === "win") {
                //console.log("THE WIN HAPPENED");
                forceLoadWordah();
            }

        }
    });
    
});

const config = { attributes: true };

observer.observe(winDiv, config);

