let user;
let token;

const onLoaded = () => {
    token = localStorage.getItem('jwt') || '';
    if (token === ''){
        window.location.replace('/login');
    }
};

const getUserData = async () => {
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
        document.getElementById('greeting').innerHTML = `Hello ${user.firstName}`;
        getMetrics();
    }
};

const getMetrics = async () => {
    const request = new Request('/api/metrics');
    const response = await fetch(request, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    });

    const res = JSON.parse(await response.text());
    if (res.status === 'success') {
        const metrics = res.result;
        const ul = document.createElement("ul");
        metrics.forEach((metric) => {
            const a = document.createElement("a");
            a.href = `/metrics/${metric}`;
            const li = document.createElement("li");
            li.innerHTML = metric;
            a.appendChild(li)
            ul.appendChild(a);
        });
        document.getElementById('metrics').appendChild(ul);
    }
};

const onDisconnectClicked = () => {
    localStorage.setItem('jwt', '');
    window.location.replace('/login');
};

const onHomeClicked = () => {
    window.location.replace('/');
}

const onAddMetricClicked = () => {
    window.location.replace('/addMetric');
}