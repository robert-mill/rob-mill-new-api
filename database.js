var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database. created courses table')
        db.run(`CREATE TABLE courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lang text,
            description text, 
            instruction text
            )`,(err) => {
        if (err) {
        }else{
            var insert = 'INSERT INTO courses (lang,description,instruction) VALUES (?,?,?)'
            db.run(insert, ["C++",
                            "In terminal type \‘g++\’",
                            "If error everything is ok else If not say yes to questions"
                            ])
            db.run(insert, [
                            "C++",
                            "Open visual studio code",
                            "create new folder called C++, or your project name"
                            ])
        }
    })  
    }
})


module.exports = db
