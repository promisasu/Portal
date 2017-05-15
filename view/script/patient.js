'use strict';
(function patient () {
    var isNewPatient = window.location.search;
    var isNewPatientRegex = /newPatient=true/;

    // Makes a copy of window.dates
    var allDatesConfig = Object.create(window.dates);
    var allClinicalValues = Object.create(window.clinicalValues);
    var proxyPinElement = document.getElementById('parent-proxy');
    var proxyPin = proxyPinElement.getAttribute('data-proxy-pin');

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
                yAxes: [{
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
                }]
            }
        }
    };

    var surveyContext = document.getElementById('surveyComplianceChart').getContext('2d');
    var scoresContext = document.getElementById('scoresComplianceChart').getContext('2d');

    var clinicalChartConfig = {
        type: 'line',
        options: {
            scales: {
                yAxes: [{
                    stacked: false,
                    display: false
                }]
            }
        }
    };

    function redirect () {
        var element = document.getElementById('deactivate-patient');
        var patientPin = element.getAttribute('data-patient-pin');
        var redirectUrl = '/';

        if (typeof patientPin !== 'undefined' && patientPin !== '') {
            redirectUrl = '/patient/' + patientPin;
        }
        window.location = redirectUrl;
    }

    function warningMessage () {
        alert('patient could not be deactivated');
    }

    if (typeof proxyPin !== 'undefined' && proxyPin !== null && proxyPin !== '') {
        proxyPinElement.removeAttribute('hidden');
        document.getElementById('deactivate-patient').setAttribute('hidden', null);
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
    new Chart(surveyContext, config);

    clinicalChartConfig.data = allClinicalValues;
    new Chart(scoresContext, clinicalChartConfig);
}());
