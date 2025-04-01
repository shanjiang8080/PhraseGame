// Set the date we're counting down to
var countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 5);
countDownDate.setHours(0);
countDownDate.setMinutes(0);
countDownDate.setSeconds(0);


// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for d:h: minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo1").innerHTML = `${days}d: ${hours}h: ${minutes}m: ${seconds}s`;
  document.getElementById("demo2").innerHTML = `${days}d: ${hours}h: ${minutes}m: ${seconds}s`;
  document.getElementById("demo3").innerHTML = `${days}d: ${hours}h: ${minutes}m: ${seconds}s`;


  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo1").innerHTML = "EXPIRED";
    document.getElementById("demo2").innerHTML = "";
    document.getElementById("demo3").innerHTML = "";
    document.getElementById("secret").className = "expired";
  }
}, 1000);

function decrement() {
    countDownDate.setHours(countDownDate.getHours() - 12);
    // change the icon
    but = document.getElementById("thing");
    if (but.className == "l") {
        but.className = "d";
        but.innerHTML = "<img src=\"moon.svg\" style=\"filter: invert(1);\">"
        swap("l");
    } else {
        but.className = "l";
        but.innerHTML = "<img src=\"sun.svg\">"
        swap("d");
    }
}

function swap(string) {
    if (string == "l") {
        // swap to dark
        // get all elements
        let elems = document.getElementsByClassName("light");
        for (const elem of elems) {
            elem.className = "dark";
        }
    }
    else {
        let elems = document.getElementsByClassName("dark");
        for (const elem of elems) {
            elem.className = "light";
        }
    }
}