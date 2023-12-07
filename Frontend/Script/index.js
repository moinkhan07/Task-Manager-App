
const openOptions = (clickedElement)=>{
    const taskDiv = clickedElement.closest(".taskDiv");

    const threedotfun = taskDiv.querySelector(".threedotfun");

    threedotfun.style.display = "block";
}
const closeOptions = (clickedElement)=>{
    const taskDiv = clickedElement.closest(".taskDiv");

    const threedotfun = taskDiv.querySelector(".threedotfun");

    threedotfun.style.display = "none";
}
let  userEmailFromLs = JSON.parse(localStorage.getItem("userEmail"));

const addTask = async () => {
  
    if (!userEmailFromLs) {
        window.alert("Please log in first to add a task.");
        return;
    }

    try {
        let result = await fetch(`http://localhost:8000/users/${userEmailFromLs}`);
        let userData = await result.json();

        let add_task = {
            task: document.getElementById("task").value,
        };

        if (add_task.task.length > 1) {
            let res = await fetch(`http://localhost:8000//tasks/${userData.userId}`, {
                method: "POST",
                body: JSON.stringify(add_task),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let data = await res.json();
            document.getElementById("task").value = "";
            window.alert("Successfully added task!");
        } else {
            window.alert("Enter your task!");
        }

        getTask();
    } catch (error) {
        console.error("An unexpected error occurred:", error);
    }
};

const getTask =async ()=>{
    if(userEmailFromLs){
    let result = await fetch(`http://localhost:8000/users/${userEmailFromLs}`);
    let userData = await result.json();
        let tasks = await fetch(`http://localhost:8000/tasks/${userData.userId}`);
        let data = await tasks.json();
        updateTaskCounts(data);
        appendTask(data);
    }
}

getTask();

const updateTaskCounts = (data) => {
    // Reset counts before updating
    pendingCount = 0;
    completedCount = 0;

    data.forEach(task => {
        if (task.status === 'Pending') {
            pendingCount++;
        } else if (task.status === 'Completed') {
            completedCount++;
        }
    });
    document.getElementById("pendingCount").innerText = pendingCount;
    document.getElementById("completedCount").innerText = completedCount;
};




const appendTask = (data) => {
    let container = document.getElementById("display");
    container.innerHTML = null;

    if (userEmailFromLs) {
        data.sort((a, b) => {
            if (a.status === 'Pending' && b.status === 'Completed') {
                return -1;
            } else if (a.status === 'Completed' && b.status === 'Pending') {
                return 1;
            }
            return 0;
        });
        data.forEach((task, index) => {
            // Create main task div
            let mainDiv = document.createElement("div");
            mainDiv.className = "taskDiv";

            // Create top task div
            let topTaskDiv = document.createElement("div");
            topTaskDiv.className = "toptask";

            // Create p tag with dynamic background color
            let pTag = document.createElement("p");
            pTag.innerText = task.status;

            // Change background color based on status
            pTag.style.backgroundColor = task.status === 'Completed' ? 'green' : 'yellow';
            pTag.style.color = task.status === 'Completed' ? 'white' : 'black';

            topTaskDiv.appendChild(pTag);

            // Create image without background color
            let img = document.createElement("img");
            img.src = "./assets/3dot.png";
            img.alt = "3dot icon";
            img.onclick = function() { openOptions(this); };

            topTaskDiv.appendChild(img);

            mainDiv.appendChild(topTaskDiv);


            let midTaskDiv = document.createElement("div");
            midTaskDiv.className = "midtask";

            // Create p tag with dynamic background color
            let pTag2 = document.createElement("p");
            pTag2.innerText = task.task;
            midTaskDiv.appendChild(pTag2);

            // Create textarea for task update
            let textareaTag = document.createElement("textarea");
            textareaTag.value = task.task;
            textareaTag.className = "updateTask";
            textareaTag.setAttribute("data-task-id", task.taskId); 
            textareaTag.style.display = "none"; 

            midTaskDiv.appendChild(textareaTag);

            mainDiv.appendChild(midTaskDiv);

            let bottomTaskDiv = document.createElement("div");
            bottomTaskDiv.className = "bottomtask";

            let saveButton = document.createElement("button");
            saveButton.innerText = "Save";
            saveButton.className = "saveUpdate";
            saveButton.setAttribute("data-task-id", index); 
            saveButton.style.display = "none";
            bottomTaskDiv.appendChild(saveButton);

            // Create date paragraph
            let dateParagraph = document.createElement("p");
            dateParagraph.className = "date";
            dateParagraph.innerText = task.date;
            bottomTaskDiv.appendChild(dateParagraph);

            mainDiv.appendChild(bottomTaskDiv);

            // Create three-dot options div
            let threeDotFunDiv = document.createElement("div");
            threeDotFunDiv.className = "threedotfun";
            threeDotFunDiv.innerHTML = `
                <ul>
                    <li class="com" onclick="toggleStatus(${task.taskId}, '${task.status}')">${task.status === 'Completed' ? 'Pending' : 'Completed'}</li>
                    <li class="upd" onclick="toggleUpdate(${index})">Update Task</li>
                    <li class="del" onclick="deleteTask(${task.taskId})">Delete</li>
                    <img onclick="closeOptions(this)" class="closeBtn" src="./assets/close.png" alt="closeBtn">
                </ul>
            `;
            mainDiv.appendChild(threeDotFunDiv);

            container.appendChild(mainDiv);
        });
    }
};

const toggleUpdate = (index) => {
    let midTaskDiv = document.querySelectorAll(".midtask")[index];
    let pTag = midTaskDiv.querySelector("p");
    let textareaTag = midTaskDiv.querySelector("textarea");
    let taskDiv = midTaskDiv.closest(".taskDiv");
    let saveButton = taskDiv.querySelector(".saveUpdate");

    // Extract the task ID directly from the attributes
    let taskId = textareaTag.getAttribute("data-task-id");

    saveButton.addEventListener("click", async () => {
        try {
            pTag.style.display = "block";
            textareaTag.style.display = "none";
            saveButton.style.display = "none";

            // Get the updated task content from the textarea
            let updatedTaskContent = textareaTag.value;

            // Make a PUT request to update the task content
            let updateResult = await fetch(`http://localhost:8000/tasks/${taskId}/${updatedTaskContent}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (updateResult.ok) {
                getTask();
            } else {
                console.error(`Error updating task content: ${updateResult.status}`);
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    });

    if (pTag.style.display === "block") {
        pTag.style.display = "none";
        textareaTag.style.display = "block";
        saveButton.style.display = "block"; 
        textareaTag.focus(); 
    } else {
        pTag.style.display = "block";
        textareaTag.style.display = "none";
        saveButton.style.display = "none"; 
    }
};

const toggleStatus = async (taskId, currentStatus) => {
    try {
        const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';

        let updateResult = await fetch(`http://localhost:8000/tasksStatus/${taskId}/${newStatus}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (updateResult.ok) {
            getTask();
            console.log(`Task status toggled to ${newStatus} successfully`);
        } else {
            console.error(`Error updating task status: ${updateResult.status}`);
        }
    } catch (error) {
        console.error("An unexpected error occurred:", error);
    }
};

const deleteTask = async (taskId) => {
        let r = await fetch(`http://localhost:8000/users/${userEmailFromLs}`);
        let uD = await r.json();
    try {
        let deleteResult = await fetch(`http://localhost:8000/tasks/${taskId}/${uD.userId}`, {
            method: "DELETE",
        });

        if (deleteResult.ok) {
            getTask();
            console.log("Task deleted successfully");
        } else {
            console.error(`Error deleting task: ${deleteResult.status}`);
        }
    } catch (error) {
        console.error("An unexpected error occurred:", error);
    }
};

let loginPage = document.getElementById("loginBtn");
loginPage.onclick = () => {
    window.location.href = "./login.html";
};


let userNameElement = document.getElementById("userName");
let logoutBtn = document.getElementById("logoutBtn");
let userDetailsContainer = document.getElementById("userDetails");


let userDetails = async () => {
    if (userEmailFromLs) {
        try {
            let res = await fetch(`http://localhost:8000/users/${userEmailFromLs}`);
            let data = await res.json();
            userDetailsContainer.style.display = "block";
            loginPage.style.display = "none";

            userNameElement.textContent = data.firstName;

            userNameElement.addEventListener("click", () => {
                logoutBtn.style.display = (logoutBtn.style.display === "none") ? "block" : "none";
            });

            logoutBtn.style.display = "none";

            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("userEmail");
                userDetailsContainer.style.display = "none";
                loginPage.style.display = "block";
                window.location.href = window.location.href;
            });

        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }
};

userDetails();
