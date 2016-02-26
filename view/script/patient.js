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
                            unit: 'week',
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

    var ctx = '';
    var mychart = '';

    $('#calendar').fullCalendar({
        defaultView: 'basicWeek',
        allDayDefault: true,
        contentHeight: 'auto',
        events: window.events
    });

    ctx = document.getElementById('complianceChart').getContext('2d');
    config.data = allDatesConfig;
    mychart = new Chart(ctx, config);

    $('.fc-today-button').click(function todayButtonClick () {
        mychart.config.data = allDatesConfig;
        mychart.update();
    });
}());
