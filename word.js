const secret = document.getElementById("secret");
if (secret != null) {
    secret.onclick = function() {
        setCookie(secret.getAttribute("key"), secret.innerHTML, 1000);
    };    
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
