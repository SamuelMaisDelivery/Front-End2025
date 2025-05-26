import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Front/NavBar"; // ajuste conforme seu projeto

export default function CadastroDisciplina() {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    buscarDisciplinas();
  }, []);

  const buscarDisciplinas = async () => {
    try {
      const response = await axios.get("/painel/assets/disciplinas");
      setDisciplinas(response.data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  };

  const cadastrarDisciplina = async () => {
    if (!nome || !codigo) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await axios.post("/painel/assets/disciplinas", { nome, codigo });
      setNome("");
      setCodigo("");
      buscarDisciplinas();
    } catch (error) {
      console.error("Erro ao cadastrar disciplina:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cadastro-container">
        <h2>Cadastro de Disciplinas</h2>

        <div className="formulario">
          <input
            type="text"
            placeholder="Nome da Disciplina"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <button onClick={cadastrarDisciplina}>Cadastrar</button>
        </div>

        <h3>Disciplinas Cadastradas</h3>
        <div className="lista-professores">
          {disciplinas.map((disc, index) => (
            <div className="card-professor" key={index}>
              <strong>{disc.nome}</strong>
              <p>Código: {disc.codigo}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
