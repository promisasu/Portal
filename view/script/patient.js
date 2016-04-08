(function patient () {
    'use strict';

    var isNewPatient = window.location.search;
    var re = /newPatient=true/;

    if(re.test(isNewPatient))
        $('#remember-patient-dialog').modal('show');

    // Makes a copy of window.dates
    var allDatesConfig = Object.create(window.dates);
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
            }
        }
    };

    var ctx = document.getElementById('complianceChart').getContext('2d');

    config.data = allDatesConfig;
    new Chart(ctx, config);
}());
