
'use strict'

var simpledelicious = require('..').complete();

exports['short dates are valid dates'] = function (test) {
    test.ok(simpledelicious.isValidDate('2012-12-01'));
    test.ok(simpledelicious.isValidDate('2012-12-31'));
    test.ok(simpledelicious.isValidDate('2012-01-01'));
    test.done();
};

exports['invalid short date is invalid date'] = function (test) {
    test.equal(simpledelicious.isValidDate('2012-12-32'), false);
    test.done();
};

exports['short date with bad format is invalid date'] = function (test) {
    test.equal(simpledelicious.isValidDate('2012/12/32'), false);
    test.equal(simpledelicious.isValidDate('2012-12-1'), false);
    test.equal(simpledelicious.isValidDate('2012-12-1T'), false);
    test.done();
};
