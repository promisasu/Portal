'use strict';

module.exports.trial = [
    {
        id: 2,
        name: 'Sickle Cell',
        description: 'Weekly Survey for Sickle Cell Disease pain',
        IRBID: 'scd01',
        IRBStart: '2015-11-09 02:29:38',
        IRBEnd: '2016-11-09 02:29:38',
        targetCount: 100
    },
    {
        id: 3,
        name: 'Ortho Post Op',
        description: 'Weekly and Daily survey for Ortho Post Operative pain',
        IRBID: 'opo1',
        IRBStart: '2015-11-09 02:29:38',
        IRBEnd: '2016-11-09 02:29:38',
        targetCount: 100
    },
    {
        id: 4,
        name: 'Pain Post Op',
        description: 'Weekly and Daily survey for Post Operative pain',
        IRBID: 'ppo1',
        IRBStart: '2015-11-09 02:29:38',
        IRBEnd: '2016-11-09 02:29:38',
        targetCount: 100
    }
];

module.exports.surveyTemplate = [
    {
        id: 1,
        name: 'Sickle Cell Weekly Survey'
    },
    {
        id: 2,
        name: 'Post Op Weekly Survey'
    },
    {
        id: 3,
        name: 'Post Op Pain Reporting Survey'
    }
];

module.exports.stage = [
    {
        id: 1,
        name: 'sickle cell weekly',
        trialId: 2
    },
    {
        id: 2,
        name: 'ortho pre-operative',
        trialId: 3
    },
    {
        id: 3,
        name: 'ortho post op weekly and daily',
        trialId: 3
    },
    {
        id: 4,
        name: 'ortho post op pain reporting weekly',
        trialId: 3
    },
    {
        id: 5,
        name: 'pain post op weekly',
        trialId: 4
    },
    {
        id: 6,
        name: 'exit stage'
    }
];

module.exports.questionTemplate = [
    {
        id: 1,
        questionText: 'In the past 7 days, I had trouble sleeping when I had pain.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 2,
        questionText: 'In the past 7 days, I had trouble doing schoolwork when I had pain.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 3,
        questionText: 'In the past 7 days, It was hard for me to pay attention when I had pain.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 4,
        questionText: 'In the past 7 days, It was hard for me to run when I had pain.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 5,
        questionText: 'In the past 7 days, It was hard for me to walk one block when I had pain.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 6,
        questionText: 'In the past 7 days, It was hard to have fun when I had pain.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 7,
        questionText: 'In the past 7 days, It was hard to stay standing when I had pain.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 8,
        questionText: 'In the past 7 days, I could do sports and exercise that others kids my age could do.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 9,
        questionText: 'In the past 7 days, I could get up from the floor.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 10,
        questionText: 'In the past 7 days, I could keep up when I played with other kids.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 11,
        questionText: 'In the past 7 days, I could move my legs.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 12,
        questionText: 'In the past 7 days, I could stand up by myself.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 13,
        questionText: 'In the past 7 days, I could stand up on my tiptoes.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 14,
        questionText: 'In the past 7 days, I could walk up stairs without holding on to anything.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 15,
        questionText: 'In the past 7 days, I have been physically able to do the activities I enjoy most.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 16,
        questionText: 'In the past 7 days, being tired made it hard for me to play or go out with my friends as much as I\'d like.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 17,
        questionText: 'In the past 7 days, I felt weak.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 18,
        questionText: 'In the past 7 days, I got tired easily.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 19,
        questionText: 'In the past 7 days, being tired made it hard for me to keep up with my schoolwork.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 20,
        questionText: 'In the past 7 days, I had trouble starting things because I was too tired.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 21,
        questionText: 'In the past 7 days, I was so tired it was hard for me to pay attention.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 22,
        questionText: 'In the past 7 days, I was too tired to do sport or exercise.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 23,
        questionText: 'In the past 7 days, I was too tired to do things outside.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 24,
        questionText: 'In the past 7 days, I was too tired to enjoy the things I like to do.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 25,
        questionText: 'In the past 7 days, I felt nervous.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 26,
        questionText: 'In the past 7 days, I felt worried.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 27,
        questionText: 'In the past 7 days, I felt like something awful might happen.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 28,
        questionText: 'In the past 7 days, I was afraid that I would make mistakes.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 29,
        questionText: 'In the past 7 days, I worried about what could happen to me.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 30,
        questionText: 'In the past 7 days, I worried when I went to bed at night.',
        questionType: 'multiChoiceSingleAnswer'
    },
    {
        id: 31,
        questionText: 'Please indicate your body pain',
        questionType: 'bodyPain'
    }
];

