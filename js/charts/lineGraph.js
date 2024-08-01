export async function initLineGraph() {
    const barColors = ["red", "green", "blue", "orange", "purple", "yellow", 'cyan', 'plum', 'brown', "pink", 'teal'];
    const mostViewed = await fetch('https://final-web-cloud-proj-server.onrender.com/api/charts/views').then(res => res.json());
    const views = [];
    const names = [];
    for (let i = 0; i < mostViewed[0].length; i++) {
        const mViewed = mostViewed[0];
        views[i] = mViewed[i].views;
        names[i] = mViewed[i].model_name;
    }
    new Chart("third-chart", {
        type: "line",
        data: {
            labels: names,
            datasets: [{
                backgroundColor: 'black',
                data: views,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
            }]
        },
        options: {

            legend: { display: false },
            title: {
                display: true,
                text: 'Most popular models per views'
            }
        }
    });

}


