'use strict';
(function trial () {
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

    var patientsTable = $('#patients-table').DataTable({
        order: [[1, 'asc'], [5, 'asc'], [3, 'desc']],
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
