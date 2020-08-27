const WebUntis = require("webuntis");

const config = require("config-yaml")(`${__dirname}/../config/config.yaml`)

module.exports = {
    login,
    sessionIsValid,
    getSchoolEnd,
    getClasses
}

var untis = new WebUntis.WebUntisAnonymousAuth(
    config.Untis[1].SCHOOL,
    config.Untis[0].SERVER
)

async function login() {

    if (!sessionIsValid()) {
        untis = new WebUntis.WebUntisAnonymousAuth(
            config.Untis[1].SCHOOL,
            config.Untis[0].SERVER
        )
    }

    await untis.login()
        .then(res => {
            console.info("\x1b[32m" + "The server successfully opened a connection to the Untis server." + "\x1b[0m")
            new Promise(resolve => resolve());
        })
        .catch(err => {
            console.error("Oops! There was an error when connecting to the Untis server. Please check your internet connection and login data.")
            console.error(err)
        })
}

async function sessionIsValid () {
    return await untis.validateSession();
}

async function getSchoolEnd(classId) {

    await login();

    return new Promise (async (resolve, reject) => {
        var timetable = await untis.getTimetableForToday(classId, WebUntis.WebUntisAnonymousAuth.TYPES.CLASS)
            .catch(error => {
                console.log(error);

                const errorTimetable = {
                    "error": {
                        "message": "Oops! There was an error when retrieving your timetable."
                    }
                }

                reject(errorTimetable)
            })
  
        // get last hour
        let lastHour;
        for (hour in timetable) {
            if (lastHour == null || timetable[hour].endTime > lastHour.endTime) {
                lastHour = timetable[hour]
            }
        }

        let schoolEnd = lastHour.endTime.toString()
        formatSchoolEnd(schoolEnd)
            .then(formSchoolEnd => {
                resolve(formSchoolEnd)
            })
        
    })    
}

async function formatSchoolEnd (schoolEnd) {
    return new Promise(function(resolve, reject) {
        let position = schoolEnd > 1000 ? 2 : 1;
        schoolEnd = [schoolEnd.slice(0, position), ":", schoolEnd.slice(position)].join('');
        
        resolve(schoolEnd)
    });
}

async function getClasses () {
    return new Promise((resolve, reject) => {
        untis.getClasses()
            .then(result => {
                resolve(result)
            })
            .catch(error=> {
                console.log(error);
                const errorClasses = {
                    "error": {
                    "message": "Oops! There was an error when retrieving the classes."
                    }
                }
                reject(errorClasses)
            })
        })
}