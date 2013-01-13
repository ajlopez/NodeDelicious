
var simpledelicious = require('../..'),
    simpleargs = require('simpleargs');

simpleargs.define('f', 'from', null, 'from start of date')
    .define('t', 'to', null, 'to end of date')
    .define('s', 'start', null, 'starting item')
    .define('r', 'results', null, 'max item count')
    .defineValue('tag', null, 'tag');

var args = simpleargs.process(process.argv);

var tag = args.tag;
var options = { };

if (args.from)
    options.fromDate = args.from;
if (args.to)
    options.toDate = args.to;
if (args.results)
    options.results = args.results;
if (args.start)
    options.start = args.start;

simpledelicious.getAll(tag, options, function (err, data) {
    if (err) {
        console.log(err);
        return;
    }

    if (data.result)
        console.log(data.result.$.code);
    else if (data.posts)
        data.posts.post.forEach(function (post) {
            console.log(post.$.description);
            console.log(post.$.href);
            console.log(post.$.tag);
            console.log(post.$.time);
            console.log();
        });
});