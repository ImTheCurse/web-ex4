import { initPieGraph } from "./pieGraph.js";
import { initLineGraph } from "./lineGraph.js";
async function initBarGraph() {

    const avg = await fetch('https://final-web-cloud-proj-server.onrender.com/api/charts/avg').then(res => res.json());
    const avgName = [];
    const avgValue = [];

    for (let i = 0; i < avg[0].length; i++) {
        const averages = avg[0];
        avgName[i] = averages[i].test_name;
        avgValue[i] = averages[i].avg_attempts;
    }



    const xValues = ["Lift & Drag", "Heat transfer & wind tunnels", "Propulsion & Combustion", "Laminar Flow", "Finite & Swept Wings"];
    const yValues = [55, 49, 44, 24, 15, 7];
    const barColors = ["red", "green", "blue", "orange", "purple"];

    new Chart("first-chart", {
        type: "bar",
        data: {
            labels: avgName,
            datasets: [{
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1,
                data: avgValue
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },

            legend: { display: false },
            title: {
                display: true,
                text: 'Average number of attempts per test'
            },

        }
    });
}
initBarGraph();
initPieGraph();
initLineGraph();

