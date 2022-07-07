var express = require("express")
var app = express()
require("./startup/cors")(app);
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const HTTP_PORT = process.env.PORT || config.get("port");
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});


app.get("/api/users/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});
app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/users/", (req, res, next) => {
    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/users/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }
    db.run(
        `UPDATE user set 
           name = COALESCE(?,name), 
           email = COALESCE(?,email), 
           password = COALESCE(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

app.delete("/api/users/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

/****************** */
app.get("/api/courses/:id", (req, res, next) => {
    var sql = "select * from courses where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});
app.get("/api/courses", (req, res, next) => {
    var sql = "select * from courses"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/courses/", (req, res, next) => {
    var errors=[]
    if (!req.body.instruction){
        errors.push("No instruction specified");
    }
    if (!req.body.description){
        errors.push("No description specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        lang: req.body.lang,
        instruction: req.body.instruction,
        description: req.body.description,
        example : req.body.example,
        results : req.body.results
    }
    var sql ='INSERT INTO courses (lang, instruction, description, example, results) VALUES (?,?,?,?,?)'
    var params =[data.lang, data.instruction, data.description, data.example, data.results]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/courses/:id", (req, res, next) => {
    var data = {
        lang: req.body.lang,
        instruction: req.body.instruction,
        description: req.body.description,
        example: req.body.example,
        results: req.body.results
    }
    db.run(
        `UPDATE courses set 
            lang = COALESCE(?,lang),
            instruction = COALESCE(?,instruction), 
            description = COALESCE(?,description), 
            example = COALESCE(?,example), 
            results = COALESCE(?,results)
            WHERE id = ?`,
        [data.lang,data.instruction, data.description, data.example, req.results, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

app.put("/api/courses/:id", (req, res, next) => {
    var data = {
        lang: req.body.lang,
        instruction: req.body.instruction,
        description: req.body.description,
        example : req.body.example,
        results: req.body.results
    }
    db.run(
        `UPDATE course set 
           lang = COALESCE(?,lang), 
           instruction = COALESCE(?,instruction), 
           description = COALESCE(?,description), 
           example = COALESCE(?,example), 
           results = COALESCE(?,results)
           WHERE id = ?`,
        [data.lang, data.instruction, data.description, data.example, req.results, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

app.delete("/api/courses/:id", (req, res, next) => {
    db.run(
        'DELETE FROM courses WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

app.use(function(req, res){
    res.status(404);
});