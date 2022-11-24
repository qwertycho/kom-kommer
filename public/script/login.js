const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const button = document.getElementById('login');

const login = async (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    const response = await fetch('/dashboard/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    }
    button.addEventListener('click', login);
