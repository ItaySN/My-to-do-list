var lastTaskId     = localStorage.getItem('last_task_id') || 0;
var tasksById      = localStorage.getItem('tasks_by_id') ? JSON.parse(localStorage.getItem('tasks_by_id')) : {};
var orderedTaskIds = localStorage.getItem('ordered_task_ids') ? JSON.parse(localStorage.getItem('ordered_task_ids')) : [];
var tasksCounter   = orderedTaskIds.length;


var tasksListEl = document.getElementById("tasks-list");
var counterDiv  = document.getElementById("counter");

// -- Form on submit event -- //
var form = document.getElementById('control-form');
form.addEventListener("submit", function(e){
    e.preventDefault(); // stop form from submitting

    // Get task text and priority
    let taskText     = document.getElementById('textInput').value;
    let taskPriority = document.getElementById('prioritySelector').value;

    // Validations
    if ( ! validateText(taskText)) {  // if the input text is not empty 
        return false;
    }

    // Define a new ID for this task
    lastTaskId++;
    localStorage.setItem('last_task_id', lastTaskId);
    let taskId = lastTaskId;

    // Create the date variables of today
    // https://stackoverflow.com/a/8363049
    var TaskCreateDate = new Date();
    var TaskCreateDateDisplay = TaskCreateDate.getFullYear() + "-" +
        ("0" + (TaskCreateDate.getMonth()+1)).slice(-2) + "-" +
        ("0" + TaskCreateDate.getDate()).slice(-2) + " " +
        ("0" + TaskCreateDate.getHours()).slice(-2) + ":" +
        ("0" + TaskCreateDate.getMinutes()).slice(-2) + ":" +
        ("0" + TaskCreateDate.getSeconds()).slice(-2);

    // Create the task object
    let task = {
        id:                taskId,
        priority:          taskPriority, 
        text:              taskText, 
        createDateDisplay: TaskCreateDateDisplay
    };

    // Add the task to the tasksById DB
    tasksById[taskId] = task;
    localStorage.setItem('tasks_by_id', JSON.stringify(tasksById));

    // Add the task as a new row in UI
    addTaskRow(task);

    // Add the task to the ordered array, to the last position
    orderedTaskIds.push(taskId);
    localStorage.setItem('ordered_task_ids', JSON.stringify(orderedTaskIds));

    // Increase tasks counter and change the counter in display
    tasksCounter++;
    counterDiv.innerHTML = tasksCounter;

    // Reset the form
    form.reset();
});

function addTaskRow(task) {
    // Create the tasks elements
    let priorityDiv = document.createElement("div");
    priorityDiv.className = "todoPriority";
    let createdAtDiv = document.createElement("div");
    createdAtDiv.className = "todoCreatedAt";
    let textDiv = document.createElement("div");
    textDiv.className = "todoText";

    // Create the delete button
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-delete" 
    let iconOfDelete = document.createElement("i");
    iconOfDelete.className = "fa fa-trash";
    deleteButton.onclick = function(e) {

        var TaskContainerEl = this.parentElement;
        var taskId = parseInt(TaskContainerEl.getAttribute('data-id'));
        deleteTask(taskId);

        // Remove the related task container
        TaskContainerEl.remove();
    };
    deleteButton.appendChild(iconOfDelete);

    // Populate new task values
    priorityDiv.textContent = task.priority;
    colorByPriority(task.priority,priorityDiv);
    createdAtDiv.textContent = task.createDateDisplay; 
    textDiv.textContent = task.text; 

    // Create the new task container and append all elements to it
    let containerDiv = document.createElement("div"); 
    containerDiv.className = "todoContainer";
    containerDiv.setAttribute('data-id', task.id);
    containerDiv.appendChild(priorityDiv);
    containerDiv.appendChild(createdAtDiv);
    containerDiv.appendChild(textDiv);
    containerDiv.appendChild(deleteButton);
    

    // Append new task to the Tasks view list
    tasksListEl.appendChild(containerDiv);
    document.getElementById('textInput').focus();

}

function deleteTask(taskId) {

    // Remove from tasksById
    delete tasksById[taskId];
    localStorage.setItem('tasks_by_id', JSON.stringify(tasksById));

    // Remove from orderedTaskIds
    var index = orderedTaskIds.indexOf(taskId);
    if (index > -1) {
        orderedTaskIds.splice(index, 1);
    }
    localStorage.setItem('ordered_task_ids', JSON.stringify(orderedTaskIds));

    // Update tasks counter and the counter in display
    tasksCounter--;
    counterDiv.innerHTML = tasksCounter;
}

function validateText(text) {
    if (!(/\S/.test(text))) //check if there is some chars in the text ;
    {
        alert("XXX  Error!  XXX \n Your must to write something in the text-bar!!!");
        return false;
    }
    return true;
}

function sortByPriority() {

    // Sort by priority DESC
    var tasksArray = Object.values(tasksById); // Convert tasksById object to array
    var sortedTasksArray = tasksArray.sort(function(taskA, taskB) {
        if (taskA.priority < taskB.priority) {
            return 1;
        }
        else {
            return -1;
        }
    });

    // Clear all tasks from UI
    tasksListEl.innerHTML = '';

    // Append all tasks, now by the correct order
    // Make sure orderedTaskIds is up to date with the new order
    orderedTaskIds = [];
    sortedTasksArray.map(function(task) {
        orderedTaskIds.push(task.id);
        addTaskRow(task);
    });

    localStorage.setItem('ordered_task_ids', JSON.stringify(orderedTaskIds));
}

function sortByCreateDate() {

    // Sort by create date DESC (basically by ID desc)
    var tasksArray = Object.values(tasksById);
    var sortedTasksArray = tasksArray.sort(function(taskA, taskB) {
        if (taskA.id < taskB.id) {
            return 1;
        }
        else {
            return -1;
        }
    });

    // Clear all tasks from UI
    tasksListEl.innerHTML = '';

    // Append all tasks, now by the correct order
    // Make sure orderedTaskIds is up to date with the new order
    orderedTaskIds = [];
    sortedTasksArray.map(function(task) {
        orderedTaskIds.push(task.id);
        addTaskRow(task);
    });

    localStorage.setItem('ordered_task_ids', JSON.stringify(orderedTaskIds));
}
function searchTask()
{
    var textSearch=document.getElementById("searchInput").value;
    let filter = textSearch.toUpperCase();
    let containerDivArr = document.getElementsByClassName("todoContainer");
    for(let i=0;i<containerDivArr.length;i++)
    {
        let textOfTask = containerDivArr[i].childNodes[2].textContent;
        if (textOfTask.toUpperCase().indexOf(filter) > -1) {
        containerDivArr[i].style.display = "";
         }
        else {
        containerDivArr[i].style.display = "none";
        }
    }
}
function colorByPriority(taskPriority,divPriority)
{
    switch(taskPriority){
        case "1":
            {
                divPriority.style.backgroundColor = "greenyellow";
                break;
            }
        case "2":
            {
                divPriority.style.backgroundColor = "green";
                break;
            }
        case "3":
            {
                divPriority.style.backgroundColor = "rgb(238, 241, 4)";
                break;
            }
        case "4":
            {
                divPriority.style.backgroundColor ="rgb(233, 146, 33)";
                break;
            }
        case "5":
            {
                divPriority.style.backgroundColor = "red";
                break;
           }
           
    }
}

// On startup, display all tasks stored in localStorage, by the orderedTaskIds
orderedTaskIds.map(function(taskId) {
    var task = tasksById[taskId];
    addTaskRow(task);
});
