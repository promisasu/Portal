(function patient () {
    'use strict';

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

    var allDatesConfig = jQuery.extend(true, {}, window.dates);
    var ctx = document.getElementById('complianceChart').getContext('2d');
    var perWeekDatesConfig = [];

    $('#calendar').fullCalendar({
        defaultView: 'basicWeek',
        allDayDefault: true,
        contentHeight: 'auto',
        events: window.events
    });

    perWeekDatesConfig = datesByWeek(allDatesConfig);
    config.data = perWeekDatesConfig;

    $('.fc-today-button').click(function todayButtonClick () {
        perWeekDatesConfig = datesByWeek(allDatesConfig);
        config.data = perWeekDatesConfig;
        new Chart(ctx, config);
    });

    $('.fc-prev-button').click(function prevButtonClick () {
        perWeekDatesConfig = datesByWeek(allDatesConfig);
        config.data = perWeekDatesConfig;
        new Chart(ctx, config);
    });

    $('.fc-next-button').click(function nextButtonClick () {
        perWeekDatesConfig = datesByWeek(allDatesConfig);
        config.data = perWeekDatesConfig;
        new Chart(ctx, config);
    });

    function datesByWeek (configData) {
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
                datesPerView.push(moment(dateLabel).utc().format('MM/DD/YYYY HH:mm'));
                timeLeftData.push(dateDatasetData);
            }
        }

        datesConfig.labels = datesPerView;
        datesConfig.datasets[0].data = timeLeftData;
        return datesConfig;
    }

    new Chart(ctx, config);
}());
