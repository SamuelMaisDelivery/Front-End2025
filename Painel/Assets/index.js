const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let schedule = {
  Professores: ["Prof. Ana", "Prof. João", "Prof. Carla"],
  Segunda: [],
  Terça: [],
  Quarta: [],
  Quinta: [],
  Sexta: [],
};

app.get("/agenda", (req, res) => {
  res.json(schedule);
});

app.post("/agenda", (req, res) => {
  schedule = req.body;
  res.json({ success: true, message: "Agenda atualizada com sucesso." });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
