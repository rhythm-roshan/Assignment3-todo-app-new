var StatusEnums={
    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos={
    1: {title : "Learn JS" , status : StatusEnums.ACTIVE},
    2: {title : "Git Tutorial" , status : StatusEnums.ACTIVE},
    3: {title : "Interactive Git" , status : StatusEnums.ACTIVE},

}

var next_todo_id = 4;

module.exports =
    {
        StatusEnum : StatusEnums,
        todos : todos,
        next_todo_id : next_todo_id
    }

