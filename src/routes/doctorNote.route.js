import express from "express";

const notesRouter = express.Router();

notesRouter.post('/', (re, res) => {} );
notesRouter.get('/my-notes', (re, res) => {} );
notesRouter.get('/user/:userId',  (re, res) => {} );
notesRouter.get('/received',  (re, res) => {} );
notesRouter.put('/:id', (re, res) => {}  );
notesRouter.delete('/:id',  (re, res) => {} );

export default notesRouter;