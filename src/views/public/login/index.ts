const onLogin = async () => {
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;

    const request = new Request('/api/users/authenticate');
    const response = await fetch(request, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: { 'Content-Type': 'application/json' }
    });

    const res = JSON.parse(await response.text());
    if (res.status === 'success') {
        localStorage.setItem('jwt', res.result.token);
        window.location.replace('/hello');
    } else {
        alert(res.result);
    }
};
