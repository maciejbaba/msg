import express from "express";
import bodyParser from "body-parser";
import mysql, { Pool } from "mysql2/promise";
import cors from "cors";

const app = express();
const port = 3000;

// MySQL config
const pool: Pool = mysql.createPool({
  host: "localhost",
  user: "root", // Change this to your MySQL username
  password: "password", // Change this to your MySQL password
  database: "messenger",
});

app.use(cors());
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  return res.send({ message: "Hello World!" });
});

// Endpoint to send a message
app.post("/send", async (req, res) => {
  const { sender, recipient, content } = req.body;

  if (!sender) {
    return res.status(400).json({ message: "Missing sender" });
  }

  if (!recipient) {
    return res.status(400).json({ message: "Missing recipient" });
  }

  if (!content) {
    return res.status(400).json({ message: "Missing content" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO messages (sender, recipient, content) VALUES (?, ?, ?)",
      [sender, recipient, content]
    );
    return res.json({ success: true, messageId: (result as any).insertId });
  } catch (error) {
    return res.status(500).json({ message: "Error saving message", error });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM messages ORDER BY timestamp DESC"
    );
    return res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving messages", error });
  }
});

// Endpoint to get messages for a user
app.get("/messages/:user", async (req, res) => {
  const user = req.params.user;

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM messages WHERE recipient = ? ORDER BY timestamp DESC",
      [user]
    );
    return res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving messages", error });
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
