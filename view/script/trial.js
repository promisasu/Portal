(function trial () {
    'use strict';

    var ctx = document.getElementById('trialChart').getContext('2d');
    var trialValue = document.getElementById('trialId').value;
    var differenceValue = 0;

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

    $('#fromDate').on('change', function changeToDateValue () {
        var fromDateValue = document.getElementById('fromDate').value;
        var newtoDateValue = moment(fromDateValue).add(differenceValue, 'days').format('YYYY-MM-DD');

        document.getElementById('toDate').value = newtoDateValue;
    }).on('focus', function storeDateDiff (event) {
        var oldfromDateValue = event.target.value;
        var oldtoDateValue = document.getElementById('toDate').value;

        differenceValue = moment(oldtoDateValue).diff(moment(oldfromDateValue), 'days');
    });

    $('#check-compliance').submit(function submitAction (event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            data: $('#check-compliance').serialize(),
            url: '/compliance-values/' + trialValue,
            success: successSubmit
        });
    });

    function successSubmit (newData) {
        data.datasets[0].data = newData;
        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            animation: {
                animateScale: true
            }
        });
    }

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        animation: {
            animateScale: true
        }
    });
}());
