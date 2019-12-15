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
    const data = metrics.map((metric) => {
        return {
            x: metric.date,
            y: metric.value
        };
    });

    const serie = {
        label: metricName,
        borderColor: 'blue',
        data: data
    };

    const ctx = document.getElementById('myChart');
    const lines = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [serie]
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
