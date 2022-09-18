console.log(document.cookie);

function acceptCookie() {
    var cookie = document.getElementById("disclaimer");
    cookie.style.display = "none";
    localStorage.setItem("cookie", "true");
    document.cookie = "cookie=true; expires=Thu, 18 Dec 9999 12:00:00 UTC; SameSite=None; Secure";
}