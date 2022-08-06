const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth')
const Task = require("../models/task");

router.get("/tasks",auth , async (req, res) => {
  const match ={}
  const sort ={}
  if(req.query.completed){
    match.completed= req.query.completed === 'true'
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]]=parts[1]==='desc'? -1 : 1 
  }
  try {
    // const tasks = await Task.find({});
    await req.user.populate({
      path : 'tasks',
      match,
      options:{
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }

  // Task.find({})
  //   .then((tasks) => {
  //     res.send(tasks);
  //   })
  //   .catch((e) => {
  //     res.send(500).send();
  //   });
});

router.get("/tasks/:id",auth, async (req, res) => {
  const _id = req.params.id;
  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({_id, owner:req.user._id})
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(404).send();
  //     }
  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

router.post("/tasks",auth , async (req, res) => {
  
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    reset.status(400).send(e);
  }

  // task
  //   .save()
  //   .then(() => {
  //     res.status(201).send(task);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });
});

router.delete("/tasks/:id",auth , async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id",auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates !" });
  }
  try {
    const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
    // const task = await Task.findById(req.params.id);
   
    await task.save();
    //   const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true,
    //   });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
