const searchInput = document.getElementById('searchInput');
const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
const originalTableData = []; // Store the original table data here

// Example data, replace with your actual data
const data = [
    { id: 1, name: 'Item 1', category: 'Category A' },
    { id: 2, name: 'Item 2', category: 'Category B' },
    // ... more data ...
];

// Populate the table and store original data
function populateTable(data) {
    originalTableData.length = 0; // Clear the original data array
    dataTable.innerHTML = ''; // Clear the table body

    data.forEach(item => {
        originalTableData.push(item);
        const row = dataTable.insertRow();
        row.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>${item.category}</td>`;
    });
}

// Function to filter the table based on search input
function filterTable() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = originalTableData.filter(item => {
        return item.name.toLowerCase().includes(searchTerm) ||
               item.category.toLowerCase().includes(searchTerm);
    });
    populateTable(filteredData);
}

// Initial population of the table
populateTable(data);

// Attach event listener to search input
searchInput.addEventListener('input', filterTable);












