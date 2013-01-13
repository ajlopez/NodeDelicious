
var simpledelicious = require('..');

exports['getDates'] = function (test) {
    test.expect(5);

    simpledelicious.getDates(null, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        test.ok(data);
        test.ok(data.dates);
        test.ok(data.dates.date);
        test.ok(Array.isArray(data.dates.date));
        test.ok(data.dates.date.length > 10);
        test.done();
    });
};

exports['getDates for nodejs tag'] = function (test) {
    test.expect(5);

    simpledelicious.getDates('nodejs', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        test.ok(data);
        test.ok(data.dates);
        test.ok(data.dates.date);
        test.ok(Array.isArray(data.dates.date));
        test.ok(data.dates.date.length > 10);
        test.done();
    });
};
