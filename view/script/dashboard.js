(function dashboard () {
    'use strict';

    var nameColumn = 0;
    var table = $('#trials').DataTable({order: [nameColumn, 'desc']});
    var strategy = filterStrategyFactory();

    $('.dropdown-menu').on('click', 'div', function selectItem () {
        var selectedChoice = $(this).text().trim();

        $('#statusDropdown').prop('value', selectedChoice);
        $('#statusDropdown').html(selectedChoice);
        table.draw();
    });

    /**
     * Strategy factory for generating trial status filters
     * @param {string} selectedChoice - Text name of filter
     * @returns {function(date, date)} a function to test if two dates fit a state description
     */
    function filterStrategyFactory (selectedChoice) {
        var today = new Date();

        switch (selectedChoice) {
            case 'Upcoming':
                return function selectUpcoming (startDate) {
                    return startDate > today;
                };
            case 'In Progress':
                return function selectInProgress (startDate, endDate) {
                    return today > startDate && today < endDate;
                };
            case 'Completed':
                return function selectCompleted (startDate, endDate) {
                    return endDate < today;
                };
            default:
                return function selectAll () {
                    return true;
                };
        }
    }

    $
    .fn
    .dataTable
    .ext
    .search
    .push(
        function testRow (settings, rowContent) {
            var startDate = moment(rowContent[3], 'MM-DD-YYYY');
            var endDate = moment(rowContent[4], 'MM-DD-YYYY');

            // compare today to dates to see if trial should be displayed
            return strategy(startDate, endDate);
        }
    );

    $('.dropdown-menu').on('click', 'div', function selectItem () {
        // update strategy
        strategy = filterStrategyFactory($(this).text().trim());

        // run filter
        table.draw();
    });
}());
