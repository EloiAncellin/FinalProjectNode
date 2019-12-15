const onLoginClicked = () => {
    window.location.replace('/login');
};

const onRegisterClicked = async () => {
    const firstName: string = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName: string = (document.getElementById('lastName') as HTMLInputElement).value;
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    const passwordConfirm: string = (document.getElementById('password-confirm') as HTMLInputElement).value;

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
