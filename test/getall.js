
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

exports['getAll nodejs 10 results'] = function (test) {
    test.expect(15);

    simpledelicious.getAll('nodejs', { results: 10 }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        test.ok(data);
        test.ok(data.posts);
        test.ok(data.posts.post);
        test.ok(Array.isArray(data.posts.post));
        test.equal(data.posts.post.length, 10);

        data.posts.post.forEach(function (post) {
            test.ok(post.$.tag.indexOf('nodejs') >=0);
        });

        test.done();
    });
};

exports['getAll nodejs 10 results start 20'] = function (test) {
    test.expect(5);

    simpledelicious.getAll('nodejs', { results: 10, start: 20 }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        test.ok(data);
        test.ok(data.posts);
        test.ok(data.posts.post);
        test.ok(Array.isArray(data.posts.post));
        test.equal(data.posts.post.length, 10);
        test.done();
    });
};
exports['getAll invalid from date'] = function (test) {
    test.throws(function () { simpledelicious.getAll('nodejs', { fromDate: '2012-12-32' }, function (err, data) { }); },
        function (err) {
            test.equal(err, "invalid from date");
            test.done();
            return true;
        }
    );
};

exports['getAll invalid to date'] = function (test) {
    test.throws(function () { simpledelicious.getAll('nodejs', { toDate: '2012-12-32' }, function (err, data) { }); },
        function (err) {
            test.equal(err, "invalid to date");
            test.done();
            return true;
        }
    );
};

exports['getAll invalid date range'] = function (test) {
    test.throws(function () { simpledelicious.getAll('nodejs', { fromDate: '2012-12-01', toDate: '2011-12-01' }, function (err, data) { }); },
        function (err) {
            test.equal(err, "invalid date range");
            test.done();
            return true;
        }
    );
};