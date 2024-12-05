// controllers/people.js
const { people } = require("../data.js");

const getPeople = (req, res) => {
  res.status(200).json(people);
};

const addPerson = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ success: false, message: "Please provide a name" });
  }
  const newPerson = { id: people.length + 1, name: req.body.name };
  people.push(newPerson);
  res.status(201).json({ success: true, name: req.body.name });
};

const getPersonById = (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id));
  if (!person) {
    return res.status(404).json({ message: "That person was not found" });
  }
  res.status(200).json(person);
};

const updatePerson = (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id));
  if (!person) {
    return res.status(404).json({ message: "That person was not found" });
  }
  person.name = req.body.name || person.name;
  res.status(200).json(person);
};

const deletePerson = (req, res) => {
  const personIndex = people.findIndex((p) => p.id === parseInt(req.params.id));
  if (personIndex === -1) {
    return res.status(404).json({ message: "That person was not found" });
  }
  people.splice(personIndex, 1);
  res.status(200).json({ message: "Person deleted" });
};

module.exports = { addPerson, getPeople, getPersonById, updatePerson, deletePerson };
