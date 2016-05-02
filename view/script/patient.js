(function patient () {
    'use strict';

    var isNewPatient = window.location.search;
    var isNewPatientRegex = /newPatient=true/;

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
                        id: 'y-axis-0',
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            max: 100,
                            min: 0
                        },
                        display: true,
                        scaleLabel: {
                            show: true,
                            labelString: '% Time Left'
                        }
                    },
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        position: 'right',
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

    function redirect () {
        window.location = '/';
    }

    function warningMessage () {
        alert('patient could not be deactivated');
    }

    document.getElementById('deactivate-patient')
    .addEventListener('click', function deactivate () {
        $.ajax({
            url: window.location.pathname,
            type: 'DELETE'
        })
        .done(redirect)
        .fail(warningMessage);
    });

    if (isNewPatientRegex.test(isNewPatient)) {
        $('#remember-patient-dialog').modal('show');
    }

    config.data = allDatesConfig;
    new Chart(ctx, config);
}());
