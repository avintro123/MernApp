import mongoose from "mongoose";

// 1-> create a schema
// 2-> model based on schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    pdf: {
        type: String,
        required: false,
    },
},
    {
        timestamps: true,
    });

const Note = mongoose.model("Note", noteSchema);

export default Note;