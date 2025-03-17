document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const authModal = document.getElementById("auth-modal");
    const authTitle = document.getElementById("auth-title");
    const authSubmit = document.getElementById("auth-submit");
    const closeModal = document.querySelector(".close");
    const userInfo = document.getElementById("user-info");
    let isLogin = true;

    function checkLogin() {
        const user = localStorage.getItem("user");
        if (user) {
            loginBtn.style.display = "none";
            registerBtn.style.display = "none";
            userInfo.style.display = "inline";
            userInfo.textContent = `Hoş geldin, ${user}`;
            logoutBtn.style.display = "inline";
        }
    }

    loginBtn.addEventListener("click", function () {
        isLogin = true;
        authTitle.textContent = "Giriş Yap";
        authModal.style.display = "block";
    });

    registerBtn.addEventListener("click", function () {
        isLogin = false;
        authTitle.textContent = "Kayıt Ol";
        authModal.style.display = "block";
    });

    closeModal.addEventListener("click", function () {
        authModal.style.display = "none";
    });

    authSubmit.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        if (isLogin) {
            const storedPassword = localStorage.getItem(`user_${username}`);
            if (storedPassword && storedPassword === password) {
                localStorage.setItem("user", username);
                alert("Giriş başarılı!");
                authModal.style.display = "none";
                location.reload();
            } else {
                alert("Kullanıcı adı veya şifre yanlış.");
            }
        } else {
            if (localStorage.getItem(`user_${username}`)) {
                alert("Bu kullanıcı adı zaten alınmış.");
                return;
            }
            localStorage.setItem(`user_${username}`, password);
            alert("Kayıt başarılı, giriş yapabilirsiniz!");
            authModal.style.display = "none";
        }
    });

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("user");
        location.reload();
    });

    checkLogin();
});
