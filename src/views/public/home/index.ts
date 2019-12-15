let user;

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
        user = res.result;
        (document.getElementById('greeting') as HTMLInputElement).innerHTML = `Hello ${user.firstName}`;
    } else {
        alert(res.result);
    }
};

const onDisconnectClicked = () => {
    localStorage.setItem('jwt', '');
    window.location.replace('/login');
}

export = {};
