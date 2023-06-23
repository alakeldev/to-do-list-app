// Declare the variables and Set their values from the elements inside todolistpage.html
let exitBtn = document.getElementById("exit-btn"),
    taskInput = document.getElementById("my-task"),
    addTaskBtn = document.querySelector(".add-btn"),
    myAllTasks = document.querySelector(".my-all-tasks");

// Add event listener ("load") so after page fully loaded it's running a function that make auto focus on the input(new task field).
window.addEventListener("load", function () {
    taskInput.focus();
});

// Add event listener ("click") so after clicked on Exit button it's running a function that leads the user to "see you later" page.
exitBtn.addEventListener("click", function () {
    window.open("seeyoulater.html", "_self");
});

// Create new Empty Array to Add and Store the new Tasks in it one after one
let theAllTasksArray = [];

// check if the local storage has tasks stored inside it. And if it has tasks so it will set those tasks to theAllTasksArray (array).
if (window.localStorage.getItem("my-tasks")) {
    theAllTasksArray = JSON.parse(window.localStorage.getItem("my-tasks"));
};

// Call a Function that takes the data from local storage.
getTasksFromLS();

/* Add event listener ("click") so after clicked on Add New Task Button it's running a function 
(to check on input field that isnot empty and the user entered 70 Characters or less, also showing alert if entered more */
addTaskBtn.addEventListener("click", function () {
    if (taskInput !== "" && taskInput.value.length < 71) {
        myNewTasks(taskInput.value);
        taskInput.value = "";
    } else {
        alert("You entered more than 70 character!!!...Please Enter Less Than 70 Character");
    }
});

// Create a function that takes the user input (new task) and add/push it to the theAllTasksArray / Also Call Two functions inside it
function myNewTasks(theCtask) {
    let newTaskData = {
        id: Math.floor(Math.random() * 1e7),
        content: theCtask,
    };
    if (newTaskData.content !== "") {
        theAllTasksArray.push(newTaskData);
    }
    showTasksOnPage(theAllTasksArray);   // Call Function(Show the tasks on page) and set its argument theAllTasksArray
    addTasksToLS(theAllTasksArray);      // Call Function(Add the tasks to LS) and set its argument theAllTasksArray
};

// Create Function shows the tasks on the page(Creating new Elements and set its attributes & values)
function showTasksOnPage(theTasks) {
    myAllTasks.innerHTML = "";
    theTasks.forEach((newTaskData) => {
        let eachTaskDiv = document.createElement("div");
        eachTaskDiv.className = "the-new-task";
        eachTaskDiv.setAttribute("task-id", newTaskData.id);
        let taskTextContent = document.createTextNode(newTaskData.content);
        eachTaskDiv.appendChild(taskTextContent);

        if (newTaskData.content !== "") {    // Condition to Create delete button if (taskInput.value) new task field isn't empty.
            let delBtn = document.createElement("input");
            delBtn.className = "del-btn";
            delBtn.setAttribute("type", "submit");
            delBtn.setAttribute("value", "Delete");
            eachTaskDiv.appendChild(delBtn);
            myAllTasks.appendChild(eachTaskDiv);
        }
        taskInput.focus();
    });

    if (theAllTasksArray.length >= 2) {    // Condition to Create/Show clear all button if theAllTasksArray has two tasks or more.
        let clearAllBtn = document.createElement("input");
        clearAllBtn.classList = "clear-all-btn";
        clearAllBtn.setAttribute("type", "submit");
        clearAllBtn.setAttribute("value", "Clear All");
        myAllTasks.appendChild(clearAllBtn);

        /* Add event listener ("click") so after clicked clear all button it's running a fucntion:
        Empty myAllTasks div - Empty LS - Empty theAllTasksArray */
        clearAllBtn.addEventListener("click", function () {
            myAllTasks.innerHTML = "";
            window.localStorage.clear();
            theAllTasksArray = [];
        });
    };
};

// Create Function for adding the tasks to LS
function addTasksToLS(theTasks) {
    window.localStorage.setItem("my-tasks", JSON.stringify(theTasks));
};

// Create Function for getting the Data/Tasks from LS
function getTasksFromLS() {
    let myTasks = window.localStorage.getItem("my-tasks");
    if (myTasks) {
        let tasks = JSON.parse(myTasks);

        showTasksOnPage(tasks);   // Call a function that shows the tasks with its parameter (the data/tasks from LS)
    };
};

/* Add event listener ("click") it's running a function with its Parameter to check on and target 
the element with class ("del-btn") to remove its parent from Page and LS.  Hide the clear all button through if condition */
myAllTasks.addEventListener("click", function (myDel) {
    if (myDel.target.classList.contains("del-btn")) {
        myDel.target.parentElement.remove();

        // Call a function that remove the tasks from LS and its argument is the value of "task-id" attribute (Parent Element of del-btn)
        removeTaskFromLS(myDel.target.parentElement.getAttribute("task-id"));
    };
    if (theAllTasksArray.length <= 1 && document.querySelector(".clear-all-btn")) {
        document.querySelector(".clear-all-btn").style.display = "none";
    };
});

/* Create a Function with parameter to remove the tasks from LS through set the new value to theAllTasksArray with 
filter method that's running function with parameter(the Obj) and return obj.(id) is not equal to main fun parameter */
function removeTaskFromLS(theTask) {
    theAllTasksArray = theAllTasksArray.filter(function (newTaskData) {
        return newTaskData.id != theTask;
    });
    addTasksToLS(theAllTasksArray);     // Call addTasksToLS function and its argument the new value of theAllTasksArray
};