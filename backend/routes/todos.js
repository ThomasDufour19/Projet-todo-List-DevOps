const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Obtenir tous les todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer un todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un todo
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (req.body.text != null) {
      todo.text = req.body.text;
    }
    if (req.body.completed != null) {
      todo.completed = req.body.completed;
    }
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 