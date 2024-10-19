let tasks = [];

// Save tasks to localStorage
const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));

// Load tasks from localStorage
const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    // check if there are saved tasks in localStorage, parse them. Otherwise, initialize an empty array.
    tasks = savedTasks ? JSON.parse(savedTasks) : [];
};

const run = () => {
    loadTasks();
    let codeRunning = true;
    while (codeRunning) {
        console.log(
        `
Task Manager Menu

1. Add Task 
2. View Tasks 
3. Toggle Task Completion 
4. Edit Task 
5. Delete Task
6. Search 
7. Exit`); 

        const p = prompt("Enter your choice: ");
        switch (p) {
            case '1':{
                addTask();
                break;
            }

            case '2':{
                displayTasks();
                break;
            }

            case '3':{
                toggleTaskCompletion();
                break;
            }
                
            case '4':{
                updateTask();
                break;
            }
                
            case '5':{
                deleteTask();
                break;
            }
            
            case '6':{
                searchTasks();
                break;
            }
                
            case '7':{
                console.log("Exiting Task Manager... ");
                codeRunning = false;
                break;
            }

            default:
                console.log("Invalid Choice! Please choose a number between 1 - 7");
                break;
        }
    }
};


const addTask = () => {
    const taskTitle = prompt("Enter Task Title:");
    const isDuplicate = tasks.some(dt => dt.taskTitle.toLowerCase() === taskTitle.toLowerCase());
    if (taskTitle.trim() === "") {
        console.log("You have to write Task Title!");
    }
    else if (isDuplicate) {
        console.log("This Task Title already exists!");
    }
    else {
        const taskID = tasks.length + 1;
        const newTask = { taskID , taskTitle , isCompleted: false};
        tasks.push(newTask);
        console.log(`Task added: ${taskID}. ${taskTitle}`);
        saveTasks();
    }
};

const displayTasks = () =>{
    if (tasks.length === 0) {
        console.log("Sorry! No tasks available.");
    }
    else {
        console.log("Tasks List: ");
        tasks.forEach(({taskID , taskTitle , isCompleted}) => {
            console.log(`${taskID}. ${taskTitle}  [${isCompleted ? 'Completed' : 'Not Completed'}]`);
        });
    }
};

const toggleTaskCompletion =() => {
    const IDToggle = parseInt(prompt("Enter Task ID to toggle completion: "));
    const taskIDToggle = tasks.find(t => t.taskID === IDToggle);
    if (taskIDToggle) {
        taskIDToggle.isCompleted = !taskIDToggle.isCompleted;
        console.log(`Task ${taskIDToggle.taskID}. "${taskIDToggle.taskTitle}" is now marked as ${taskIDToggle.isCompleted ? 'Completed' : 'Not Completed'}.`);
        saveTasks();
    }
    else {
        console.log("Sorry, Task not found! Please enter a valid Task ID.");
    }
};

const updateTask =() => {
    const IDUpdate = parseInt(prompt("Enter Task ID to edit: "));
    const taskIDUpdate = tasks.find(u => u.taskID === IDUpdate);
    if (taskIDUpdate) {
        const updatedTaskTitle = prompt("Enter a new Task Title: ");
        taskIDUpdate.taskTitle = updatedTaskTitle;
        console.log(`Task ${taskIDUpdate.taskID} updated to: "${taskIDUpdate.taskTitle}".`);
        saveTasks();
    }
    else {
        console.log("Sorry, Task not found! Please enter a valid Task ID.");
    }
};

const deleteTask =() => {
    const IDDelete = parseInt(prompt("Enter Task ID to delete: "));
    const taskIndexDelete = tasks.findIndex(d => d.taskID === IDDelete);
    if (taskIndexDelete !== -1) {
        const deletedTask = tasks.splice(taskIndexDelete, 1)[0];
        console.log(`Task ${deletedTask.taskID}. "${deletedTask.taskTitle}" Deleted.`);
        saveTasks();
    }
    else {
        console.log("Sorry, Task not found! Please enter a valid Task ID.");
    }
};

const searchTasks =() => {
    const searchKeyword = prompt("Enter a keyword to search tasks by name: ");
    const filteredTasks = tasks.filter(f => f.taskTitle.toLowerCase().includes(searchKeyword.toLowerCase()));
    if (filteredTasks.length > 0) {
        console.log("Search Results:");
        filteredTasks.forEach(ft => {
            console.log(`${ft.taskID}. ${ft.taskTitle} [${ft.isCompleted ? 'Completed' : 'Not Completed'}]`);
        });
    }
    else {
        console.log("Sorry, No Tasks found matching the search keyword!");
    }
};

run();
