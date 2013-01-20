
'use strict';

var simpledelicious = require('../..'),
    simpleargs = require('simpleargs');

simpleargs.define('fd', 'from', null, 'from start of date')
    .define('td', 'to', null, 'to end of date')
    .define('st', 'start', null, 'starting item')
    .define('re', 'results', null, 'max item count')
    .define('s', 'search', null, 'tag to search')
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

function found(word, post)
{
/*
    if (post.href.indexOf(word) >= 0)
        return true;
    if (post.description.indexOf(word) >= 0)
        return true;
*/
    var tag = ' ' + post.tag + ' ';

    if (tag.indexOf(' ' + word + ' ') >= 0)
        return true;

    return false;
}

simpledelicious.getAllPosts(tag, options, function (err, data) {
    if (err) {
        console.log(err);
        return;
    }

    if (data.result)
        console.log(data.result.$.code);
    else if (data.posts)
        data.posts.post.forEach(function (post) {
            if (args.search && !found(args.search, post.$))
                return;
                
            console.log(post.$.description);
            console.log(post.$.href);
            console.log(post.$.tag);
            console.log(post.$.time);
            console.log();
        });
});