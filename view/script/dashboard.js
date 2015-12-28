(function dashboard () {
    'use strict';

    var ctx = document.getElementById('radarChart').getContext('2d');
    var table = $('#trials').DataTable();

    new Chart(ctx, {
        type: 'radar',
        data: window.data,
        options: {}
    });

    $('.dropdown-menu').on('click', 'div', function selectItem () {
        var selectedVal = $(this).text().trim();

        $('#selectedChoice').val(selectedVal);
        table.draw();
    });

    $.fn.dataTable.ext.search.push(
        function testRow (settings, rowContent) {
            var startDateIndex = 4;
            var endDateIndex = 5;
            var date = new Date();
            var startDate = moment(rowContent[startDateIndex], 'MM-DD-YYYY');
            var endDate = moment(rowContent[endDateIndex], 'MM-DD-YYYY');
            var choice = $('#selectedChoice').val();

            switch (choice) {
                case 'All Trials':
                    return true;
                case 'Upcoming':
                    if (startDate > date) {
                        return true;
                    }
                    return false;
                case 'In Progress':
                    if (date > startDate && date < endDate) {
                        return true;
                    }
                    return false;
                case 'Completed':
                    if (endDate < date) {
                        return true;
                    }
                    return false;
                default:
                    return true;
            }
        }
    );
}());
