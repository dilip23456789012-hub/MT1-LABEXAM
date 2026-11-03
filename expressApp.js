import express from "express";

const app = express();

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Task Management API is Running...");
});

// Sample Data
let tasks = [
  {
    id: 1,
    taskName: "Develop Login Page",
    assignedTo: "Rahul Sharma",
    status: "Pending",
    priority: "High"
  },
  {
    id: 2,
    taskName: "Create Dashboard",
    assignedTo: "Amit Kumar",
    status: "Completed",
    priority: "Medium"
  },
  {
    id: 3,
    taskName: "Testing Module",
    assignedTo: "Sneha Verma",
    status: "Pending",
    priority: "Low"
  }
];

// Get All Tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get Task By ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(
    task => task.id === parseInt(req.params.id)
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});

// Add New Task
app.post("/tasks", (req, res) => {
  const { id, taskName, assignedTo, status, priority } = req.body;

  if (!id || !taskName || !assignedTo || !status || !priority) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newTask = {
    id,
    taskName,
    assignedTo,
    status,
    priority
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task added successfully",
    task: newTask
  });
});

// Update Task
app.put("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(
    task => task.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  tasks[index] = {
    ...tasks[index],
    ...req.body
  };

  res.json({
    message: "Task updated successfully",
    task: tasks[index]
  });
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(
    task => task.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const deletedTask = tasks[index];

  tasks.splice(index, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask
  });
});

// Start Server
app.listen(4000, () => {
  console.log("Express Server running at http://localhost:4000");
});