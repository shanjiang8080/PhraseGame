// first, create the font
font = document.createElement("link");
font.setAttribute("rel", "stylesheet");
font.setAttribute("href", "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap");
// then create the css link
stylesheet = document.createElement("link");
stylesheet.setAttribute("rel", "stylesheet");
stylesheet.setAttribute("href", "/hints.css");

// add font to head
document.head.appendChild(font);
document.head.appendChild(stylesheet);

let oldUrl = document.URL;

function getLocal(url, replaced) {
    if (url.indexOf("index.html") != -1) {
        // it's on localhost
        // run it to the thing
        return url.replace("index.html", replaced);
    }
    else {
        return `${url}/${replaced}`;
    }
}

// create three (?) things in the current document.
let qmark = document.createElement("button");
qmark.classList.add("qmark");
qmark.innerHTML = "?";

let qanswer = document.createElement("div");
qanswer.style.display = "none";
qanswer.classList.add("qanswer");
fetch(getLocal(oldUrl, "hint1.txt"))
.then(response => response.text())
.then((data) => {
//console.log(data);
qanswer.innerHTML = data;
});

let qqmark = document.createElement("button");
qqmark.classList.add("qmark");
qqmark.innerHTML = "??";

let qqanswer = document.createElement("div");
qqanswer.style.display = "none";
qqanswer.classList.add("qanswer");
fetch(getLocal(oldUrl, "hint2.txt"))
.then(response => response.text())
.then((data) => {
//console.log(data);
qqanswer.innerHTML = data;
});

let qqqmark = document.createElement("button");
qqqmark.classList.add("qmark");
qqqmark.innerHTML = "!!!";

let qqqanswer = document.createElement("div");
qqqanswer.style.display = "none";
qqqanswer.classList.add("qanswer");
fetch(getLocal(oldUrl, "solution.txt"))
.then(response => response.text())
.then((data) => {
//console.log(data);
qqqanswer.innerHTML = data;
});



// add things to qholder
let qholder = document.createElement("div");
qholder.classList.add("qholder");
qholder.appendChild(qmark);
qholder.appendChild(qanswer);

let qholder2 = document.createElement("div");
qholder2.style.display = "none";
qholder2.classList.add("qholder");
qholder2.appendChild(qqmark);
qholder2.appendChild(qqanswer);

let qholder3 = document.createElement("div");
qholder3.style.display = "none";
qholder3.classList.add("qholder");
qholder3.appendChild(qqqmark);
qholder3.appendChild(qqqanswer);

// make an event listener to reveal hint system progressively.
qmark.addEventListener("click", function() {
    // make the answer visible
    qanswer.style.display = "unset";
    // make the second qholder visible
    qholder2.style.display = "flex";
});
qqmark.addEventListener("click", function() {
    // make the answer visible
    qqanswer.style.display = "unset";
    // make the third qholder visible
    qholder3.style.display = "flex";
});
qqqmark.addEventListener("click", function() {
    // make the answer visible
    qqqanswer.style.display = "unset";
});



// qqholder (parent of hint system)
let qqholder = document.createElement("div");
qqholder.classList.add("qqholder");
qqholder.appendChild(qholder);
qqholder.appendChild(qholder2);
qqholder.appendChild(qholder3);


document.body.appendChild(qqholder);
//console.log("uh, it was loaded");