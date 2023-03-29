const fillTable = (id, data) => {
    let table = document.getElementById(id);
    let tableBody = table.children[1];

    if (!tableBody) {
        tableBody = document.createElement("tbody");
        table.appendChild(tableBody);
    }

    console.log(data);

    for (let record of data) {
        let row = document.createElement("tr");
        let keys = Object.keys(record);

        for (let key of keys) {
            let cell = document.createElement("td");
            cell.innerText = record[key];

            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }
};

window.onload = () => {
    fetch("http://localhost:5000/api/authors")
    .then((res) => res.json())
    .then((data) => data["value"])
    .then((data) => fillTable("authors-table", data))
    .catch((err) => alert(err));
};