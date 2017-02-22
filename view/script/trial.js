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
    var patientsTable = $('#patients-table').DataTable({
        order: [[1, 'asc'], [5, 'asc'], [3, 'desc']],

        "paging": false
    });
    patientsTable.draw();

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        animation: {
            animateScale: true
        }
    });
}());
