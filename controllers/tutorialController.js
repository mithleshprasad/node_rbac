const Tutorial = require("../models/Tutorial");

// Get all tutorials
const getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.json(tutorials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a tutorial
const createTutorial = async (req, res) => {
  const { title, content } = req.body;

  try {
    const tutorial = await Tutorial.create({
      title,
      content,
      createdBy: req.user.id,
    });
    res.status(201).json(tutorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a tutorial
const updateTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(tutorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a tutorial
const deleteTutorial = async (req, res) => {
  try {
    await Tutorial.findByIdAndDelete(req.params.id);
    res.json({ message: "Tutorial deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTutorials, createTutorial, updateTutorial, deleteTutorial };
