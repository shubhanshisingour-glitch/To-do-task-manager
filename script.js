// Get elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks when page opens
loadTasks();

// Add task button click
addTaskBtn.addEventListener("click", addTask);

// Press Enter to add task
taskInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        addTask();
    }

});

// Function to add task
function addTask(){

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    createTask(taskText);

    saveTask(taskText);

    taskInput.value = "";
}

// Create task element
function createTask(taskText){

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    // Complete task on click
    span.addEventListener("click", function(){

        span.classList.toggle("completed");

    });

    // Delete button
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function(){

        li.remove();

        removeTask(taskText);

    });

    li.appendChild(span);

    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Save task in Local Storage
function saveTask(task){

    let tasks =
        JSON.parse(localStorage.getItem("tasks"))
        || [];

    tasks.push(task);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

// Load saved tasks
function loadTasks(){

    let tasks =
        JSON.parse(localStorage.getItem("tasks"))
        || [];

    tasks.forEach(task => {

        createTask(task);

    });

}

// Remove task
function removeTask(taskText){

    let tasks =
        JSON.parse(localStorage.getItem("tasks"))
        || [];

    tasks = tasks.filter(
        task => task !== taskText
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}