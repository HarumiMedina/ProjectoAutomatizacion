document.addEventListener("DOMContentLoaded", function () {
     const searchInput = document.querySelector("#search-dni");
     const matriculasTable = document.querySelector("#matriculas-table");
     searchInput.addEventListener("input", function () {
          const searchTerm = searchInput.value.toLowerCase();
          for (let i = 1; i < matriculasTable.rows.length; i++) {
               const dniCell = matriculasTable.rows[i].cells[4].textContent.toLowerCase();
               const row = matriculasTable.rows[i];
               if (dniCell.includes(searchTerm)) {
                    row.style.display = "";
               } else {
                    row.style.display = "none";
               }
          }
     });
});