module.exports.questionOption = [
    {
        id: 1,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 1
    },
    {
        id: 2,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 1
    },
    {
        id: 3,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 1
    },
    {
        id: 4,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 1
    },
    {
        id: 5,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 1
    },
    {
        id: 6,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 2
    },
    {
        id: 7,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 2
    },
    {
        id: 8,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 2
    },
    {
        id: 9,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 2
    },
    {
        id: 10,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 2
    },
    {
        id: 11,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 3
    },
    {
        id: 12,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 3
    },
    {
        id: 13,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 3
    },
    {
        id: 14,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 3
    },
    {
        id: 15,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 3
    },
    {
        id: 16,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 4
    },
    {
        id: 17,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 4
    },
    {
        id: 18,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 4
    },
    {
        id: 19,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 4
    },
    {
        id: 20,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 4
    },
    {
        id: 21,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 5
    },
    {
        id: 22,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 5
    },
    {
        id: 23,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 5
    },
    {
        id: 24,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 5
    },
    {
        id: 25,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 5
    },
    {
        id: 26,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 6
    },
    {
        id: 27,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 6
    },
    {
        id: 28,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 6
    },
    {
        id: 29,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 6
    },
    {
        id: 30,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 6
    },
    {
        id: 31,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 7
    },
    {
        id: 32,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 7
    },
    {
        id: 33,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 7
    },
    {
        id: 34,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 7
    },
    {
        id: 35,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 7
    },
    {
        id: 36,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 16
    },
    {
        id: 37,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 16
    },
    {
        id: 38,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 16
    },
    {
        id: 39,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 16
    },
    {
        id: 40,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 16
    },
    {
        id: 41,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 17
    },
    {
        id: 42,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 17
    },
    {
        id: 43,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 17
    },
    {
        id: 44,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 17
    },
    {
        id: 45,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 17
    },
    {
        id: 46,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 18
    },
    {
        id: 47,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 18
    },
    {
        id: 48,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 18
    },
    {
        id: 49,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 18
    },
    {
        id: 50,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 18
    },
    {
        id: 51,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 19
    },
    {
        id: 52,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 19
    },
    {
        id: 53,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 19
    },
    {
        id: 54,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 19
    },
    {
        id: 55,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 19
    },
    {
        id: 56,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 20
    },
    {
        id: 57,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 20
    },
    {
        id: 58,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 20
    },
    {
        id: 59,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 20
    },
    {
        id: 60,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 20
    },
    {
        id: 61,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 21
    },
    {
        id: 62,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 21
    },
    {
        id: 63,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 21
    },
    {
        id: 64,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 21
    },
    {
        id: 65,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 21
    },
    {
        id: 66,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 22
    },
    {
        id: 67,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 22
    },
    {
        id: 68,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 22
    },
    {
        id: 69,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 22
    },
    {
        id: 70,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 22
    },
    {
        id: 71,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 23
    },
    {
        id: 72,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 23
    },
    {
        id: 73,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 23
    },
    {
        id: 74,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 23
    },
    {
        id: 75,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 23
    },
    {
        id: 76,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 24
    },
    {
        id: 77,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 24
    },
    {
        id: 78,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 24
    },
    {
        id: 79,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 24
    },
    {
        id: 80,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 24
    },
    {
        id: 81,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 25
    },
    {
        id: 82,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 25
    },
    {
        id: 83,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 25
    },
    {
        id: 84,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 25
    },
    {
        id: 85,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 25
    },
    {
        id: 86,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 26
    },
    {
        id: 87,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 26
    },
    {
        id: 88,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 26
    },
    {
        id: 89,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 26
    },
    {
        id: 90,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 26
    },
    {
        id: 91,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 27
    },
    {
        id: 92,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 27
    },
    {
        id: 93,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 27
    },
    {
        id: 94,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 27
    },
    {
        id: 95,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 27
    },
    {
        id: 96,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 28
    },
    {
        id: 97,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 28
    },
    {
        id: 98,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 28
    },
    {
        id: 99,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 28
    },
    {
        id: 100,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 28
    },
    {
        id: 101,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 29
    },
    {
        id: 102,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 29
    },
    {
        id: 103,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 29
    },
    {
        id: 104,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 29
    },
    {
        id: 105,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 29
    },
    {
        id: 106,
        optionText: 'Never',
        order: 1,
        questionTemplateId: 30
    },
    {
        id: 107,
        optionText: 'Almost Never',
        order: 2,
        questionTemplateId: 30
    },
    {
        id: 108,
        optionText: 'Sometimes',
        order: 3,
        questionTemplateId: 30
    },
    {
        id: 109,
        optionText: 'Often',
        order: 4,
        questionTemplateId: 30
    },
    {
        id: 110,
        optionText: 'Almost Always',
        order: 5,
        questionTemplateId: 30
    },
    {
        id: 111,
        optionText: 'With no trouble',
        order: 1,
        questionTemplateId: 8
    },
    {
        id: 112,
        optionText: 'With a little trouble',
        order: 2,
        questionTemplateId: 8
    },
    {
        id: 113,
        optionText: 'With some trouble',
        order: 3,
        questionTemplateId: 8
    },
    {
        id: 114,
        optionText: 'With a lot of trouble',
        order: 4,
        questionTemplateId: 8
    },
    {
        id: 115,
        optionText: 'Not able to do',
        order: 5,
        questionTemplateId: 8
    },
    {
        id: 116,
        optionText: 'With no trouble',
        order: 1,
        questionTemplateId: 9
    },
    {
        id: 117,
        optionText: 'With a little trouble',
        order: 2,
        questionTemplateId: 9
    },
    {
        id: 118,
        optionText: 'With some trouble',
        order: 3,
        questionTemplateId: 9
    },
    {
        id: 119,
        optionText: 'With a lot of trouble',
        order: 4,
        questionTemplateId: 9
    },
    {
        id: 120,
        optionText: 'Not able to do',
        order: 5,
        questionTemplateId: 9
    },
    {
        id: 121,
        optionText: 'With no trouble',
        order: 1,
        questionTemplateId: 10
    },
    {
        id: 122,
        optionText: 'With a little trouble',
        order: 2,
        questionTemplateId: 10
    },
    {
        id: 123,
        optionText: 'With some trouble',
        order: 3,
        questionTemplateId: 10
    },
    {
        id: 124,
        optionText: 'With a lot of trouble',
        order: 4,
        questionTemplateId: 10
    },
    {
        id: 125,
        optionText: 'Not able to do',
        order: 5,
        questionTemplateId: 10
    },
    {
        id: 126,
        optionText: 'With no trouble',
        order: 1,
        questionTemplateId: 11
    },
    {
        id: 127,
        optionText: 'With a little trouble',
        order: 2,
        questionTemplateId: 11
    },
    {
        id: 128,
        optionText: 'With some trouble',
        order: 3,
        questionTemplateId: 11
    },
    {
        id: 129,
        optionText: 'With a lot of trouble',
        order: 4,
        questionTemplateId: 11
    },
    {
        id: 130,
        optionText: 'Not able to do',
        order: 5,
        questionTemplateId: 11
    },
    {
        id: 131,
        optionText: 'With no trouble',
        order: 1,
        questionTemplateId: 12
    },
    {
        id: 132,
        optionText: 'With a little trouble',
        order: 2,
        questionTemplateId: 12
    },
    {
        id: 133,
        optionText: 'With some trouble',
        order: 3,
        questionTemplateId: 12
    },
    {
        id: 134,
        optionText: 'With a lot of trouble',
        order: 4,
        questionTemplateId: 12
    },
    {
        id: 135,
        optionText: 'Not able to do',
        order: 5,
        questionTemplateId: 12
    },
    {
        id: 136,
        optionText: 'With no trouble',
        order: 1,
        questionTemplateId: 13
    },
    {
        id: 137,
        optionText: 'With a little trouble',
        order: 2,
        questionTemplateId: 13
    },
    {
        id: 138,
        optionText: 'With some trouble',
        order: 3,
        questionTemplateId: 13
    },
    {
        id: 139,
        optionText: 'With a lot of trouble',
        order: 4,
        questionTemplateId: 13
    },
    {
        id: 140,
        optionText: 'Not able to do',
        order: 5,
        questionTemplateId: 13
    },
    {
        id: 141,
        optionText: 'With no trouble',
        order: 1,
        questionTemplateId: 14
    },
    {
        id: 142,
        optionText: 'With a little trouble',
        order: 2,
        questionTemplateId: 14
    },
    {
        id: 143,
        optionText: 'With some trouble',
        order: 3,
        questionTemplateId: 14
    },
    {
        id: 144,
        optionText: 'With a lot of trouble',
        order: 4,
        questionTemplateId: 14
    },
    {
        id: 145,
        optionText: 'Not able to do',
        order: 5,
        questionTemplateId: 14
    },
    {
        id: 146,
        optionText: 'With no trouble',
        order: 1,
        questionTemplateId: 15
    },
    {
        id: 147,
        optionText: 'With a little trouble',
        order: 2,
        questionTemplateId: 15
    },
    {
        id: 148,
        optionText: 'With some trouble',
        order: 3,
        questionTemplateId: 15
    },
    {
        id: 149,
        optionText: 'With a lot of trouble',
        order: 4,
        questionTemplateId: 15
    },
    {
        id: 150,
        optionText: 'Not able to do',
        order: 5,
        questionTemplateId: 15
    },
    {
        id: 151,
        optionText: '1',
        order: 1,
        questionTemplateId: 31
    },
    {
        id: 152,
        optionText: '2',
        order: 2,
        questionTemplateId: 31
    },
    {
        id: 153,
        optionText: '3',
        order: 3,
        questionTemplateId: 31
    },
    {
        id: 154,
        optionText: '4',
        order: 4,
        questionTemplateId: 31
    },
    {
        id: 155,
        optionText: '5',
        order: 5,
        questionTemplateId: 31
    },
    {
        id: 156,
        optionText: '6',
        order: 6,
        questionTemplateId: 31
    },
    {
        id: 157,
        optionText: '7',
        order: 7,
        questionTemplateId: 31
    },
    {
        id: 158,
        optionText: '8',
        order: 8,
        questionTemplateId: 31
    },
    {
        id: 159,
        optionText: '9',
        order: 9,
        questionTemplateId: 31
    },
    {
        id: 160,
        optionText: '10',
        order: 10,
        questionTemplateId: 31
    },
    {
        id: 161,
        optionText: 'front head',
        order: 11,
        questionTemplateId: 31
    },
    {
        id: 162,
        optionText: 'back head',
        order: 12,
        questionTemplateId: 31
    },
    {
        id: 163,
        optionText: 'front left leg',
        order: 13,
        questionTemplateId: 31
    },
    {
        id: 164,
        optionText: 'back left leg',
        order: 14,
        questionTemplateId: 31
    },
    {
        id: 165,
        optionText: 'front right leg',
        order: 15,
        questionTemplateId: 31
    },
    {
        id: 166,
        optionText: 'back right leg',
        order: 16,
        questionTemplateId: 31
    },
    {
        id: 167,
        optionText: 'front chest',
        order: 17,
        questionTemplateId: 31
    },
    {
        id: 168,
        optionText: 'front abdominal',
        order: 18,
        questionTemplateId: 31
    },
    {
        id: 169,
        optionText: 'back',
        order: 19,
        questionTemplateId: 31
    },
    {
        id: 170,
        optionText: 'lower back',
        order: 20,
        questionTemplateId: 31
    },
    {
        id: 171,
        optionText: 'front left arm',
        order: 21,
        questionTemplateId: 31
    },
    {
        id: 172,
        optionText: 'back left arm',
        order: 22,
        questionTemplateId: 31
    },
    {
        id: 173,
        optionText: 'front right arm',
        order: 23,
        questionTemplateId: 31
    },
    {
        id: 174,
        optionText: 'back right arm',
        order: 24,
        questionTemplateId: 31
    },
    {
        id: 175,
        optionText: 'No Pain',
        order: 25,
        questionTemplateId: 31
    },
    {
        id: 176,
        optionText: '0',
        order: 26,
        questionTemplateId: 31
    }
];

