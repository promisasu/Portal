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
                '#FF0000',
                '#FF6900',
                '#409909'
            ],
            hoverBackgroundColor: [
                '#FF5A5E',
                '#FF9C56',
                '#80C853'
            ]
        }]
    };
    var ctx = document.getElementById('trialChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        animation: {
            animateScale: true
        }
    });
}());
