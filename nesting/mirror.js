
const diff = document.getElementById("difference");
diff.onclick = function() {
    // get the current document name
    var path = window.location.pathname;
    var page = path.split("/").pop();
    
    document.getElementById("frame").src = `/nesting/nested/${1 + Number(page.charAt(0))}.html`;
}