let token;

const onLoaded = () => {
    token = localStorage.getItem('jwt') || '';
    if (token === ''){
        window.location.replace('/login');
    }
    console.log(token);
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
	console.log("eloi")
    localStorage.setItem('jwt', '');
    window.location.replace('/login');
};

const onHomeClicked = () => {
	console.log("jean")
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















