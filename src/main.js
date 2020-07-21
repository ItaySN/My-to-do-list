var lastTaskId     = localStorage.getItem('last_task_id') || 0;
var tasksById      = localStorage.getItem('tasks_by_id') ? JSON.parse(localStorage.getItem('tasks_by_id')) : {};
var orderedTaskIds = localStorage.getItem('ordered_task_ids') ? JSON.parse(localStorage.getItem('ordered_task_ids')) : [];
var tasksCounter   = orderedTaskIds.length;


var tasksListEl = document.getElementById("tasks-list");
var counterDiv  = document.getElementById("counter");

