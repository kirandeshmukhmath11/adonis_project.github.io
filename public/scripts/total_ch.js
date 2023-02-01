//
// **********
// Properties
// **********
//

let chartView = $("#chartView")
var chart

let daySelect = $('#daySelect')

let showButton = $('#showButton')
let infoText = $('#infoText')

var currentDownloadNumber = 0

//
// **************
// Initialization
// **************
//



//
// *********
// Functions
// *********
//







function initChart(data) {

    data = data.reduce(function (map, object) {
        map[object.day] = {
            'meanActivity': object.mean_activity,
            'actualActivity': object.actual_activity,

        }
        return map
    }, {})
    let days = Object.keys(data).sort(function (a, b) {
        return a - b
    })

    let meanActivities = []
    let meanActivitiesPlusStandardDeviations = []
    let meanActivitiesMinusStandardDeviations = []
    let actualActivities = []
    for (day of days) {
        meanActivities.push(data[day].meanActivity)
        meanActivitiesPlusStandardDeviations.push(data[day].meanActivity + data[day].standardDeviation)
        meanActivitiesMinusStandardDeviations.push(data[day].meanActivity - data[day].standardDeviation)
        actualActivities.push(data[day].actualActivity)
    }

    var time = days.map(function (minuteString) {
        day = parseInt(minuteString)
        return day
    })


    if (chart) {
        chart.destroy()
    }

    chart = new Chart(chartView, {

        type: 'line',

        data: {
            labels: time,
            datasets: [{
                label: "Mean activity",
                backgroundColor: 'rgb(0, 0, 0)',
                borderColor: 'rgb(0, 0, 0)',
                data: meanActivities,
                fill: false
            }, {
                label: "Actual activity",
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
                data: actualActivities,
                fill: false
            }]
        },

        options: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            layout: {
                padding: {
                    left: 400,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
}
