// controllers/taskController.js
const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTask = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' });
        }
        
        if (req.body.title != null) {
            task.title = req.body.title;
        }
        if (req.body.description != null) {
            task.description = req.body.description;
        }
        if (req.body.completed != null) {
            task.completed = req.body.completed;
        }
        
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' });
        }
        
        await task.remove();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
