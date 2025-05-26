import React from "react";
import "./../Styles/styles.css"; // Ajuste o caminho se necessário

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><strong>Sistema Escolar</strong></li>
        <li><a href="#">Cadastro de professores</a></li>
        <li><a href="#">Horário dos professores</a></li>
        <li><a href="#">Informações gerais</a></li>
      </ul>
    </nav>
  );
}
