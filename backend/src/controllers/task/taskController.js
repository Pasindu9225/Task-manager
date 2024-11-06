import asyncHandler from "express-async-handler";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Please add a title" });
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
  } catch (error) {}
});
