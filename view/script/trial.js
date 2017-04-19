(function trial () {
    'use strict';

    var data = {
        labels: [
            'Non-compliant',
            'Partially-Compliant',
            'Compliant'
        ],
        datasets: [{
            data: window.data.datasets,
            backgroundColor: [
                '#FF4136',
                '#FFDC00',
                '#2ECC40'
            ]
        }]
    };
    var ctx = document.getElementById('trialChart').getContext('2d');
    var columnStart = 2;
    var columnCompliancePercentage = 4;
    var columnPin = 0;

    var patientsTable = $('#patients-table').DataTable({
        order: [[columnStart, 'desc'], [columnCompliancePercentage, 'desc'], [columnPin, 'desc']],
        paging: false
    });

    patientsTable.draw();

    document.getElementById('add-patient-btn')
    .addEventListener('click', function addNewPatient () {
        var element = document.getElementById('add-patient-btn');
        var trialId = element.getAttribute('data-trial-id');

        window.location = '/enroll/' + trialId;
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        animation: {
            animateScale: true
        }
    });
}());
