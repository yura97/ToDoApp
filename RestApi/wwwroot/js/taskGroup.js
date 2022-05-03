const uri_group = 'api/task-group';

let chosenGroupId = 0;

// let item = {
//     id: null,
//     taskGroupName: null
// };

// let groupBlock = `
//             <div class="todo__group" id="group_${item.id}">
//                 <span id="groupname">
//                     ${item.taskGroupName}
//                 </span>
//                 <a onclick="deleteGroup(${item.id})" aria-label="Close">&#10006;</a>
//                 <div class="tasks" id="tasks_${item.id}"></div>
//                 <img src="images/edit.png" alt="Edit group">
//             </div>
//         `;

// <div className="todo__group" id="group_${item.id}">
//                 <span id="groupname">
//                     ${item.taskGroupName}
//                 </span>
//     <a onClick="deleteGroup(${item.id})" aria-label="Close">&#10006;</a>
//     <div className="tasks" id="tasks_${item.id}"></div>
//     <!--                <img onclick="updateGroup(${item.id})" src="images/edit.png" alt="Edit group" >-->
//     <button onClick="displayGroupEditForm(${item.id})">Edit</button>
// </div>

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

//onblur="document.getElementById('groupname-input_'+${item.id}).setAttribute('disabled', '');"

function _getHtmlForChosenGroup(id){
    return `
            <a id="close-group_${id}" onclick="deleteGroup(${id})" aria-label="Close">&#10006;</a>
        `;
}

function choseGroup(id){
    if( id !== chosenGroupId )
    {
        changeHtmlLastChosenGroup(chosenGroupId);
        setChosenGroup(id);
        clearTasks();
    }
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
}

function deleteGroup(id) {
    fetch(`${uri_group}/${id}`, {
        method: 'DELETE'
    })
        .catch(error => console.error('Unable to delete item.', error));
    
    document.getElementById("group_"+id).outerHTML = "";
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

// function _displayCount(itemCount) {
//     const name = (itemCount === 1) ? 'task' : 'tasks';
//
//     document.getElementById('counter').innerText = `${itemCount} ${name}`;
// }

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


// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const uri_task = 'api/task';
const uri_todo = 'api/todo';

function _getTaskHtmlBlock(item) {
    return `
            <div class="todo__task" id="task_${item.id}" >
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


function getTasksForGroup(groupId){
    fetch(uri_task+"/tasks/task-group/"+groupId)
        .then(response => response.json())
        .then(data => _displayTasks(data))
        .catch(error => console.error('Unable to get tasks.', error));
}

function getTasks() {
    fetch(uri_task)
        .then(response => response.json())
        .then(data => _displayTasks(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addTask() {
    const addNameTextbox = document.getElementById('add-name');

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
}

function deleteTask(id) {
    fetch(`${uri_task}/${id}`, {
        method: 'DELETE'
    })
        .catch(error => console.error('Unable to delete item.', error));

    document.getElementById("task_"+id).outerHTML = "";
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
    data.forEach(item => {
        document.querySelector('#tasks').innerHTML += _getTaskHtmlBlock(item);
        if(item.isDone)
            document.getElementById('task-checkbox_' + item.id).setAttribute("checked", "");
    });
}

function _addTaskHtml(item){
    document.querySelector('#task_'+item.id).innerHTML += _getTaskInputHtmlBlock(item);
    document.getElementById('task-checkbox_' + item.id).setAttribute("checked", "");
}
