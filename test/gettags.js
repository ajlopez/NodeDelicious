
var simpledelicious = require('..');

exports['getTags'] = function (test) {
    test.expect(7);

    simpledelicious.getTags(function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        test.ok(data);
        test.ok(data.tags);
        test.ok(data.tags.tag);
        test.ok(Array.isArray(data.tags.tag));
        test.ok(data.tags.tag.length > 10);
        test.ok(data.tags.tag[0].$.count);
        test.ok(data.tags.tag[0].$.tag);
        test.done();
    });
};

