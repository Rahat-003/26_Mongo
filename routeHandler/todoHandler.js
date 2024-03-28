const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema); // it will create Todos. so model name should be in singular number.

// api er current root = localhost:3000/todo/

// Get all the todos
router.get("/", async (req, res) => {
    
});

// Get a todo by id
router.get("/:id", async (req, res) => {});

// Post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    await newTodo.save(); // model.save() return void promise. to accept promise, must use await
    console.log("todo saved succefully");
    res
      .status(200)
      .send("Todo was inserted successfully. congrats from try block");
  } catch (err) {
    console.log("Error saving todo");
    res.status(500).json({
      error: `Error sent from catch block of post '/' method`,
    });
  }
});

// Post multiple todo
router.post("/all", async (req, res) => {
  // const newTodo = await Todo.insertMany(req.body);
  try {
    await Todo.insertMany(req.body);
    console.log("All todos saved succefully");
    res
      .status(200)
      .send(
        `Todos were inserted successfully. congrats from try block of post '/all' method`,
      );
  } catch (err) {
    console.log("Error saving todo");
    res.status(500).json({
      error: `Error sent from catch block. sent from catch block of post '/all' method`,
    });
  }
});

// Put todo
router.put("/:id", async (req, res) => {
  // works fine
  // try{
  //     await Todo.updateOne({_id: req.params.id}, {
  //         $set: {
  //             status: 'active',
  //         }
  //     });
  //     res.status(200).json({
  //         message: 'Todo was updated successfully!',
  //     })
  // }
  // catch (err) {
  //     res.status(500).json({
  //         error: 'There was a server side error!'
  //     })
  // };

  try {
    const id = req.params.id; // Extract the document _id from the request params
    // Use findByIdAndUpdate to find the document by its _id and update it based on certain conditions
    const updatedDocument = await Todo.findByIdAndUpdate(
      id,
      { $set: req.body }, // Use $set to update specific fields
      { new: true }, // Return the updated document
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    } else {
      console.log("updated successfully");
      res.json(updatedDocument); // Send the updated document as response
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
