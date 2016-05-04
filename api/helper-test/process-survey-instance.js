'use strict';

const test = require('ava');
const processSurveyInstance = require('../helper/process-survey-instance');

test('when there is a survey', (t) => {
    const value = [
        {
            questionTemplateId: 1,
            questionType: 'one',
            questionText: 'two',
            qoid: 2,
            optionText: 'three'
        }
    ];
    const expected = {
        quesID: 1,
        questionType: 'one',
        questionText: 'two',
        answerOptions: [
            {
                answerID: 2,
                answerText: 'three'
            }
        ]
    };

    t.deepEqual(processSurveyInstance(value), expected, 'it should process correctly');
});
