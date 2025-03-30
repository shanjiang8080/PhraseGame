// bookmarks cookies and stuff
const getCookieB = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=')
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}
const holds = document.getElementsByClassName("bwhat");
const array = document.getElementsByClassName("bmark");
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const holder = holds[index];
    if (getCookieB(element.getAttribute("key")) != '') {
        console.log("what the hell");
        const newElem = document.createElement("div");
        newElem.className = "bsolution";
        newElem.style.color = "green";
        newElem.innerHTML = getCookieB(element.getAttribute("key"));
        holder.appendChild(newElem);
    }
}