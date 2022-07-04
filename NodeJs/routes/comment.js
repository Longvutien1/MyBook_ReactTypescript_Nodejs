
import express from 'express';
import { addComment, listComment } from '../controllers/comments';

const routerComment = express.Router();

routerComment.post('/comments', addComment);
routerComment.get('/comments', listComment);
export default routerComment;