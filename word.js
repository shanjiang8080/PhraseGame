let secret = document.getElementById("secret");

const setCookie = (name, value, days = 7, path = '/') => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}
const setCookieForMidnight = (name, value, path = '/') => {
    const now = new Date();
    const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // Get next day's midnight
        0, 0, 0, 0 // Hours, minutes, seconds, milliseconds set to 0
    );
    const millisecondsToMidnight = midnight - now;

    const expires = new Date(Date.now() + millisecondsToMidnight).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path;
};
  
const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=')
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}
  
const deleteCookie = (name, path) => {
    setCookie(name, '', -1, path)
}

function MakeGreen() {
    if (secret == null) {
        secret = document.getElementById("secret");
    }
    secret.style.color = "green";
    secret.style.mixBlendMode = "normal";
    console.log("green now");
}

if (secret != null) {
    // on click, make it green.
    const key = secret.getAttribute("key");
    // if the cookie has been set, then turn it green
    if (getCookie(key) != '') {
        MakeGreen();
    }
    // if you are on wordle
    if (document.URL.indexOf('wordle') != -1) {
        secret.onclick = function() {
            console.log("setting a Wordle cookie");
            setCookieForMidnight(key, secret.innerHTML);
            MakeGreen();
        };        
    } else {
        secret.onclick = function() {
            console.log("setting a cookie");
            setCookie(key, secret.innerHTML);
            MakeGreen();
        };        
    }
} else {
    console.log("secret is null");
}

function forceLoadWordah() {
    console.log("forceloadwordah is running");
    // get secret
    secret = document.getElementById("secret");
    const key = secret.getAttribute("key");
    // if the cookie has been set, then turn it green
    if (getCookie(key) != '') {
        MakeGreen();
    }
    // you are on wordle
    secret.addEventListener("click", function() {
        console.log("setting a Wordle cookie");
        setCookieForMidnight(key, secret.innerHTML);
        MakeGreen();
    });        
}