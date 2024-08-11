let archiveTable = document.querySelector(".archiveTable");

let displayArchivedData = () => {
  let archivedData = JSON.parse(localStorage.getItem("ArchivedData")) ?? [];
  let tableData = `
        <thead>
            <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;

  archivedData.forEach((ele, idx) => {
    tableData += `
            <tr>
                <td>${ele.name}</td>
                <td>${ele.priority}</td>
                <td>${ele.status}</td>
                <td>
                    <button class="restoreBtn" onclick="restoreTask(${idx})">Restore</button>
                    <button class="deleteBtn" onclick="deleteTask(${idx})">Delete</button>
                </td>
            </tr>
        `;
  });

  tableData += `</tbody>`;
  archiveTable.innerHTML = tableData;
};

// Restore task function
let restoreTask = (index) => {
  let data = JSON.parse(localStorage.getItem("Data")) ?? [];
  let archivedData = JSON.parse(localStorage.getItem("ArchivedData")) ?? [];

  // Restore the task
  data.push(archivedData[index]);
  archivedData.splice(index, 1);

  // Update localStorage
  localStorage.setItem("Data", JSON.stringify(data));
  localStorage.setItem("ArchivedData", JSON.stringify(archivedData));

  displayArchivedData();
};

// Delete task function
let deleteTask = (index) => {
  let archivedData = JSON.parse(localStorage.getItem("ArchivedData")) ?? [];

  // Delete the task
  archivedData.splice(index, 1);

  // Update localStorage
  localStorage.setItem("ArchivedData", JSON.stringify(archivedData));

  displayArchivedData();
};

displayArchivedData(); // Initial call to display archived data
