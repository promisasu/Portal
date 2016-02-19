(function patient () {
    'use strict';
    // Making deep copy of window.dates {chart config.data} and use it to process compliance chart
    var allDatesConfig = jQuery.extend(true, {}, window.dates);
    var config = {
        type: 'line',
        data: '',
        options: {
            scales: {
                xAxes: [
                    {
                        type: 'time',
                        display: true,
                        time: {
                            format: 'MMDDYYYY HHmm',
                            unit: 'day',
                            round: 'day'
                        },
                        scaleLabel: {
                            show: true,
                            labelString: ''
                        }
                    }
                ],
                yAxes: [
                    {
                        type: 'linear',
                        ticks: {
                            max: 100,
                            min: 0
                        },
                        display: true,
                        scaleLabel: {
                            show: true,
                            labelString: '% Time Left'
                        }
                    }
                ]
            },
            elements: {
                line: {
                    tension: 0.3
                }
            }
        }
    };

    var ctx = document.getElementById('complianceChart').getContext('2d');
    // var perWeekDatesConfig = [];
    var mychart = '';

    $('#calendar').fullCalendar({
        defaultView: 'basicWeek',
        allDayDefault: true,
        contentHeight: 'auto',
        events: window.events
    });

    // perWeekDatesConfig = datesByWeek(allDatesConfig);
    config.data = allDatesConfig;
    mychart = new Chart(ctx, config);
/*
    $('.fc-today-button').click(function todayButtonClick () {
        perWeekDatesConfig = datesByWeek(allDatesConfig);
        mychart.config.data = perWeekDatesConfig;
        mychart.update();
    });

    $('.fc-prev-button').click(function prevButtonClick () {
        perWeekDatesConfig = datesByWeek(allDatesConfig);
        mychart.config.data = perWeekDatesConfig;
        mychart.update();
    });

    $('.fc-next-button').click(function nextButtonClick () {
        perWeekDatesConfig = datesByWeek(allDatesConfig);
        mychart.config.data = perWeekDatesConfig;
        mychart.update();
    });
*/
    /**
     * Takes in a patient's all chart config and returns weekly config
     * @param {Object} configData - Object of chart config data
     * @returns {Object} processed Object of chart config data

    function datesByWeek (configData) {
        // Making deep copy of configData {chart config.data} and use it to process per weekly view
        var datesConfig = jQuery.extend(true, {}, configData);
        var view = $('#calendar').fullCalendar('getView');
        var datesPerView = [];
        var timeLeftData = [];

        var weekStartDate = new Date(view.intervalStart).getTime();
        var weekEndDate = new Date(view.intervalEnd).getTime();
        var index = 0;
        var dateLabel = '';
        var dateDatasetData = '';

        for (index = 0; index < datesConfig.labels.length; index += 1) {
            dateLabel = new Date(datesConfig.labels[index]);
            dateDatasetData = datesConfig.datasets[0].data[index];

            if (dateLabel.getTime() >= weekStartDate && dateLabel.getTime() <= weekEndDate) {
                datesPerView.push(moment(dateLabel).format('MM/DD/YYYY HH:mm'));
                timeLeftData.push(dateDatasetData);
            }
        }

        datesConfig.labels = datesPerView;
        datesConfig.datasets[0].data = timeLeftData;
        return datesConfig;
    }
         */
}());
