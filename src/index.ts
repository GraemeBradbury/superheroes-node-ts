import express from 'express';
import { battle, battleWithGetCharacters } from './battle';
import { getCharacters, Character } from './getCharacters'

const app = express();

app.get('/battle', (req, res) => {

  if(typeof req.query.hero === 'string' && typeof req.query.villain === 'string'){
    const result = battleWithGetCharacters(req.query.hero, req.query.villain)
    res.send(result);
  }
  res.send(400);
});

export default app;