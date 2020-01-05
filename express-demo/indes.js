const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  {id: 1, name: 'course 1'},
  {id: 2, name: 'course 2'},
  {id: 3, name: 'course 3'},
];

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses); 
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send(`no course with id '${req.params.id}'`);

  res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {

  const result = {};
  result.params = req.params;
  result.query = req.query;
  res.send(result);
});

app.post('/api/courses', (req, res) => {
  console.log(req.body);
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send(`no course with id '${req.params.id}'`);

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send(`no course with id '${req.params.id}'`);

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
