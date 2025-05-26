const { readData, writeData } = require("../Model/kanbanModel.js");

const getKanban = (req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao ler os dados." });
  }
};

const updateKanban = (req, res) => {
  try {
    writeData(req.body);
    res.json({ message: "Estado salvo com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar os dados." });
  }
};

module.exports = { getKanban, updateKanban };
