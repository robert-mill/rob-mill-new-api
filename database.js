var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database. created cpp table')
        db.run(`CREATE TABLE cpp (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            instruction text,
            description text, 
            example text, 
            result text
            )`,(err) => {
        if (err) {
        }else{
            var insert = 'INSERT INTO cpp (instruction, description, example, result) VALUES (?,?,?,?)'
            db.run(insert, ["In terminal type \‘g++\’","If error everything is ok else If not say yes to questions","g++"])
            db.run(insert, ["Open visual studio code"," create new folder called C++, or your project name",""])
        }
    })  
    }
})


module.exports = db
