# untis-school-closure-api
This API returns the end of school for a specific class. This feature can be e.g. used for the ios shortcuts app.

_This README will be extended._

## Getting Started for developement

First thing you need to do is install dependencies:
```
$ npm install
```

Then you can run the the API in development mode (watching for changes) with:
```
$ npm start
```

## Configure project
Open the _./src/config/config.yaml file and change the values for Untis to fit your school. 
For this project I used the _node-untis_ library from @XY. Here is a short excerpt from your documentation:

> First you have to get your school id and your server. You can find your school id and your server by going to webuntis.com and then searching for your school. After being redirected to your school web page you can see your school id and your server by looking at the link: Example link: https://mese.webuntis.com/WebUntis/?school=htbla_kaindorf#/basic/main the server is the word before ".webuntis.com", so in this example: mese the school is the word after "?school=".
> - "untis-node" [documentation](https://thecrether.github.io/untis-node/index.html#Documentation)

## Routes

** GET ** todays school end
```
{baseURL}/:classId
```

### Other

This project will follow the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome!