const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
  {id: 1, name: 'action'},
  {id: 2, name: 'humor'},
  {id: 3, name: 'drama'},
];

router.get('/', (req, res) => {
  res.send(genres); 
});

router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send(`no genre with id '${req.params.id}'`);

  res.send(genre);
});

router.post('/', (req, res) => {
  console.log(req.body);
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

router.put('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send(`no course with id '${req.params.id}'`);

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send(`no genre with id '${req.params.id}'`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateCourse(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
