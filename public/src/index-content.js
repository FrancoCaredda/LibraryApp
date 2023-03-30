var selectedRows = [];

const createTableRow = (record) => {
    let row = document.createElement("tr");
    let keys = Object.keys(record);
    let checkBoxCell = document.createElement("td");
    let checkBox = document.createElement("input");
    
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("form-check-input");
    checkBox.addEventListener("change", selectRow);
    checkBox.id = `table-select-id-${record["id"]}`;
    checkBoxCell.appendChild(checkBox);

    row.appendChild(checkBoxCell);

    for (let key of keys) {
        let cell = document.createElement("td");
        cell.innerText = record[key];

        row.appendChild(cell);
    }

    return row;
}

const fillTable = (id, data) => {
    let table = document.getElementById(id);
    let tableBody;

    table.childNodes.forEach((element => {
        if (element.nodeName === "TBODY") {
            tableBody = element;
        }
    }));

    if (!tableBody) {
        tableBody = document.createElement("tbody");
        table.appendChild(tableBody);
        console.log(1);
    }

    for (let record of data) {
        let row = createTableRow(record);
        tableBody.appendChild(row);
    }
};

const selectRow = (event) => {
    let checkBox = event.srcElement;
    let checkboxId = checkBox.id;
    let id = checkboxId.split("-").pop();

    if (checkBox.checked) {
        selectedRows.push(id);
    } else {
        let index = selectedRows.indexOf(id);
        let temp = selectedRows[index];
        selectedRows[index] = selectedRows[selectedRows.length - 1];
        selectedRows[selectedRows.length - 1] = temp;

        selectedRows.pop();
    }
};

const deleteBtnPressed = (event) => {
    selectedRows.forEach((id) => {
        fetch(`http://localhost:5000/api/authors/${id}`, {
            method: "DELETE"
        }).catch((err) => alert(err));
    });

    window.location.reload();
};

const updateBtnPressed = (event) => {
    window.location.replace('http://localhost:5000/authors-update.html');
};

window.onload = () => {
    fetch("http://localhost:5000/api/authors")
    .then((res) => res.json())
    .then((data) => data["value"])
    .then((data) => fillTable("authors-table", data))
    .catch((err) => alert(err));
};