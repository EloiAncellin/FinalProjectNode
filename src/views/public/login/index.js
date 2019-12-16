const checkLoggedIn = () => {
    const token = localStorage.getItem('jwt') || '';
    if (token !== '') {
        window.location.replace('/');
    }
};

const onRegisterClicked = async () => {
    window.location.replace('/register');
};

const onLoginClicked = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const request = new Request('/api/users/authenticate');
    const response = await fetch(request, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: { 'Content-Type': 'application/json' }
    });

    const res = JSON.parse(await response.text());
    if (res.status === 'success') {
        localStorage.setItem('jwt', res.result.token);
        window.location.replace('/');
    } else {
        toastr.error(res.result);
    }
};
