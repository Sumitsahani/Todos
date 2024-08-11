// Add Data in localStorage
let main = document.querySelector(".main");
let table = document.querySelector(".table");

main.addEventListener("submit", (e) => {
    let name = e.target.User.value;
    let priority = e.target.Priority.value;
    let status = e.target.Status.value;

    // Get data from localStorage ---error handler
    let data = JSON.parse(localStorage.getItem("Data")) ?? [];

    // Push new data into the array
    data.push({
        "name": name,
        "priority": priority,
        "status": status
    });

    // Save updated data back to localStorage
    localStorage.setItem("Data", JSON.stringify(data));

    displayData();

    e.preventDefault();
});

let displayData = () => {
    let data = JSON.parse(localStorage.getItem("Data")) ?? [];
    let tableData = "";

    data.forEach((ele, idx) => {
        tableData += `
                <tr>
                    <td>${ele.name}</td>
                    <td>${ele.priority}</td>
                    <td>
                        <button class="toggle">${ele.status === 'pending' ? '⏳ Pending' : '✅ Complete'}</button>
                    </td>
                    <td>
                        <button class="archiveBtn delete-button" onclick="archiveTask(${idx})">Archive</button>
                    </td>
                </tr>
        `;
    });

    table.innerHTML = tableData;
}

let archiveTask = (index) => {
    // Get data from localStorage
    let data = JSON.parse(localStorage.getItem("Data")) ?? [];
    let archivedData = JSON.parse(localStorage.getItem("ArchivedData")) ?? [];

    // Move the task to archive
    archivedData.push(data[index]);
    data.splice(index, 1);

    // Update localStorage
    localStorage.setItem("Data", JSON.stringify(data));
    localStorage.setItem("ArchivedData", JSON.stringify(archivedData));

    // Refresh the display
    displayData();
}

displayData(); // Initial call to display data
