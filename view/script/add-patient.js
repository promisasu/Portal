(function addPatient () {
    'use strict';
    document.getElementById('patient-end').addEventListener('change', function showWarning (event) {
        if (event.target.dataset.recommendedEnd === event.target.value) {
            document
                .getElementById('patient-end-group')
                .classList
                .remove('has-warning');
            document
                .getElementById('patient-end-warning')
                .classList
                .add('hidden-xl-down');
        } else {
            document
                .getElementById('patient-end-group')
                .classList
                .add('has-warning');
            document
                .getElementById('patient-end-warning')
                .classList
                .remove('hidden-xl-down');
        }
    });
}());
