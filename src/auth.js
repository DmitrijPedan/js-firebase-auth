export function getAuthForm() {
    return `
        <form class="mui-form" id="authForm">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" required>
                <label for="email">email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password" required>
                <label for="password">Пароль</label>
            </div>
            <button type="submit" id="submitBtn" class="mui-btn mui-btn--raised mui-btn--primary" >
                Войти
            </button>
            <div id="formError"></div>
        </form>
    `
}

export function authWithEmailAndPassword(email, password) {
   const API_KEY = 'AIzaSyAZueUAYFJYxaTv-HXfSCOfd0UenJ0UYUY';
   return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
       method: 'POST',
       body: JSON.stringify({
           email: email,
           password: password,
           returnSecureToken: true
       }),
       headers: {
           'Content-Type': 'application/json'
       }
   })
       .then(resp => resp.json())
       .then(data => data.idToken)
}
