const express = require("express");
const cors = require("cors");
const path = require("path");
const { getKanban, updateKanban } = require("./controllers/kanbanController");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (como o index.html gerado pelo React)
app.use(express.static(path.join(__dirname, "../dist"))); // para produção
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Rotas da API
app.get("/api/kanban", getKanban);
app.post("/api/kanban", updateKanban);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
