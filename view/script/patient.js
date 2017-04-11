(function patient () {
    'use strict';

    var isNewPatient = window.location.search;
    var isNewPatientRegex = /newPatient=true/;

    // Makes a copy of window.dates
    var allDatesConfig = Object.create(window.dates);
    var allClinicalValues = Object.create(window.clinicalValues);

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

    var ctx = document.getElementById('complianceChart').getContext('2d');
    var ctx2 = document.getElementById('complianceChart2').getContext('2d');

    function redirect () {
        var element = document.getElementById('deactivate-patient');
        var patientPin = element.getAttribute('data-patient-pin');
        var redirectUrl = '/';
        if (patientPin != undefined && patientPin != '') {
            redirectUrl = '/patient/' + patientPin;
        }
        window.location = redirectUrl;
    }

    function warningMessage () {
        alert('patient could not be deactivated');
    }

    var proxyPinElement = document.getElementById('parent-proxy');
    var proxyPin = proxyPinElement.getAttribute('data-proxy-pin');

    if (proxyPin != undefined && proxyPin != null && proxyPin != '') {
        proxyPinElement.removeAttribute('hidden');
        document.getElementById('deactivate-patient').setAttribute("hidden",null);
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

    var clinicalConfig = Object.assign({},config);

    config.data = allDatesConfig;
    new Chart(ctx, config);

    clinicalConfig.data = allClinicalValues;
    new Chart(ctx2, clinicalConfig);

}());
