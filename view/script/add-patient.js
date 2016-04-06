(function addPatient () {
    'use strict';
    document.getElementById('patient-end').addEventListener('change', function showWarnings (event) {
        var isRecommended = event.target.dataset.recommendedEnd === event.target.value;
        var isWithinIrb = moment(event.target.value).unix() < moment(event.target.dataset.irbEnd).unix();

        document
        .getElementById('patient-end-group')
        .classList
        .toggle('has-warning', !isRecommended || !isWithinIrb);

        document
        .getElementById('patient-end-default-warning')
        .classList
        .toggle('hidden-xl-down', isRecommended);

        document
        .getElementById('patient-end-irb-warning')
        .classList
        .toggle('hidden-xl-down', isWithinIrb);
    });
}());
