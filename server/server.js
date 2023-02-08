const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const uniqid = require('uniqid')

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let data = [
    {id: uniqid(), name: "Sakhia", completed: true},
    {id: uniqid(), name: "Laundry", completed: false},
    {id: uniqid(), name: "Calling Brother", completed: true}
]

app.get("/", (req, res) => {
  res.json(data);
});

app.post("/", (req, res) => {
    // console.log(req.body.task)
    data.push({id: uniqid(), name: req.body.task, completed: false})
    res.json(data);
  });

  app.put("/", (req, res) => {
    console.log(req.body.key)
    data[req.body.key].completed = !data[req.body.key].completed
    res.json(data);
  });

  app.delete("/", (req, res) => {
    console.log(req.query)
    data = data.filter((e, index) => {
        return index != req.query.key
    })
    res.json(data);
  });

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

