let token;

const onLoaded = () => {
    token = localStorage.getItem('jwt') || '';
    if (token === ''){
        window.location.replace('/login');
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
    const metricName = document.getElementById('metric_name').value;
    const metricValue = document.getElementById('metric_value').value;
   
    const request = new Request('/api/metrics');
    const response = await fetch(request, {
        method: 'POST',
        body: JSON.stringify({
        	metrics: [{
        		name : metricName,
            	value: metricValue
            	}
     		]
        }),
        headers: { 'Content-Type': 'application/json',
        authorization : token }
    });
    const res = JSON.parse(await response.text());
    if (res.status === 'success') {
        window.location.replace('/');
    } else {
        toastr.error(res.result);
    }
};
