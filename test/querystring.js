
'use strict'

var simpledelicious = require('..').complete();

exports['add to query string'] = function (test) {
    var query = '';
    query = simpledelicious.addToQueryString(query, 'tag', 'nodejs');
    test.equal(query, '?tag=nodejs');
    query = simpledelicious.addToQueryString(query, 'fromdt', '2012-12-01');
    test.equal(query, '?tag=nodejs&fromdt=2012-12-01');
    test.done();
};

