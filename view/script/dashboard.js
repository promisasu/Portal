(function dashboard () {
    'use strict';

    var ctx = document.getElementById('radarChart').getContext('2d');
    var table = $('#trials').DataTable();
    var selectedChoice = null;

    new Chart(ctx, {
        type: 'radar',
        data: window.data,
        options: {}
    });

    $('.dropdown-menu').on('click', 'div', function selectItem () {
        selectedChoice = $(this).text().trim();

        table.draw();
    });

    $.fn.dataTable.ext.search.push(
        function testRow (settings, rowContent) {
            var date = new Date();
            var startDate = moment(rowContent[4], 'MM-DD-YYYY');
            var endDate = moment(rowContent[5], 'MM-DD-YYYY');

            switch (selectedChoice) {
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
