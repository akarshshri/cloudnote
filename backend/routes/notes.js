const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



// ROUTE 1: get all notes: GET "/api/auth/createuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    //console.log(notes)
    var fetchedNotes = await notes.find({ user: req.user.id })
    res.json(fetchedNotes)
})


// ROUTE 2: Add Note: POST "/api/auth/addnote". Login required

router.get('/fetchallnotes', fetchuser, [

    body('title', 'Title should be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'description should be atleast 3 characters').isLength({ min: 5 }),

], async (req, res) => {
    try {


        const { title, description, tag } = req.body;

        //if error, return Bad Status and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})



module.exports = router