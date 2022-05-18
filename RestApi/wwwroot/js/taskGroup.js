const uri_group = 'api/task-group';

let chosenGroupId = 0;
let deletedGroupId = 0;

function _getGroupHtmlBlock(item) {
    return `
            <div class="todo__group" id="group_${item.id}" style="border-bottom: 1px solid black;" onclick="choseGroup(${item.id})">
                ${_getGroupHtmlInput(item)}
            </div>
        `;
}

function _getGroupHtmlInput(item) {
    return `
            <input type="text" class="todo__input" id="groupname-input_${item.id}" value="${item.taskGroupName}" 
                onchange="updateGroup(${item.id})"
                style="pointer-events: none;"
                disabled>
        `;
}

function _getHtmlForChosenGroup(id){
    return `
            <a id="close-group_${id}" onclick="deleteGroup(${id})" aria-label="Close">&#10006;</a>
        `;
}

function choseGroup(id){
    if( id !== chosenGroupId && id !== deletedGroupId)
    {
        setAllFilter();
        changeHtmlLastChosenGroup(chosenGroupId);
        setChosenGroup(id);
    }
    deletedGroupId = 0;
}

function changeHtmlLastChosenGroup(id){
    document.getElementById('group_'+id).style.borderBottom = "1px solid black";
    document.getElementById('close-group_'+id).remove();
    document.getElementById('groupname-input_' + id).setAttribute("disabled", "");
    deactivateInputToChangeGroupName(id);
}
function changeHtmlChosenGroup(id){
    document.getElementById('group_'+id).style.borderBottom = "0px solid black";
    document.querySelector('#group_'+id).innerHTML += _getHtmlForChosenGroup(id);
    document.getElementById('groupname-input_' + id).removeAttribute("disabled");
    activateInputToChangeGroupName(id);
}
function activateInputToChangeGroupName(id) {
    // document.getElementById('groupname-input_' + id).removeAttribute("disabled");
    document.getElementById('groupname-input_' + id).style.pointerEvents = "auto";
}
function deactivateInputToChangeGroupName(id) {
    // document.getElementById('groupname-input_' + id).setAttribute("disabled", "");
    document.getElementById('groupname-input_' + id).style.pointerEvents = "none";
}
function setChosenGroup(id){
    chosenGroupId = id;
    changeHtmlChosenGroup(id);
    getTasksForGroup(id);
}
function clearTasks(){
    document.querySelector('#tasks').innerHTML = '';
}


