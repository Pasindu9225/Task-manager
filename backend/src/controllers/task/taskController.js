import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/taskModel.js";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Please add a title" });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({ message: "Please add a description" });
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      status,
      priority,
      user: req.user._id,
    });

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.log("Error creating task: ", error);
    res.status(500).json({ message: "Cannot create task" });
  }
});

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;

    if (!userid) {
      return res.status(400).json({ message: "User not found" });
    }

    const tasks = await TaskModel.find({ user: userid });

    if (!tasks) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error getting tasks: ", error);
    res.status(500).json({ message: error.message });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "provide valid id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!task.user.equals(userid)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log("Error getting task: ", error);
    res.status(500).json({ message: error.message });
  }
});
