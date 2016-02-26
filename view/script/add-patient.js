(function addPatient () {
    'use strict';
    document.getElementById('patient-end').addEventListener('change', function showWarnings (event) {
        var isRecommended = event.target.dataset.recommendedEnd === event.target.value;
        var isWithinIrb = moment(event.target.value).unix() < moment(event.target.dataset.irbEnd).unix();

        if (isRecommended && isWithinIrb) {
            document
                .getElementById('patient-end-group')
                .classList
                .remove('has-warning');
        } else {
            document
                .getElementById('patient-end-group')
                .classList
                .add('has-warning');
        }
        if (isRecommended) {
            document
                .getElementById('patient-end-default-warning')
                .classList
                .add('hidden-xl-down');
        } else {
            document
                .getElementById('patient-end-default-warning')
                .classList
                .remove('hidden-xl-down');
        }
        if (isWithinIrb) {
            document
                .getElementById('patient-end-irb-warning')
                .classList
                .add('hidden-xl-down');
        } else {
            document
                .getElementById('patient-end-irb-warning')
                .classList
                .remove('hidden-xl-down');
        }
    });
}());
