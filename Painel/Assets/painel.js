document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastroForm");
    const table = document.getElementById("resultTable").getElementsByTagName("tbody")[0];
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const dataNascimento = document.getElementById("dataNascimento").value;
  
      const newRow = table.insertRow();
      newRow.innerHTML = `
        <td style="border: 1px solid #333; text-align:center">${nome}</td>
        <td style="border: 1px solid #333; text-align:center">${email}</td>
        <td style="border: 1px solid #333; text-align:center">${dataNascimento}</td>
      `;
  
      form.reset();
    });
  });
  