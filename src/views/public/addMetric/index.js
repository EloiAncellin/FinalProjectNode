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

const displayMetrics = (metricName, metrics) => {
    const ctx = document.getElementById('myChart');
    const lines = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: metricName,
                    borderColor: 'blue',
                    data: metrics.map((metric) => {
                        return {
                            x: metric.date,
                            y: metric.value
                        };
                    })
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0.2,
                    borderWidth: 1.5
                }
            },
            scales: {
                xAxes: [{
                    type: 'time'
                }]
            }
        }
    });
};

const onDisconnectClicked = () => {
    localStorage.setItem('jwt', '');
    window.location.replace('/login');
};

const onHomeClicked = () => {
    window.location.replace('/');
}








const onAddClicked = async () => {
    const metricName = document.getElementById('metric_name').value;
    const metricValue = document.getElementById('metric_value').value;
   
    const request = new Request('/api/users/register');
    const response = await fetch(request, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    const res = JSON.parse(await response.text());
    if (res.status === 'success') {
        window.location.replace('/login');
    } else {
        toastr.error(res.result);
    }
};















