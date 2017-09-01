const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODO_LIST_ID_ACTIVE = "todo_list_div_active"
const TODO_LIST_ID_COMPLETE = "todo_list_div_complete"
const TODO_LIST_ID_DELETE = "todo_list_div_delete"
const NEW_TODO_ID = "new_todo_input"

window.onload = getTodosAJAX();

function addTodoAJAX() {
    var title = document.getElementById(NEW_TODO_ID).value;
    console.log(title);
    var xhr = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data = "todo_title="+encodeURI(title) ;
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status ==  STATUS_OK)
            {
                addTodoElements(TODO_LIST_ID_ACTIVE,xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }

    }
    xhr.send(body_data);
}

function createTodoELement(id,todo_object) {

    var todo_element=document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id",id);
    todo_element.setAttribute("class","todoStatus"+todo_object.status);

    if(todo_object.status == "ACTIVE")
    {
        var complete_button = document.createElement("button");
        complete_button.innerText = "Mark as Complete";
        complete_button.setAttribute("onclick","completeTODOAJAX("+id+")");
        todo_element.appendChild(complete_button);
    }
    if(todo_object.status!= "DELETED")
    {
        var delete_button = document.createElement("button");
        delete_button.innerText = "DELETE";
        delete_button.setAttribute("onclick","deleteTODOAJAX("+id+")");
        todo_element.appendChild(delete_button);
    }


    return todo_element;
}
function deleteTODOAJAX(id) {
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("DELETE","api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data = "todo_status=delete";
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status ==  STATUS_OK)
            {

                addTodoElements(TODO_LIST_ID_DELETE,xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}
function completeTODOAJAX(id) {
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("PUT","api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data = "todo_status=COMPLETE";
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status ==  STATUS_OK)
            {

                addTodoElements(TODO_LIST_ID_COMPLETE,xhr.responseText); //sending responses
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}



    function addTodoElements(id, todo_data_json) {

    var todos = JSON.parse(todo_data_json);
    var parents = document.getElementById(id);

    if(parents)
    {
        parents.innerHTML = " "
        Object.keys(todos).forEach(
            function (key) {

                var todo_element = createTodoELement(key,todos[key]);
                parents.appendChild(todo_element);

            }
        )
    }


    }
function getTodosAJAX()
{
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("GET","api/todos",true);

        xhr.onreadystatechange = function () {
            if(xhr.readyState == RESPONSE_DONE){
                if(xhr.status ==  STATUS_OK)
                {
                    console.log(xhr.responseText);

                    addTodoElements(TODO_LIST_ID_ACTIVE,xhr.responseText);
        }
    }
}
xhr.send(data = null);

}