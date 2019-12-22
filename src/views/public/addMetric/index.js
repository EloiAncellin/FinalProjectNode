let token;

const onLoaded = () => {
    token = localStorage.getItem('jwt') || '';
    if (token === ''){
        window.location.replace('/login');
    }
};

const getMetrics = async (metricName) => {
    const request = new Request(`/api/metrics/collection/${metricName}`);
    const response = await fetch(request, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    });

    const res = JSON.parse(await response.text());
    if (res.status === 'success') {
        displayMetrics(metricName, res.result);
    } else {
        alert(JSON.stringify(res.result));
    }
};



const onDisconnectClicked = () => {
    localStorage.setItem('jwt', '');
    window.location.replace('/login');
};

const onHomeClicked = () => {
    window.location.replace('/');
};


const onAddClicked = async () => {
	console.log(token);
    const metricName = document.getElementById('metric_name').value;
    const metricValue = document.getElementById('metric_value').value;
   
    const request = new Request('/api/metrics');
    const response = await fetch(request, {
        method: 'POST',
        body: JSON.stringify({
            Token: token,
            name : metricName,
            value: metricValue,
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    const res = JSON.parse(await response.text());
    if (res.status === 'success') {
        window.location.replace('/home');
    } else {
        toastr.error(res.result);
    }
};















