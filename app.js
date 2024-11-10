// Reference to Firestore database
const tasksCollection = db.collection("tasks");

// Function to load tasks from Firestore
function loadTasks() {
  tasksCollection.get().then((snapshot) => {
    const tasksList = document.getElementById("tasks");
    tasksList.innerHTML = ""; // Clear the list before adding items

    snapshot.forEach((doc) => {
      const task = doc.data();
      const taskItem = document.createElement("li");
      taskItem.textContent = `${task.title} - ${task.description} - $${task.price}`;
      tasksList.appendChild(taskItem);
    });
  });
}

// Add a new task to Firestore
document.getElementById("taskForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const price = document.getElementById("taskPrice").value;

  tasksCollection.add({
    title: title,
    description: description,
    price: price
  }).then(() => {
    loadTasks(); // Reload tasks after adding
    document.getElementById("taskForm").reset();
  });
});

// Load tasks when the page loads
window.onload = loadTasks;
