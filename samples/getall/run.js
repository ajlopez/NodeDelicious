
var simpledelicious = require('../..'),
    simpleargs = require('simpleargs');

simpleargs.define('f', 'from', null, 'from date')
    .defineValue('tag', null, 'tag');

var args = simpleargs.process(process.argv);

console.dir(args);

var tag = args.tag;
var options = { };

if (args.from)
    options.fromDate = args.from + 'T00:00:00Z';

simpledelicious.getAll(tag, options, function (err, data) {
    if (err) {
        console.log(err);
        return;
    }

    data.posts.post.forEach(function (post) {
        console.log(post.$.description);
        console.log(post.$.href);
        console.log(post.$.tag);
        console.log(post.$.time);
        console.log();
    });
});