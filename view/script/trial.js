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
    $('#fromDate').on('change', function changeToDateValue () {
        var fromDateValue = document.getElementById('fromDate').value;
        var newtoDateValue = moment(fromDateValue).add(differenceValue, 'days').format('YYYY-MM-DD');

        document.getElementById('toDate').value = newtoDateValue;
    }).on('focus', function storeDateDiff (event) {
        var oldfromDateValue = event.target.value;
        var oldtoDateValue = document.getElementById('toDate').value;

        differenceValue = moment(oldtoDateValue).diff(moment(oldfromDateValue), 'days');
    });
    /**
    * In above code, old toDate and fromDate values are first stored on focussing into toDate and difference calculated.
    * Later the  difference is added on change of fromDate to toDate value in order to get new toDate.
    */

    $('#toDate').on('focusout', function submitAction () {
        document
        .getElementById('check-compliance')
        .submit();
    });
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        animation: {
            animateScale: true
        }
    });
}());
