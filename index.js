/*--------------ASSIGNMENT 3--------------*/
/*-------------RHYTHM RAJ----------------*/
/*---------------------------------------*/




/*-------------All CORE MODULE-------------*/
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var app = express();

/*---------------------------------------*/
/*-------------ACCESS DATA----------------*/
/*---------------------------------------*/
var todo_db = require("./seed.js");

app.use("/",express.static(__dirname+"/public") , function (req,res,next) {
    next()});


// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// setup the logger

app.use(morgan('combined', {stream: accessLogStream}))

/*------------POST METHOD----------------*/

app.use("/",bodyParser.urlencoded({extended : false}));

app.use("/", function (req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});

/*---------------------------------------*/
/*-------------API's---------------------*/
/*---------------------------------------*/

/*----------------GET-----------------------*/
app.get("/api/todos",function (req,res) {

    res.json(todo_db.todos);
})


/*----------------DELETE-----------------------*/
app.delete("/api/todos/:id",function (req,res) {
var del_id = req.params.id;

var todo = todo_db.todos[del_id];

if(!todo)
{
    res.status(400).json({error: "Todo doesn't exist"});
}
else
{
    todo.status = todo_db.StatusEnum.DELETED;
    res.json(todo_db.todos);
}

})

/*----------------ADD DATA-----------------------*/
app.post("/api/todos",function (req,res) {

    var todo = req.body.todo_title;

    if(!todo || todo == "" || todo.trim() == "")
    {
        res.status(400).json({error: "Todo title Can't be empty"});
    }
    else
    {

     var new_todo_object = {
         title : req.body.todo_title,
         status : todo_db.StatusEnum.ACTIVE
     }

     todo_db.todos[todo_db.next_todo_id++]=new_todo_object;
     res.json(todo_db.todos);
    }


})

/*----------------MODIFY-----------------------*/

app.put("/api/todos/:id",function (req,res) {

    var del_id = req.params.id;
    var todo = todo_db.todos[del_id];
    console.log(todo);
    if(!todo)
    {
        res.status(400).json({error: "Can't modify a todo that doesnt exist"});
    }
    else
    {
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title!="" && todo_title.trim()!="")
        {
            todo.title = todo_title;
            console.log(req.method + "inside title   " + req.url);
        }

        var todo_status = req.body.todo_status;

        if(todo_status )
        {

            todo.status=todo_status;

        }
console.log(todo_db.todos);
        res.json(todo_db.todos);
    }


})


console.log(todo_db);

/*----------------PORT NUMBER-----------------------*/
app.listen(4000);



/*---------------------------------------*/
/*-------------RHYTHM RAJ----------------*/
/*---------------------------------------*/