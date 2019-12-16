const onLoginClicked = () => {
    window.location.replace('/login');
};

const onRegisterClicked = async () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    if (password !== passwordConfirm) {
        alert('Passwords do not match !');
    } else {
        const request = new Request('/api/users/register');
        const response = await fetch(request, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        const res = JSON.parse(await response.text());
        if (res.status === 'success') {
            window.location.replace('/login');
        } else {
            alert(res.result);
        }
    }
};
