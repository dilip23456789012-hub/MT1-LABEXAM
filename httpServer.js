import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let tasks = [
  {
    id: 1,
    taskName: "Develop Login Page",
    assignedTo: "Rahul Sharma",
    status: "Pending"
  },
  {
    id: 2,
    taskName: "Design Dashboard",
    assignedTo: "Amit Kumar",
    status: "Completed"
  }
];

const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to Employee Task Management System</h1>");
  }

  else if (req.method === "GET" && req.url === "/tasks") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));
  }

  else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h2>Employee Task Management Application built using Node.js</h2>");
  }

  else if (req.method === "GET" && req.url === "/home") {

    const filePath = path.join(__dirname, "public", "index.html");

    fs.readFile(filePath, (err, data) => {

      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading file.");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }

  else if (req.method === "POST" && req.url === "/add-task") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      try {

        const task = JSON.parse(body);

        const { id, taskName, assignedTo, status } = task;

        if (!id || !taskName || !assignedTo || !status) {
          res.writeHead(400, {
            "Content-Type": "application/json"
          });

          return res.end(
            JSON.stringify({
              message: "All fields are required"
            })
          );
        }

        tasks.push(task);

        res.writeHead(201, {
          "Content-Type": "application/json"
        });

        res.end(
          JSON.stringify({
            message: "Task added successfully",
            task
          })
        );

      } catch {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        res.end(
          JSON.stringify({
            message: "Invalid JSON Format"
          })
        );
      }
    });
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Route Not Found");
  }
});

server.listen(3000, () => {
  console.log("HTTP Server running at http://localhost:3000");
});