let clearButton;
let confetti = false 

function add() {
    const task = document.getElementById("taskText");
    const taskAdd = task.value.trim();
    if (taskAdd) {
        const newDiv= document.createElement("div");
        newDiv.classList.add("task")

        const textSpan=document.createElement("span")
        textSpan.classList.add('text', 'btn')
        textSpan.textContent=taskAdd

        const checkButton=document.createElement("button")
        checkButton.innerHTML='<i class="fa-regular fa-circle-check"></i>'
        checkButton.classList.add('check-btn', 'btn')
        checkButton.onclick=()=>{
            newDiv.classList.toggle("completed")
            checkButton.remove()
            updateTaskCount()
        }

        let deleteButton=document.createElement("button")
        deleteButton.innerHTML='<i class="fa-solid fa-trash-can"></i>'
        deleteButton.classList.add('delete-btn', 'btn')
        deleteButton.onclick=()=>{
            newDiv.remove()
            updateTaskCount()
        }

        newDiv.appendChild(textSpan)
        newDiv.appendChild(checkButton)
        newDiv.appendChild(deleteButton)

        let container=document.getElementById("task-container")
        container.appendChild(newDiv)
        task.value=""
        updateTaskCount()

    }
    else{
        alert("Enter a Valid Input")
    }
}

function updateTaskCount() {
    let totalTask = document.getElementById("task-container").getElementsByTagName("div").length;
    let completedTask = document.querySelectorAll("#task-container div.completed").length;
    document.querySelector(".stat").textContent = `${completedTask}/${totalTask}`;

    let progress = document.querySelector(".progress");

    let progressLength = totalTask > 0 ? (completedTask / totalTask) * 100 : 0;
    progress.style.width = `${progressLength}%`;

    if (completedTask == totalTask && !confetti){
        celeb();
        confetti= true
    }


    if (totalTask > 0) {
        if (!clearButton) {
            clearButton = document.createElement("button");
            clearButton.id = "clear";
            clearButton.textContent = "Clear";

            clearButton.onclick = () => {
                document.getElementById("task-container").innerHTML = "";
                updateTaskCount();
            };
            let container=document.querySelector(".container")

            container.appendChild(clearButton); 
        }
    } else {
        if (clearButton) {
            clearButton.remove(); 
            clearButton = null;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateTaskCount();
});

