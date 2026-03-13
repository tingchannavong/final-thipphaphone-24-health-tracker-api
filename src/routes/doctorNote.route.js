import express from "express";

const notesRouter = express.Router();

notesRouter.post('/', );
notesRouter.get('/my-notes', );
notesRouter.get('/user/:userId',  );
notesRouter.get('/received',  );
notesRouter.put('/:id',  );
notesRouter.delete('/:id',  );

export default notesRouter;