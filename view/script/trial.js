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
    var differenceValue = 0;

    document.getElementById('toDate').setAttribute('min', document.getElementById('fromDate').value);
    $('#fromDate').on('change', function changetoDateValue () {
        var fromDateValue = document.getElementById('fromDate').value;
        var newtoDateValue = moment(fromDateValue).add(differenceValue, 'days').format('YYYY-MM-DD');

        document.getElementById('toDate').value = newtoDateValue;
    }).on('focus', function xyz (event) {
        var oldfromDateValue = event.target.value;
        var oldtoDateValue = document.getElementById('toDate').value;

        differenceValue = moment(oldtoDateValue).diff(moment(oldfromDateValue), 'days');
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        animation: {
            animateScale: true
        }
    });
}());
