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
> First you have to get your school name and your server. You can find your school name and your server by going to webuntis.com and then searching for your school. After being redirected to your school web page you can see your school id and your server by looking at the link: Example link: https://mese.webuntis.com/WebUntis/?school=htbla_kaindorf#/basic/main the server is the word before ".webuntis.com", so in this example: mese the school is the word after "?school=".
> - "untis-node" [documentation](https://thecrether.github.io/untis-node/index.html#Documentation)
**config.yaml example**
```
Server:
  - PORT: 80
Untis:
  - SERVER: "mese.webuntis.com"
  - SCHOOL: "Einstein-Gymnasium"
```

## Usage
This API is designed to use IOS-shortcuts to automatically mute a student's iPhone for the duration of the lesson. There are certainly many other ways to use the API.

Here is a suggestion of what a routine might look like that mutes the student's phone.
<img align="right" src="https://ibb.co/3h4JHYC">
_Routine is performed every day of the week five minutes before school starts._
  1. Retrieve content from `YOUR URL`
  2. Set variable "School end" to _contents of the URL_
  3. Do not disturb on until "end of school"


## Routes

### get todays schoolend
This route returns the schoolend for a specific class.

**URL** : `/schoolend/:classId`  
**Method** : `GET`  
**Data constraints**
  - URL: classId

#### Success Responses
**Condition** : Class id provided is valid and the class has lessons today.  
**Code** : `200 OK`  
**Content example** :  
Response will contain the end time of the last lesson of the class. It will be sent in 24h format and as raw content type.
```raw
12:00
```
#### Error Response
**Condition** : If class id is invalid, the class hasn't school today or there was an other error.  
**Code** : `400 BAD REQUEST`  
**Content example** :
```json
{
    "error": {
      "message": "Oops! There was an error when retrieving your timetable."
    }
}
```
### get all classes
This route returns the all classes of the school.

**URL** : `/classes`  
**Method** : `GET`  
**Data constraints**
  - none

#### Success Responses
**Condition** : School is defined and has classes.  
**Code** : `200 OK`  
**Content example** :  
Response will contain all classes of the school in json format.
```json
[{"id":2088,"name":"7a","longName":"7a","active":true,"teacher1":73,"teacher2":203},{"id":2093,"name":"7b","longName":"7b","active":true,"teacher1":99,"teacher2":139},{"id":2098,"name":"7c","longName":"7c","active":true,"teacher1":27,"teacher2":70},{"id":2103,"name":"7d","longName":"7d","active":true,"teacher1":36,"teacher2":72},{"id":2108,"name":"8a","longName":"8a","active":true,"teacher1":189,"teacher2":141},{"id":2113,"name":"8b","longName":"8b","active":true,"teacher1":44,"teacher2":77},{"id":2118,"name":"8c","longName":"8c","active":true,"teacher1":178,"teacher2":176},{"id":2123,"name":"8d","longName":"8d","active":true,"teacher1":25,"teacher2":63}]
```
#### Error Response
**Condition** : If the school isn't defined or there was an other error.  
**Code** : `500 INTERNAL SERVER ERROR`  
**Content example** :
```json
{
    "error": {
      "message": "Oops! There was an error when retrieving the classes."
    }
}
```

## License
MIT License © KonstntinM

### More
This project will follow the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome!
