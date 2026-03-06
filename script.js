
// Login Page 
document.getElementById("signinBtn").addEventListener("click", (event) => {
    event.preventDefault();
    const userName = document.getElementById("username")
    const userNameValue = userName.value

    const password = document.getElementById("password")
    const passwordValue = password.value

    if(userNameValue == "admin" && passwordValue == "admin123"){
        window.location.assign("./home.html")
    }
})
// Login Page End