function getGroups() {
    fetch(uri_group)
        .then(response => response.json())
        .then(data => _displayGroups(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addGroup() {
    const addNameTextbox = document.getElementById('add-group');

    const item = {
        id: 0,
        taskGroupName: addNameTextbox.value.trim()
    };

    fetch(uri_group, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(data => item.id = data)
        .then(() => {
            document.querySelector('#groups').innerHTML += _getGroupHtmlBlock(item);
        })
        .catch(error => console.error('Unable to add item.', error));

    document.getElementById('add-group').value = '';
}

function deleteGroup(id) {
    fetch(`${uri_group}/${id}`, {
        method: 'DELETE'
    })
        .catch(error => console.error('Unable to delete item.', error));
    
    deletedGroupId = id;
    document.getElementById("group_"+id).outerHTML = "";
    let defaultGroupId = document.querySelector('.todo__group').id.slice(-1);
    setChosenGroup(parseInt(defaultGroupId, 10));
}

function updateGroup(id) {
    const updatedName = document.getElementById('groupname-input_'+id).value;
    
    const item = {
        id: id,
        taskGroupName: updatedName
    };

    fetch(`${uri_group}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .catch(error => console.error('Unable to update item.', error));

    document.getElementById('groupname-input_'+id).remove();
    document.getElementById('close-group_'+id).remove();
    document.querySelector('#group_'+id).innerHTML += _getGroupHtmlInput(item);
    changeHtmlChosenGroup(id);
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'task' : 'tasks';
    const filter = uri_filter.substring(1);
    
    document.getElementById('counter').innerText = `${itemCount} ${filter} ${name}`;
}

function _displayGroups(data) {
    
    data.sort(function(a, b){
        return a.id-b.id
    });
    
    let firstElementFlag = true;

    data.forEach(item => {
        
        document.querySelector('#groups').innerHTML += _getGroupHtmlBlock(item);
        
        if(firstElementFlag){
            // changeHtmlChosenGroup(item.id);
            setChosenGroup(item.id);
            firstElementFlag = false;
        }
        
    });
}







const uri_task = 'api/task';
const uri_todo = 'api/todo';

let uri_filter = '';

function _getTaskHtmlBlock(item) {
    return `
            <div class="task" id="task_${item.id}" >
                ${_getTaskInputHtmlBlock(item)}
            </div>
        `;
}
function _getTaskInputHtmlBlock(item) {
    return `
            <input type="checkbox" id="task-checkbox_${item.id}"
                onchange="updateTask(${item.id})">
            <input type="text" class="todo__input" id="taskname-input_${item.id}" value="${item.taskName}"
                onchange="updateTask(${item.id})">
            <a onclick="deleteTask(${item.id})" aria-label="Close">&#10006;</a>
        `;
}

function setAllFilter() {
    uri_filter = '';
    getTasksForGroup(chosenGroupId);
    setFilters('filter-all');
}
function setActiveFilter() {
    uri_filter = '/active';
    getTasksForGroup(chosenGroupId);
    setFilters('filter-active');
}
function setCompletedFilter() {
    uri_filter = '/completed';
    getTasksForGroup(chosenGroupId);
    setFilters('filter-completed');
}
function setFilters(filter){
    document.getElementById('filter-all').style.background = "";
    document.getElementById('filter-active').style.background = "";
    document.getElementById('filter-completed').style.background = "";
    document.getElementById(filter).style.background = "#61b04e";
}

function getTasksForGroup(groupId){
    fetch(uri_task+"/tasks/task-group/" + groupId + uri_filter)
        .then(response => response.json())
        .then(data => {
            clearTasks();
            _displayTasks(data);
        })
        .catch(error => console.error('Unable to get tasks.', error));
}

function getTasks() {
    fetch(uri_task)
        .then(response => response.json())
        .then(data => _displayTasks(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addTask() {
    const addNameTextbox = document.getElementById('add-task');

    const item = {
        id: 0,
        isDone: false,
        taskName: addNameTextbox.value.trim()
    };

    const todo = {
        taskGroupId: chosenGroupId,
        taskId: 0
    };

    fetch(uri_task, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(data => {
            item.id = data;
            todo.taskId = data;
        })
        .then(() => {
            document.querySelector('#tasks').innerHTML += _getTaskHtmlBlock(item);
            addTaskToGroup(todo);
        })
        .catch(error => console.error('Unable to add item.', error));

    document.getElementById('add-task').value = '';
}

function addTaskToGroup(item){
    fetch(uri_todo, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .catch(error => console.error('Unable to add item.', error));

    let count = document.getElementById('counter').innerText.trim()[0];
    _displayCount(parseInt(count, 10) + 1);
}

function deleteTask(id) {
    fetch(`${uri_task}/${id}`, {
        method: 'DELETE'
    })
        .catch(error => console.error('Unable to delete item.', error));

    document.getElementById("task_"+id).outerHTML = "";
    let count = document.getElementById('counter').innerText.trim()[0];
    _displayCount(parseInt(count, 10) - 1);
}

function updateTask(id) {
    const updatedTask = document.getElementById('taskname-input_'+id).value;
    
    const item = {
        id: id,
        isDone: document.getElementById('task-checkbox_' + id).checked,
        taskName: updatedTask
    };

    fetch(`${uri_task}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .catch(error => console.error('Unable to update item.', error));

    document.querySelector('#task_'+id).innerHTML = '';
    document.querySelector('#task_'+id).innerHTML += _getTaskInputHtmlBlock(item);
    if(item.isDone)
        document.getElementById('task-checkbox_' + item.id).setAttribute("checked", "");
}

function _displayTasks(data){
    _displayCount(data.length);
    
    data.forEach(item => {
        document.querySelector('#tasks').innerHTML += _getTaskHtmlBlock(item);
        if(item.isDone)
            document.getElementById('task-checkbox_' + item.id).setAttribute("checked", "");
    });
}
