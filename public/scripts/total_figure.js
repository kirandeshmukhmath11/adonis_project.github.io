let chartView = $("#chartView")
let totalView = $("#totalView")
var charts

let daySelect = $('#daySelect')

let showtButton = $('#showtButton')
let infoText = $('#infoText')

var currentDownloadNumber = 0

showtButton.click(onShowButtonClick)
onShowButtonClick()

function onShowButtonClick() {

    currentDownloadNumber++
    downloadData()
}

function downloadData() {

    infoText.text('Processing data...')

    let savedDownloadNumber = currentDownloadNumber

    co(function* () {

        Promise.resolve(

            $.ajax({
                url: '/getDataForTotalChart',
                method: 'GET',

            })

        ).then(function (response) {

            if (savedDownloadNumber !== currentDownloadNumber) {
                return
            }

            infoText.text('')
            initChart(response)

        })

            .catch(function (error) {

                if (savedDownloadNumber !== currentDownloadNumber) {
                    return
                }

                console.log('Error while accessing getdataforchart service: ')
                console.log(error)
                infoText.text('Something unexpected happened.')
            })

    }.bind(this))
}

function initChart(data) {

    data = data.reduce(function (map, object) {
        map[object.day] = {
            'meanActivity': object.mean_activity,
            'actualActivity': object.actual_activity,
        }
        return map
    }, {})

    let minutes = Object.keys(data).sort(function (a, b) {
        return a - b
    })

    let meanActivities = []
    let actualActivities = []
    for (day of days) {
        meanActivities.push(data[day].meanActivity)
        actualActivities.push(data[day].actualActivity)
    }

    var time = minutes.map(function (minuteString) {
        minute = parseInt(minuteString)
        hour = parseInt(minute / 60)
        minute -= hour * 60
        return day
    })
    if (chart) {
        chart.destroy()
    }

    charts = new Chart(totalView, {

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
