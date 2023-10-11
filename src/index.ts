import express from 'express';
import { battle } from './battle';
import { getCharacters, Character } from './getCharacters'

const app = express();

app.get('/battle', (req, res) => {

  if(typeof req.query.hero === 'string' && typeof req.query.villain === 'string'){
    const result = battle(req.query.hero, req.query.villain)
    res.send(result);
  }
  res.send(400);
});

export default app;