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

TBD
## Development

```
git clone git://github.com/ajlopez/NodeDelicious.git
cd NodeDelicious
npm install
npm test
```

## Samples

- [Get All Links](https://github.com/ajlopez/NodeDelicious/tree/master/samples/getall): Get all links of a tag, with
optional date range.

## References

- [Developing for Delicious](https://delicious.com/developers)

## API

The library uses v1 Delicious API described at [Developing for Delicious](https://delicious.com/developers). 

## Inception

After the second big rewrite of Delicious site, I found that the pagination of my links were thrown away. I used
Delicious not as a feed, but as an archive and reference, so it's important to me to have easy access to old tagged items.
Apparently, the only way to have date range is using API v1: Delicious feeds doesn't have filter by date range, AFAIK.

## To do

TBD ;-)

## Contribution

Feel free to [file issues](https://github.com/ajlopez/NodeDelicious) and submit
[pull requests](https://github.com/ajlopez/NodeDelicious/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

