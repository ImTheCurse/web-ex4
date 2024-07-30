const temp = document.getElementById('temperture');
const humidity = document.getElementById('humidity');
const airDensity = document.getElementById('air-density');
const simBtn = document.getElementById('sim-btn');

temp.addEventListener('input', (event) => {
    temp.setAttribute('value', event.target.value);
});

humidity.addEventListener('input', (event) => {
    humidity.setAttribute('value', event.target.value);
});
airDensity.addEventListener('input', (event) => {
    airDensity.setAttribute('value', event.target.value);
});
simBtn.addEventListener('click', async () => {
    const tmp = temp.getAttribute('value');
    const modelID = sessionStorage.getItem('model-id');
    const hum = humidity.getAttribute('value');
    const airDen = airDensity.getAttribute('value');

    const inputs = await fetch("https://final-web-cloud-proj-server.onrender.com/api/enviorment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ modelID: sessionStorage.getItem('model-id') })
    }).then(res => res.json());

    if (inputs.length == 0) {
        await fetch("https://final-web-cloud-proj-server.onrender.com/api/enviorment/insert", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modelID: sessionStorage.getItem('model-id'),
                airDensity: airDen,
                temp: tmp,
                humidity: hum
            })
        });
    } else {
        await fetch("https://final-web-cloud-proj-server.onrender.com/api/enviorment/update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modelID: sessionStorage.getItem('model-id'),
                airDensity: airDen,
                temp: tmp,
                humidity: hum
            })
        });
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch("https://final-web-cloud-proj-server.onrender.com/api/enviorment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ modelID: sessionStorage.getItem('model-id') })
    }).then(res => res.json());
    const weather = await response[0];
    if (weather) {
        humidity.setAttribute('value', weather.humidity);
        airDensity.setAttribute('value', weather.airDensity);
        temp.setAttribute('value', weather.temperture);
        return;
    }
    const weatherEnv = await fetch("https://final-web-cloud-proj-server.onrender.com/api/enviorment/weather", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    humidity.setAttribute('value', weatherEnv.humidity);
    temp.setAttribute('value', weatherEnv.temp);
    airDensity.setAttribute('value', weatherEnv.pressure);
})


