(function patient () {
    'use strict';

    var fakeData = {
        aa: 100,
        bb: 70,
        cc: 75,
        dd: 0,
        ee: 40,
        ff: 50,
        gg: 0
    };

    var config = {
        type: 'line',
        data: {
            labels: [
                '01/01/2015 20:00',
                '01/02/2015 21:00',
                '01/03/2015 22:00',
                '01/04/2015 23:00',
                '01/05/2015 03:00',
                '01/06/2015 10:00',
                '01/07/2015 04:00'
            ],
            datasets: [
                {
                    label: '% Time left until daily survey expired',
                    data: [
                        fakeData.aa,
                        fakeData.bb,
                        fakeData.cc,
                        fakeData.dd,
                        fakeData.ee,
                        fakeData.ff,
                        fakeData.gg
                    ]
                }
            ]
        },
        options: {
            scales: {
                xAxes: [
                    {
                        type: 'time',
                        display: true,
                        time: {
                            format: 'MMDDYYYY HHmm',
                            round: 'day'
                        },
                        scaleLabel: {
                            show: true,
                            labelString: ''
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            show: true,
                            labelString: '% Time Left'
                        }
                    }
                ]
            },
            elements: {
                line: {
                    tension: 0.3
                }
            }
        }
    };

    var ctx = document.getElementById('complianceChart').getContext('2d');

    $('#calendar').fullCalendar({
        defaultView: 'basicWeek',
        allDayDefault: true,
        contentHeight: 'auto',
        events: window.data
    });

    new Chart(ctx, config);
}());
