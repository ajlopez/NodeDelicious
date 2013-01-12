
'use strict';

var https = require('https');

function makeOptions(path) {
    var options = {
        hostname: 'api.del.icio.us',
        port: 443,
        path: path,
        method: 'GET',
        auth: process.env.DELICIOUS_USER + ':' + process.env.DELICIOUS_PASSWORD
    };

    return options;
}

function makeTags(tags) {
    if (!Array.isArray(tags))
        return tags;

    var result = ''

    for (var n in tags) {
        var tag = tags[n];
        if (result)
            result += '+';
        result += tag;
    }

    return result;
}

function getData(path, cb) {
    var options = makeOptions(path);

    var req = https.request(options, function(res) {
        //console.log("statusCode: ", res.statusCode);
        //console.log("headers: ", res.headers);

        var buffer = '';

        res.on('data', function(d) {
            var text = d.toString();
            buffer += text;
        });

        res.on('err', function(err) {
            cb(err);
        });

        res.on('end', function(d) {
            if (d) {
                var text = d.toString();
                buffer += text;
            }

            cb(null, buffer);
        });
    });

    req.end();
}

function getAll(tags, options, cb) {
    var path = "/v1/posts/all?tag=" + makeTags(tags);

    if (options.fromDate)
        path += '&fromdt=' + options.fromDate;

    getData(path, cb);
};

exports.getAll = getAll;
