import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}

export async function getANote(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }
        res.json(note);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}

export async function createANote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}

export async function updateANote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNode = await Note.findByIdAndUpdate(req.params.id, { title, content }, {
            new: true,
        });

        if (!updatedNode) {
            return res.status(404).send("Note not found");
        }
        res.status(200).send(`note with id ${req.params.id} updated`);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}

export async function deleteANote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).send("Note not found");
        }
        res.status(200).send(`note with id ${req.params.id} deleted`);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}