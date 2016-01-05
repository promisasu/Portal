(function showTimeoutMessage () {
    'use strict';

    var timeInMilliseconds = 900000;

    setTimeout(function showMessage () {
        $('#timeoutModal').modal('show');
    }, timeInMilliseconds);
}());
