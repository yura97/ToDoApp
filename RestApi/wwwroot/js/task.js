// // Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// // for details on configuring this project to bundle and minify static web assets.
//
// // Write your JavaScript code.
// const uri_task = 'api/task';
// let todos = [];
//
// function _getTaskHtmlBlock(item) {
//     return `
//             <div class="todo__task" id="task_${item.id}" >
//                 <input type="checkbox" id="task_checkbox_${item.id}" checked>
//                 <input type="text" class="todo__input" id="groupname" value="${item.taskGroupName}" onclick="editTask(${item.id})" readonly>
//                 <a onclick="deleteTask(${item.id})" aria-label="Close">&#10006;</a>
//             </div>
//         `;
// }
//
//
// export function getTasksForGroup(groupId){
//     fetch(uri_task+"/tasks/task-group/"+groupId)
//         .then(response => response.json())
//         .then(data => _displayTasks(data))
//         .catch(error => console.error('Unable to get tasks.', error));
// }
//
// function getTasks() {
//     fetch(uri_task)
//         .then(response => response.json())
//         .then(data => _displayTasks(data))
//         .catch(error => console.error('Unable to get items.', error));
// }
//
// function addTask() {
//     const addNameTextbox = document.getElementById('add-name');
//
//     const item = {
//         isDone: false,
//         taskName: addNameTextbox.value.trim()
//     };
//
//     fetch(uri_task, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(item)
//     })
//         .then(response => response.json())
//         .then(() => {
//             getTasks();
//             addNameTextbox.value = '';
//         })
//         .catch(error => console.error('Unable to add item.', error));
// }
//
// function deleteTask(id) {
//     fetch(`${uri_task}/${id}`, {
//         method: 'DELETE'
//     })
//         .then(() => getTasks())
//         .catch(error => console.error('Unable to delete item.', error));
// }
//
// // function displayEditForm(id) {
// //     const item = todos.find(item => item.id === id);
// //
// //     document.getElementById('edit-name').value = item.taskName;
// //     document.getElementById('edit-id').value = item.id;
// //     document.getElementById('edit-isComplete').checked = item.isDone;
// //     document.getElementById('editForm').style.display = 'block';
// // }
//
// function updateTask() {
//     const itemId = document.getElementById('edit-id').value;
//     const item = {
//         id: parseInt(itemId, 10),
//         isDone: document.getElementById('edit-isComplete').checked,
//         taskName: document.getElementById('edit-name').value.trim()
//     };
//
//     fetch(`${uri_task}/${itemId}`, {
//         method: 'PUT',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(item)
//     })
//         .then(() => getTasks())
//         .catch(error => console.error('Unable to update item.', error));
//
//     closeInput();
//
//     return false;
// }
//
// // function closeInput() {
// //     document.getElementById('editForm').style.display = 'none';
// // }
// //
// // function _displayCount(itemCount) {
// //     const name = (itemCount === 1) ? 'task' : 'tasks';
// //
// //     document.getElementById('counter').innerText = `${itemCount} ${name}`;
// // }
//
// function _displayTasks(data) {
//     data.forEach(item => {
//         document.querySelector('#tasks').innerHTML += _getTaskHtmlBlock(item);
//     });
//
//     todos = data;
// }