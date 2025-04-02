const button = document.getElementById("loginb");
const order = ['wordle', 'countdown', 'stretch', 'scrolling', 'nesting'];
const inp = document.getElementById("passp");
const errorspot = document.getElementById("errorspot");

const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=')
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}

button.addEventListener("click", function() {
    // validate the thing
    // get the input current value.
    const passphrase = inp.value;
    // split into tokens
    const array = passphrase.split(" ");
    if (array.length != 5) {
        errorspot.style.display = "unset";
        errorspot.innerHTML = "Error: five words expected.";
        return;
    }
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const key = order[index];
        const value = getCookie(key);
        if (value == '') {
            errorspot.style.display = "unset";
            errorspot.innerHTML = "Error: Not all puzzles solved";
            return;
        }
        // check each element against its key
        if (value != element) {
            errorspot.style.display = "unset";
            errorspot.innerHTML = "Error: At least one word is incorrect.";
            return;
        }
    }
    // it didn't give an error, so it's right
    // send the user to the victory screen.
    if (document.URL.indexOf("localhost") != -1) {
        window.location.href = '/winner/index.html';
    }
    else {
        window.location.href = '/winner';
    }
});