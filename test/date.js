
'use strict'

var simpledelicious = require('..').complete();

exports['dates are valid dates'] = function (test) {
    test.ok(simpledelicious.isValidDate('2012-12-01'));
    test.ok(simpledelicious.isValidDate('2012-12-31'));
    test.ok(simpledelicious.isValidDate('2012-01-01'));
    test.done();
};

exports['invalid date is invalid date'] = function (test) {
    test.equal(simpledelicious.isValidDate('2012-12-32'), false);
    test.done();
};

exports['date with bad format is invalid date'] = function (test) {
    test.equal(simpledelicious.isValidDate('2012/12/32'), false);
    test.equal(simpledelicious.isValidDate('2012-12-1'), false);
    test.equal(simpledelicious.isValidDate('2012-12-1T'), false);
    test.done();
};

exports['date/times are valid dates'] = function (test) {
    test.ok(simpledelicious.isValidDate('2012-12-01T00:00:00Z'));
    test.ok(simpledelicious.isValidDate('2012-12-31T20:00:00Z'));
    test.ok(simpledelicious.isValidDate('2012-01-01T23:59:59Z'));
    test.done();
};

exports['invalid date/time is invalid date'] = function (test) {
    test.equal(simpledelicious.isValidDate('2012-12-32T30:00:00Z'), false);
    test.done();
};

exports['date/time with bad format is invalid date'] = function (test) {
    test.equal(simpledelicious.isValidDate('2012/12/31T00:00:00Z'), false);
    test.equal(simpledelicious.isValidDate('2012-12-1T00:00:00Z'), false);
    test.equal(simpledelicious.isValidDate('2012-12-1T20:00:00Z'), false);
    test.equal(simpledelicious.isValidDate('2012-12-31T00:00Z'), false);
    test.equal(simpledelicious.isValidDate('2012-12-31T00/00Z'), false);
    test.equal(simpledelicious.isValidDate('2012-12-31A00:00:00M'), false);
    test.done();
};

exports['from date'] = function (test) {
    test.equal(simpledelicious.makeFromDate('2012-12-31'), '2012-12-31T00:00:00Z');
    test.equal(simpledelicious.makeFromDate('2012-01-31'), '2012-01-31T00:00:00Z');
    test.equal(simpledelicious.makeFromDate('2012-01-31T20:10:00Z'), '2012-01-31T20:10:00Z');
    test.done();
};

exports['to date'] = function (test) {
    test.equal(simpledelicious.makeToDate('2012-12-31'), '2012-12-31T23:59:59Z');
    test.equal(simpledelicious.makeToDate('2012-01-31'), '2012-01-31T23:59:59Z');
    test.equal(simpledelicious.makeToDate('2012-01-31T20:10:00Z'), '2012-01-31T20:10:00Z');
    test.done();
};

