
var simpledelicious = require('..');

exports['getRecent tags'] = function (test) {
    test.expect(5);

    simpledelicious.getRecent(null, null, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        test.ok(data);
        test.ok(data.posts);
        test.ok(data.posts.post);
        test.ok(Array.isArray(data.posts.post));
        test.equal(data.posts.post.length, 15);
        test.done();
    });
};

exports['getRecent nodejs tags'] = function (test) {
    test.expect(5+15);

    simpledelicious.getRecent('nodejs', null, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        test.ok(data);
        test.ok(data.posts);
        test.ok(data.posts.post);
        test.ok(Array.isArray(data.posts.post));
        test.equal(data.posts.post.length, 15);

        data.posts.post.forEach(function (post) {
            test.ok(post.$.tag.indexOf('nodejs') >=0);
        });

        test.done();
    });
};

exports['getRecent 100 tags'] = function (test) {
    test.expect(5);

    simpledelicious.getRecent(null, { count: 100 }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        test.ok(data);
        test.ok(data.posts);
        test.ok(data.posts.post);
        test.ok(Array.isArray(data.posts.post));
        test.equal(data.posts.post.length, 100);

        test.done();
    });
};

exports['getRecent toblog 20 tags'] = function (test) {
    test.expect(5+20);

    simpledelicious.getRecent('toblog', { count: 20 }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        test.ok(data);
        test.ok(data.posts);
        test.ok(data.posts.post);
        test.ok(Array.isArray(data.posts.post));
        test.equal(data.posts.post.length, 20);

        data.posts.post.forEach(function (post) {
            test.ok(post.$.tag.indexOf('toblog') >=0);
        });

        test.done();
    });
};