module.exports.joinSurveysAndQuestions = [
    {
        questionOrder: 1,
        questionTemplateId: 31,
        surveyTemplateId: 1
    },
    {
        questionOrder: 2,
        questionTemplateId: 1,
        surveyTemplateId: 1
    },
    {
        questionOrder: 3,
        questionTemplateId: 2,
        surveyTemplateId: 1
    },
    {
        questionOrder: 4,
        questionTemplateId: 3,
        surveyTemplateId: 1
    },
    {
        questionOrder: 5,
        questionTemplateId: 4,
        surveyTemplateId: 1
    },
    {
        questionOrder: 6,
        questionTemplateId: 5,
        surveyTemplateId: 1
    },
    {
        questionOrder: 7,
        questionTemplateId: 6,
        surveyTemplateId: 1
    },
    {
        questionOrder: 8,
        questionTemplateId: 8,
        surveyTemplateId: 1
    },
    {
        questionOrder: 9,
        questionTemplateId: 9,
        surveyTemplateId: 1
    },
    {
        questionOrder: 10,
        questionTemplateId: 10,
        surveyTemplateId: 1
    },
    {
        questionOrder: 11,
        questionTemplateId: 12,
        surveyTemplateId: 1
    },
    {
        questionOrder: 12,
        questionTemplateId: 14,
        surveyTemplateId: 1
    },
    {
        questionOrder: 13,
        questionTemplateId: 15,
        surveyTemplateId: 1
    },
    {
        questionOrder: 14,
        questionTemplateId: 16,
        surveyTemplateId: 1
    },
    {
        questionOrder: 15,
        questionTemplateId: 19,
        surveyTemplateId: 1
    },
    {
        questionOrder: 16,
        questionTemplateId: 20,
        surveyTemplateId: 1
    },
    {
        questionOrder: 17,
        questionTemplateId: 21,
        surveyTemplateId: 1
    },
    {
        questionOrder: 18,
        questionTemplateId: 22,
        surveyTemplateId: 1
    },
    {
        questionOrder: 19,
        questionTemplateId: 23,
        surveyTemplateId: 1
    },
    {
        questionOrder: 20,
        questionTemplateId: 25,
        surveyTemplateId: 1
    },
    {
        questionOrder: 21,
        questionTemplateId: 26,
        surveyTemplateId: 1
    },
    {
        questionOrder: 22,
        questionTemplateId: 27,
        surveyTemplateId: 1
    },
    {
        questionOrder: 23,
        questionTemplateId: 28,
        surveyTemplateId: 1
    },
    {
        questionOrder: 24,
        questionTemplateId: 29,
        surveyTemplateId: 1
    },
    {
        questionOrder: 25,
        questionTemplateId: 30,
        surveyTemplateId: 1
    },
    {
        questionOrder: 1,
        questionTemplateId: 31,
        surveyTemplateId: 2
    },
    {
        questionOrder: 2,
        questionTemplateId: 1,
        surveyTemplateId: 2
    },
    {
        questionOrder: 3,
        questionTemplateId: 2,
        surveyTemplateId: 2
    },
    {
        questionOrder: 4,
        questionTemplateId: 3,
        surveyTemplateId: 2
    },
    {
        questionOrder: 5,
        questionTemplateId: 4,
        surveyTemplateId: 2
    },
    {
        questionOrder: 6,
        questionTemplateId: 5,
        surveyTemplateId: 2
    },
    {
        questionOrder: 7,
        questionTemplateId: 6,
        surveyTemplateId: 2
    },
    {
        questionOrder: 8,
        questionTemplateId: 8,
        surveyTemplateId: 2
    },
    {
        questionOrder: 9,
        questionTemplateId: 9,
        surveyTemplateId: 2
    },
    {
        questionOrder: 10,
        questionTemplateId: 10,
        surveyTemplateId: 2
    },
    {
        questionOrder: 11,
        questionTemplateId: 12,
        surveyTemplateId: 2
    },
    {
        questionOrder: 12,
        questionTemplateId: 14,
        surveyTemplateId: 2
    },
    {
        questionOrder: 13,
        questionTemplateId: 15,
        surveyTemplateId: 2
    },
    {
        questionOrder: 14,
        questionTemplateId: 16,
        surveyTemplateId: 2
    },
    {
        questionOrder: 15,
        questionTemplateId: 19,
        surveyTemplateId: 2
    },
    {
        questionOrder: 16,
        questionTemplateId: 20,
        surveyTemplateId: 2
    },
    {
        questionOrder: 17,
        questionTemplateId: 21,
        surveyTemplateId: 2
    },
    {
        questionOrder: 18,
        questionTemplateId: 22,
        surveyTemplateId: 2
    },
    {
        questionOrder: 19,
        questionTemplateId: 23,
        surveyTemplateId: 2
    },
    {
        questionOrder: 20,
        questionTemplateId: 25,
        surveyTemplateId: 2
    },
    {
        questionOrder: 21,
        questionTemplateId: 26,
        surveyTemplateId: 2
    },
    {
        questionOrder: 22,
        questionTemplateId: 27,
        surveyTemplateId: 2
    },
    {
        questionOrder: 23,
        questionTemplateId: 28,
        surveyTemplateId: 2
    },
    {
        questionOrder: 24,
        questionTemplateId: 29,
        surveyTemplateId: 2
    },
    {
        questionOrder: 25,
        questionTemplateId: 30,
        surveyTemplateId: 2
    },
    {
        questionOrder: 1,
        questionTemplateId: 31,
        surveyTemplateId: 3
    }
];

module.exports.joinStagesAndSurveys = [
    {
        rule: 'weekly',
        surveyTemplateId: 1,
        stageId: 1,
        stagePriority: 0
    },
    {
        rule: 'once',
        surveyTemplateId: 2,
        stageId: 2,
        stagePriority: 0
    },
    {
        rule: 'weekly',
        surveyTemplateId: 2,
        stageId: 3,
        stagePriority: 0
    },
    {
        rule: 'daily',
        surveyTemplateId: 3,
        stageId: 3,
        stagePriority: 1
    },
    {
        rule: 'weekly',
        surveyTemplateId: 3,
        stageId: 4,
        stagePriority: 0
    },
    {
        rule: 'weekly',
        surveyTemplateId: 2,
        stageId: 5,
        stagePriority: 0
    },
    {
        rule: 'daily',
        surveyTemplateId: 3,
        stageId: 5,
        stagePriority: 1
    }
];

module.exports.joinCurrentAndNextStage = [
    {
        rule: 84,
        stageId: 1,
        nextStageId: 6
    },
    {
        rule: 35,
        stageId: 5,
        nextStageId: 6
    }
];
