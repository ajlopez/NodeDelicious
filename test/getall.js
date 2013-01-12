
var simpledelicious = require('..');

exports['getAll nodejs from Dec 2012'] = function (test) {
    test.expect(4);

    simpledelicious.getAll('nodejs', { fromDate: '2012-12-01T00:00:00Z' }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        test.ok(data);
        test.ok(data.posts);
        test.ok(data.posts.post);
        test.ok(Array.isArray(data.posts.post));
        test.done();
    });
};
