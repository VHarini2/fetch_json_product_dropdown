document.addEventListener('DOMContentLoaded', function() {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            populateDropdown(data.products);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
});

function populateDropdown(products) {
    const dropdown = document.getElementById('product-dropdown');

    products.forEach(product => {
        let option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.title;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', function() {
        const selectedId = this.value;
        fetchAndDisplayProduct(selectedId);
    });
}

function fetchAndDisplayProduct(selectedId) {
    fetch(`https://dummyjson.com/products/${selectedId}`)
        .then(response => response.json())
        .then(data => {
            populateTable([data]); // Display details of the selected product
        })
        .catch(error => {
            console.error('Error fetching product data: ', error);
        });
}

function populateTable(products) {
    const tableBody = document.getElementById('product-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear table content

    products.forEach(product => {
        let row = tableBody.insertRow();
        
        let cellId = row.insertCell(0);
        cellId.textContent = product.id;

        let cellTitle = row.insertCell(1);
        cellTitle.textContent = product.title;

        let cellDescription = row.insertCell(2);
        cellDescription.textContent = product.description;

        let cellStock = row.insertCell(3);
        cellStock.textContent = product.stock;

        let cellCategory = row.insertCell(4);
        cellCategory.textContent = product.category;

        let cellRatings = row.insertCell(5);
        cellRatings.textContent = product.rating;
    });
}
