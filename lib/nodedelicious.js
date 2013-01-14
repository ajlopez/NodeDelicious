
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
    var parts;

    if (!date)
        return false;
    if (date.length === 10) { // date
        if (date[4] !== '-' || date[7] !== '-')
            return false;
        parts = date.match(/(\d+)/g);
        if (parts.length !== 3)
            return false;
        if (parts[0].length !== 4 || parts[1].length !== 2 || parts[2].length !== 2)
            return false;
    }
    else if (date.length === 20) { // date/time
        if (date[4] !== '-' || date[7] !== '-' || date[10] !== 'T' || date[13] !== ':' || date[16] !== ':' || date[19] !== 'Z')
            return false;
        parts = date.match(/(\d+)/g);
        if (parts.length !== 6)
            return false;
        if (parts[0].length !== 4 || parts[1].length !== 2 || parts[2].length !== 2 || parts[3].length !== 2 || parts[4].length !== 2 || parts[5].length !== 2)
            return false;
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

function makeFromDate(date) {
    if (date.length === 10)
        return date + 'T00:00:00Z';
    return date;
}

function makeToDate(date) {
    if (date.length === 10)
        return date + 'T23:59:59Z';
    return date;
}

function addToQueryString(query, name, value)
{
    if (query)
        query += '&';
    else
        query += '?';

    query += name + '=' + value;

    return query;
}

function getAllPosts(tags, options, cb) {
    options = options || { };

    var path = "/v1/posts/all";

    var query = '';

    if (tags)
        query = addToQueryString(query, 'tag',makeTags(tags));

    if (options.fromDate) {
        if (!isValidDate(options.fromDate))
            throw "invalid from date";
        query = addToQueryString(query, 'fromdt', makeFromDate(options.fromDate));
    }

    if (options.results)
        query = addToQueryString(query, 'results', options.results);

    if (options.start)
        query = addToQueryString(query, 'start', options.start);

    if (options.toDate) {
        if (!isValidDate(options.fromDate))
            throw "invalid to date";
        query = addToQueryString(query, 'todt', makeToDate(options.toDate));
    }

    if (query)
        path += query;

    if (options.fromDate && options.toDate && options.fromDate > options.toDate)
        throw "invalid date range";

    getData(path, cb);
};


function getRecent(tags, options, cb) {
    options = options || { };

    var path = "/v1/posts/recent";

    var query = '';

    if (tags)
        query = addToQueryString(query, 'tag',makeTags(tags));

    if (options.count)
        query = addToQueryString(query, 'count', options.count);

    if (query)
        path += query;

    getData(path, cb);
};

function getDates(tags, cb) {
    var path = "/v1/posts/dates";

    var query = '';

    if (tags)
        query = addToQueryString(query, 'tag', makeTags(tags));

    if (query)
        path += query;

    getData(path, cb);
};

function getTags(cb) {
    var path = "/v1/tags/get";

    getData(path, cb);
};

module.exports = {
    getAllPosts: getAllPosts,
    getRecent: getRecent,
    getDates: getDates,
    getTags: getTags,

    // for testing purpose
    complete: function () {
        this.isValidDate = isValidDate;
        this.makeFromDate = makeFromDate;
        this.makeToDate = makeToDate;
        this.addToQueryString = addToQueryString;
        return this;
    }
};

