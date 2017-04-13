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

    var ctx = document.getElementById('surveyComplianceChart').getContext('2d');
    var ctx2 = document.getElementById('scoresComplianceChart').getContext('2d');

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
    var pink = "rgba(254, 160,172, 1)";
    var green = "rgba(122, 198,150, 1)";
    var yellow = "rgba(182, 29,57, 1)";
    var blue = "rgba(2, 117,216, 0.6)";
    var clinicalChartConfig = {
    type: 'line',
    data : {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Opioid Equivalance",
            fill:false,
            backgroundColor: pink,
            borderColor: pink,
            pointBorderColor: pink,
            pointBackgroundColor: "#fff",
            pointBorderWidth: 10,
            pointRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "Pain Intensity",
          fill:false,
          backgroundColor: green,
          borderColor: green,
          pointBorderColor: green,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 10,
          pointRadius: 10,
          data: [100, 90, 80, 70, 60, 50, 40],
        },
        {
          label: "Promis Score",
          fill:false,
          backgroundColor: yellow,
          borderColor: yellow,
          pointBorderColor: yellow,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 10,
          pointRadius: 10,
          data: [10, 20, 30, 40, 50, 60, 70],
        },
        {
          label: "Opoid Threshold",
          fill:false,
          backgroundColor: blue,
          borderColor: blue,
          pointBorderColor: blue,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 10,
          pointRadius: 10,
          data: [50, 50, 50,50, 50, 50, 50],
          borderDash: [10,5],
        }
    ]
},
    options: {
        scales: {
            yAxes: [{
                stacked: false
            }]
        }
    }
};


    config.data = allDatesConfig;
    new Chart(ctx, config);

    // clinicalConfig.data = allClinicalValues;
    new Chart(ctx2, clinicalChartConfig);

}());
