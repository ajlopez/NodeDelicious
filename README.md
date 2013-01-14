# Node Delicious

Library to access Delicious API.

## Installation

Via npm on Node:

```
npm install nodedelicious
```


## Usage

Reference in your program:

```js
var nodedelicious = require('nodedelicious');
```

### Authentication

The library uses these environment variables:
- DELICIOUS_USER
- DELICIOUS_PASSWORD

You must set them with the values of your Delicious account.

### Date Formats

The date format is `YYYY-MM-DD`. You can specify a datestamp using the format `YYYY-MM-DDTHH:MM:SSZ`.
Requires a LITERAL “T” and “Z” like in ISO8601 at 
http://www.cl.cam.ac.uk/~mgk25/iso—time.html for Example: "1984—09—01T14:21:31Z".

If you specify a from date, no datestamp, it will expanded to `YYYY-MM-DDT00:00:00Z`. A to date will
be expanded to `YYYY-MM-DDT23:59:59Z`.

The library validates dates, before sending a request to the API endpoints.

### Get All Posts

```js
nodedelicious.getAllPosts(tag, options, function (err, data) { ... } );
```

`tag` is a string or a string array. It's optional.

`options` is an optional object with properties:
- `fromDate`: date or datestamp
- `toDate`: date or datestamp
- `start`: count of links to be skipped
- `results`: max count of links to be retrieved

The data returned is the XML returned by Delicious API but converted to a JavaScript object using [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) conventions.

## Development

```
git clone git://github.com/ajlopez/NodeDelicious.git
cd NodeDelicious
npm install
npm test
```

The tests are written using Delicious data I have in my account. My account is not specified, but maybe some tests will fail because
the expected data was not found.

## Samples

- [Get All Posts](https://github.com/ajlopez/NodeDelicious/tree/master/samples/getallposts): Get all posts of a tag or
list of tags, with optional date range.

## References

- [Developing for Delicious](https://delicious.com/developers)

## API

The library uses v1 Delicious API described at [Developing for Delicious](https://delicious.com/developers). 

## Inception

After the second big rewrite of Delicious site (January 2013, second week), I found that the pagination of my links were thrown away. I used
Delicious not as a feed, but as an archive and reference, so it's important to me to have easy access to old tagged items.
Apparently, the only way to have date range is using API v1: Delicious feeds doesn't have filter by date range, AFAIK.

## To do

TBD ;-)

## Versions

0.0.1: Published, 2013-01-13, with getAllPost.
0.0.2: In master, under development. Added: getRecent, getDates, getTags.

## Contribution

Feel free to [file issues](https://github.com/ajlopez/NodeDelicious) and submit
[pull requests](https://github.com/ajlopez/NodeDelicious/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

