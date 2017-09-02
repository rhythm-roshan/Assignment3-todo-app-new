const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODO_LIST_ID_ACTIVE = "todo_list_div_active"
const TODO_LIST_ID_COMPLETE = "todo_list_div_complete"
const TODO_LIST_ID_DELETE = "todo_list_div_delete"
const NEW_TODO_ID = "new_todo_input"
const ACTIVE_STATUS = "ACTIVE"
const COMPLETE_STATUS = "COMPLETE"
const DELETE_STATUS = "DELETED"

window.onload = getTodosAJAX();

function removeChildNode(parent) {
    while(parent.hasChildNodes())
    {
        parent.removeChild(parent.lastChild);
    }
}

function addTodoElements(todo_data_json) {

    var todos = JSON.parse(todo_data_json);
    var complete_parent = document.getElementById(TODO_LIST_ID_COMPLETE);
    var active_parent = document.getElementById(TODO_LIST_ID_ACTIVE);
    var delete_parent = document.getElementById(TODO_LIST_ID_DELETE);

    removeChildNode(active_parent)
    removeChildNode(complete_parent);
    removeChildNode(delete_parent);

    for(_id in todos)
    {
        if(todos[_id].status === ACTIVE_STATUS)
        {
            active_parent.appendChild(createActiveElement(_id,todos[_id]));
        }
        if(todos[_id].status === COMPLETE_STATUS)
        {
            complete_parent.appendChild(createCompleteElement(_id,todos[_id]));
        }
        if(todos[_id].status === DELETE_STATUS)
        {
            delete_parent.appendChild(createDeleteElement(_id,todos[_id]));
        }


    }

}

function createActiveElement(_id,todo_object) {
    var todo_element = document.createElement("div");
    todo_element.setAttribute("data-id",_id);
    todo_element.appendChild(createCheckbox(_id, todo_object));
    todo_element.appendChild(createTitle(todo_object));
    todo_element.appendChild(createDeleteX(_id));
    return todo_element;

}
function createCompleteElement(_id,todo_object) {
    var todo_element = document.createElement("div");
    todo_element.setAttribute("data-id", _id);
    todo_element.appendChild(createCheckbox(_id, todo_object));
    todo_element.appendChild(createTitle(todo_object));
    todo_element.appendChild(createDeleteX(_id));
    return todo_element;
}
function createDeleteElement(_id,todo_object) {
    var todo_element = document.createElement("div");
    todo_element.setAttribute("data-id", _id);
    todo_element.appendChild(createTitle(todo_object));
    return todo_element;
}

function createCheckbox(_id,todo_object) {
    var _div = document.createElement("div");
    var checkbox = document.createElement("input");
    _div.setAttribute("class", "col-xs-2");
    _div.setAttribute("align", "right");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onchange", "getCompleteTODOAJAX(" + _id + ")");
    if (todo_object.status === COMPLETE_STATUS ) {
        checkbox.checked = true;
        checkbox.setAttribute('onchange', "getActiveTODOAJAX(" + _id + ")");
    }
    _div.appendChild(checkbox);
    return _div;

}


function createTitle(todo_object) {
    var todo_text = document.createElement("div");
    todo_text.setAttribute("class", "col-xs-8 todoStatus" + todo_object.status);
    todo_text.innerText = todo_object.title;
    return todo_text;
}
function createDeleteX(_id) {
    var x_div = document.createElement("div");
    //x_div.setAttribute("class", "text-danger col-xs-2");
    var delete_x = document.createElement("button");
    delete_x.setAttribute("class", "btn btn-link");
    delete_x.innerHTML = "<sup>X</sup>";
    delete_x.setAttribute("onclick", "getDeletedTODOAJAX(" + _id + ")");
   x_div.appendChild(delete_x);
    return x_div;
}

function toggleVisibilityComplete() {
    var content = document.getElementById(TODO_LIST_ID_COMPLETE);
    if(content.style.display == 'block')
        content.style.display = 'none';
    else
        content.style.display = 'block';
}
function toggleVisibilityDeleted() {
    var content = document.getElementById(TODO_LIST_ID_DELETE);
    if(content.style.display == 'block')
        content.style.display = 'none';
    else
        content.style.display = 'block';
}




// Get all the todos
function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                addTodoElements(xhr.responseText);
            } else {
                var resp = JSON.parse(xhr.responseText);
                alert(resp.error);
            }
        }
    };
    xhr.send(data = null);
}



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
                addTodoElements(xhr.responseText);
            }
            else{
                var resp = JSON.parse(xhr.responseText);
                alert(resp.error);
            }
        }

    }
    xhr.send(body_data);
}

function getDeletedTODOAJAX(id) {
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("PUT", "/api/todos/" + id);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data = "todo_status="+encodeURI(DELETE_STATUS);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status ==  STATUS_OK)
            {

                addTodoElements(xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}

function getActiveTODOAJAX(id) {
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("PUT","api/todos/"+id);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data = "todo_status="+(ACTIVE_STATUS);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status ==  STATUS_OK)
            {

                addTodoElements(xhr.responseText); //sending responses
                console.log(xhr.responseText);

            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}

function getCompleteTODOAJAX(id) {
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("PUT","api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data = "todo_status=COMPLETE";
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status ==  STATUS_OK)
            {

                addTodoElements(xhr.responseText); //sending responses
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}