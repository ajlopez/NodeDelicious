# Get All Posts Sample

Retrieving all posts of a tag, with optional date range.

## Setup

Execute at command line:
```
npm install
```
You must define the environment variables:
- DELICIOUS_USER
- DELICIOUS_PASSWORD

with the values of your Delicious account.

## Run

With the command line:
```
node run <tag> [-fd|--from <date>] [-td|--to <date>] [-re|--results <results>] [-st|--start <start>]
```
The date format is `YYYY-MM-DD`. You can specify a datestamp using the format `YYYY-MM-DDTHH:MM:SSZ`.
Requires a LITERAL “T” and “Z” like in ISO8601 at 
http://www.cl.cam.ac.uk/~mgk25/iso—time.html for Example: "1984—09—01T14:21:31Z".
If you specify a from date, no datestamp, it will expanded to `YYYY-MM-DDT00:00:00Z`. A to date will
be expanded to `YYYY-MM-DDT23:59:59Z`.

`results` is the max number of items to be retrieved. `start` is the number of items to be skipped.

NOTE: there is a new flag
```
node run [-s|--search <tag>]
```
Apparently, when a tag is specified, the Delicious API returns the posts WITH THAT tag as FIRST TAG. So,
maybe you should use the `-s` options. Instead of
```
node run html5 -fd 2012-01-06
```
you should run
```
node run -s html5 -fd 2012-01-06
```

Examples:
```
node run html5
node run html5 -st 10
node run html5 -st 10 -re 20
node run infoq -fd 2012-12-01
node run nodejs -fd 2012-12-01 -td 2012-12-31
```
You can combine tags using `+`:
```
node run html5+canvas
```

A sample output:
```
Felix's Node.js Style Guide
http://nodeguide.com/style.html
nodejs  guideline  tutorial
2012-12-14T08:41:12Z

substack/stream-handbook · GitHub
https://github.com/substack/stream-handbook
nodejs  stream  tutorial
2012-12-13T23:20:05Z

Chris Granger - Anatomy of a knockout
http://www.chris-granger.com/2012/12/11/anatomy-of-a-knockout/
nodejs  knockout  javascript  clojure  clojurescript  gamedevelopment  video
2012-12-12T20:18:58Z

ci.testling.com
http://ci.testling.com/
nodejs  browser  ci  testing  npm
2012-12-12T16:16:26Z

NetEase/lordofpomelo · GitHub
https://github.com/NetEase/lordofpomelo
nodejs  gamedevelopment  example  mmorpg  canvas  html5
2012-12-12T08:35:05Z
```
