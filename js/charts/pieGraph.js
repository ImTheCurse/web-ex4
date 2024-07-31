
export async function initPieGraph() {
    const count = await fetch('https://final-web-cloud-proj-server.onrender.com/api/charts/count').then(res => res.json());
    const topicName = [];
    const numStudents = [];
    const barColors = ["red", "green", "blue", "orange", "purple", "yellow", 'cyan', 'plum', 'brown', "pink", 'teal'];

    for (let i = 0; i < count[0].length; i++) {
        const counts = count[0];
        topicName[i] = counts[i].topic_name;
        numStudents[i] = counts[i].num_students;
    }
    new Chart("second-chart", {
        type: "pie",
        data: {
            labels: topicName,
            datasets: [{
                backgroundColor: barColors,
                data: numStudents
            }]
        },
        options: {

            legend: { display: false },
            title: {
                display: true,
                text: 'Number of students per topic'
            }
        }
    });
}


