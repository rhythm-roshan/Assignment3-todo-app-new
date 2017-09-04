/*--------------ASSIGNMENT 3--------------*/
/*-------------RHYTHM RAJ----------------*/
/*---------------------------------------*/


/*---------------------------------------*/
/*----------Status Of Todos--------------*/
/*---------------------------------------*/
var StatusEnums = {
    ACTIVE: "ACTIVE",
    COMPLETE: "COMPLETE",
    DELETED: "DELETED"
}

/*---------------------------------------*/
/*-------------List of Todos-------------*/
/*---------------------------------------*/
var todos = {
    1: {title: "Learn JS", status: StatusEnums.ACTIVE},
    2: {title: "Git Tutorial", status: StatusEnums.ACTIVE},
    3: {title: "Interactive Git", status: StatusEnums.ACTIVE},
    4: {title: "Git hub", status: StatusEnums.ACTIVE},
    5: {title: "Gist Git", status: StatusEnums.ACTIVE},
    6: {title: "Fork", status: StatusEnums.ACTIVE},
    7: {title: "Git", status: StatusEnums.ACTIVE},

}

/*---------------------------------------*/
/*-------------NEXT TODOS ID-------------*/
/*---------------------------------------*/

var next_todo_id = 8;

module.exports =
    {
        StatusEnum: StatusEnums,
        todos: todos,
        next_todo_id: next_todo_id
    }

