
'use strict';

var https = require('https'),
    xml2js = require('xml2js');

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
    var parser = new xml2js.Parser();

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

            parser.parseString(buffer, function (err, data) { cb(err, data) });
        });
    });

    req.end();
}

// It's not valid proof
// It accepts 2012-06-30
// See http://stackoverflow.com/questions/2587345/javascript-date-parse

function isValidDate(date) {
    if (!date)
        return false;
    if (date.length === 10) { // date
        if (date[4] !== '-' || date[7] !== '-')
            return false;
        var parts = date.match(/(\d+)/g);
        if (parts.length !== 3)
            return false;
        if (parts[0].length !== 4 || parts[1].length !== 2 || parts[2].length !== 2)
            return false;
    }
    else if (date.length === 20) { // date/time
    }
    else
        return false;

    try {
        var value = Date.parse(date);
        return !Number.isNaN(value);
    }
    catch (err) {
        return false;
    }
}

function getAll(tags, options, cb) {
    var path = "/v1/posts/all?tag=" + makeTags(tags);

    if (options.fromDate)
        path += '&fromdt=' + options.fromDate;

    if (options.toDate)
        path += '&todt=' + options.toDate;

    getData(path, cb);
};

module.exports = {
    getAll: getAll,
    // for testing purpose
    complete: function () {
        this.isValidDate = isValidDate;
        return this;
    }
};

