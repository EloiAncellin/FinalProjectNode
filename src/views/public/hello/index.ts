const getUserData = async () => {
    const token: string = localStorage.getItem('jwt') || '';
    if (token === ''){
        window.location.replace('/login');
    }

    const request = new Request('/api/users/me');
    const response = await fetch(request, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    });

    const res = JSON.parse(await response.text());
    if (res.status === 'success') {
        (document.getElementById('email') as HTMLInputElement).innerHTML = res.result.email;
        (document.getElementById('firstName') as HTMLInputElement).innerHTML = res.result.firstName;
        (document.getElementById('lastName') as HTMLInputElement).innerHTML = res.result.lastName;
    } else {
        alert(res.result);
    }
};
