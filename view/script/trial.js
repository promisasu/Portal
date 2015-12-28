(function trial () {
    'use strict';

    var ctx = document.getElementById('trialChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: window.data
    });
}());
