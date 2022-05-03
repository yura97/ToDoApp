const uri_group = 'api/task-group';
let taskGroups = [];

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
                <input type="text" class="todo__input" id="groupname-input_${item.id}" value="${item.taskGroupName}" 
                    onchange="updateGroup(${item.id})"
                    style="pointer-events: none;"
                    disabled>
            </div>
        `;
}

//onblur="document.getElementById('groupname-input_'+${item.id}).setAttribute('disabled', '');"

function _getHtmlForChosenGroup(id){
    return `
            <a id="close-group_${id}" onclick="deleteGroup(${id})" aria-label="Close">&#10006;</a>
        `;
}

function choseGroup(id){
    /// document.querySelector('#groups').innerHTML += _getGroupHtmlBlock(item);
    // document.getElementById('groups').innerHTML += _getGroupHtmlBlock(item);
    // document.getElementById('editForm').style.display = 'none';
    // document.getElementById('edit-name')
    
    if( id === chosenGroupId )
    {
        // activateInputToChangeGroupName(chosenGroupId)
    }
    else
    {
        changeHtmlLastChosenGroup();
        setChosenGroup(id);
    }
}

function changeHtmlLastChosenGroup(){
    document.getElementById('group_'+chosenGroupId).style.borderBottom = "1px solid black";
    document.getElementById('close-group_'+chosenGroupId).remove();
    document.getElementById('groupname-input_' + chosenGroupId).setAttribute("disabled", "");
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
    
    // item = {
    //     taskGroupName: addNameTextbox.value.trim()
    // }

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
            // getGroups();
            // addNameTextbox.value = '';
            document.querySelector('#groups').innerHTML += _getGroupHtmlBlock(item);
        })
        .catch(error => console.error('Unable to add item.', error));

    
}

function deleteGroup(id) {
    fetch(`${uri_group}/${id}`, {
        method: 'DELETE'
    })
        // .then(() => getGroups())
        .catch(error => console.error('Unable to delete item.', error));
    
    document.getElementById("group_"+id).outerHTML = "";
}

function updateGroup(id) {
    const updatedName = document.getElementById('groupname-input_'+id).value;
    
    const item = {
        id: id,
        taskGroupName: updatedName
    };

    // item = {
    //     id: parseInt(itemId, 10),
    //     taskGroupName: document.getElementById('edit-name').value.trim()
    // };

    fetch(`${uri_group}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        // .then(() => getGroups())
        .catch(error => console.error('Unable to update item.', error));

    // document.getElementById('groupname-input_'+id).setAttribute("disabled", "");
    deactivateInputToChangeGroupName(id);

    // closeInput();

    // return false;
}

// function displayGroupEditForm(id) {
//     const item = taskGroups.find(item => item.id === id);
//
//     document.getElementById('edit-name').value = item.name;
//     document.getElementById('edit-id').value = item.id;
//     document.getElementById('editForm').style.display = 'block';
//
//     // document.querySelector('#group_' + id).innerHTML += `
//     //         <form action="javascript:void(0);" onsubmit="updateItem()">
//     //             <input type="hidden" id="edit-id">
//     //             <input type="checkbox" id="edit-isComplete">
//     //             <input type="text" id="edit-name">
//     //             <input type="submit" value="Save">
//     //             <a onclick="closeInput(${id})" aria-label="Close">&#10006;</a>
//     //         </form>
//     //     `;
// }

// function closeInput() {
//     document.getElementById('editForm').style.display = 'none';
//     // document.getElementById("group_"+id).outerHTML = "";
// }

// function _displayCount(itemCount) {
//     const name = (itemCount === 1) ? 'task' : 'tasks';
//
//     document.getElementById('counter').innerText = `${itemCount} ${name}`;
// }

function _displayGroups(data) {
    // const tBody = document.getElementById('todos');
    // tBody.innerHTML = '';

    // _displayCount(data.length);

    // const button = document.createElement('button');
    
    data.sort(function(a, b){
        return a.id-b.id
    });

    data.forEach(item => {
        // let editButton = button.cloneNode(false);
        // editButton.innerText = 'Edit';
        // editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
        //
        // let deleteButton = button.cloneNode(false);
        // deleteButton.innerText = 'Delete';
        // deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        // let tr = tBody.insertRow();
        //
        // let td2 = tr.insertCell(0);
        // let textNode = document.createTextNode(item.taskGroupName);
        // td2.appendChild(textNode);
        //
        // let td3 = tr.insertCell(1);
        // td3.appendChild(editButton);
        //
        // let td4 = tr.insertCell(2);
        // td4.appendChild(deleteButton);
        
//         groupBlock = `
//             <div class="todo__group" id="group_${item.id}">
//                 <span id="groupname">
//                     ${item.taskGroupName}
//                 </span>
//                 <a onclick="deleteGroup(${item.id})" aria-label="Close">&#10006;</a>
//                 <div class="tasks" id="tasks_${item.id}"></div>
// <!--                <button class="delete">-->
// <!--                    <i class="far fa-trash-alt"></i>-->
// <!--                </button>-->
//             </div>
//         `;

        document.querySelector('#groups').innerHTML += _getGroupHtmlBlock(item);
        
        if(item.id === chosenGroupId){
            // changeHtmlChosenGroup(item.id);
            setChosenGroup(item.id);
        }

        

        // var current_tasks = document.querySelectorAll(".delete");
        // for(var i=0; i<current_tasks.length; i++){
        //     current_tasks[i].onclick = function(){
        //         this.parentNode.remove();
        //     }
        // }
    });

    taskGroups = data;
}


// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const uri_task = 'api/task';
let todos = [];

function _getTaskHtmlBlock(item) {
    return `
            <div class="todo__task" id="task_${item.id}" >
                <input type="checkbox" id="task-checkbox_${item.id}" checked>
                <input type="text" class="todo__input" id="taskname-input_${item.id}" value="${item.taskName}" onclick="editTask(${item.id})" readonly>
                <a onclick="deleteTask(${item.id})" aria-label="Close">&#10006;</a>
            </div>
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
        isDone: false,
        taskName: addNameTextbox.value.trim()
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
        .then(() => {
            getTasks();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteTask(id) {
    fetch(`${uri_task}/${id}`, {
        method: 'DELETE'
    })
        // .then(() => getTasks())
        .catch(error => console.error('Unable to delete item.', error));
}

// function displayEditForm(id) {
//     const item = todos.find(item => item.id === id);
//
//     document.getElementById('edit-name').value = item.taskName;
//     document.getElementById('edit-id').value = item.id;
//     document.getElementById('edit-isComplete').checked = item.isDone;
//     document.getElementById('editForm').style.display = 'block';
// }

function updateTask() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isDone: document.getElementById('edit-isComplete').checked,
        taskName: document.getElementById('edit-name').value.trim()
    };

    fetch(`${uri_task}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        // .then(() => getTasks())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

// function closeInput() {
//     document.getElementById('editForm').style.display = 'none';
// }
//
// function _displayCount(itemCount) {
//     const name = (itemCount === 1) ? 'task' : 'tasks';
//
//     document.getElementById('counter').innerText = `${itemCount} ${name}`;
// }

function _displayTasks(data) {
    data.forEach(item => {
        document.querySelector('#tasks').innerHTML += _getTaskHtmlBlock(item);
    });

    todos = data;
}
