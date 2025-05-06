document.getElementById("taskForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const taskName = document.getElementById("taskInput").value.trim();
    const selectedDay = document.getElementById("daySelect").value;
  
    if (taskName === "" || selectedDay === "") {
      alert("Please enter a task and select a day.");
      return;
    }
  
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.textContent = taskName;
  
    taskElement.addEventListener("click", () => {
        taskElement.style.textDecoration = "line-through";
        taskElement.style.backgroundColor = "#c6ffc1";
        setTimeout(() => taskElement.remove(), 1000); 
      });      
    document.getElementById(selectedDay).appendChild(taskElement);
  
    // Clear the form
    document.getElementById("taskInput").value = "";
    document.getElementById("daySelect").value = "";
  });
  
