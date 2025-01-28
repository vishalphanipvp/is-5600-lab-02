/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    generateUserList(userData, stocksData);

    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');

    // Register the event listener on the delete button
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);
        if (userIndex !== -1) {
            userData.splice(userIndex, 1);
            clearUserDetails(); // Clear user details when a user is deleted
            clearStockDetails(); // Clear stock details when a user is deleted
            generateUserList(userData, stocksData);
        }
    });

    // Register the event listener on the save button
    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const id = document.querySelector('#userID').value;
        const user = userData.find(user => user.id == id);
        if (user) {
            user.user.firstname = document.querySelector('#firstname').value;
            user.user.lastname = document.querySelector('#lastname').value;
            user.user.address = document.querySelector('#address').value;
            user.user.city = document.querySelector('#city').value;
            user.user.email = document.querySelector('#email').value;
            generateUserList(userData, stocksData);
        }
    });
});

/**
 * Loops through the users and renders a ul with li elements for each user
 * @param {*} users 
 */
function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = '';
    users.forEach(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = user.lastname + ', ' + user.firstname;
        listItem.setAttribute('id', id);
        userList.appendChild(listItem);
    });
    userList.removeEventListener('click', handleUserListClick);
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}

/**
 * Handles the click event on the user list
 * @param {*} event 
 */
function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);
    clearStockDetails(); // Clear stock details when a new user is selected
    populateForm(user);
    renderPortfolio(user, stocks);
}

/**
 * Populates the form with the user's data
 * @param {*} user 
 */
function populateForm(data) {
    const { user, id } = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
}

/**
 * Renders the portfolio items for the user
 * @param {*} user 
 */
function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = '';
    portfolio.map(({ symbol, owned }) => {
        const symbolEl = document.createElement('p');
        const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');
        symbolEl.innerText = symbol;
        sharesEl.innerText = owned;
        actionEl.innerText = 'View';
        actionEl.setAttribute('id', symbol);
        portfolioDetails.appendChild(symbolEl);
        portfolioDetails.appendChild(sharesEl);
        portfolioDetails.appendChild(actionEl);
    });
    portfolioDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            viewStock(event.target.id, stocks);
        }
    });
}

/**
 * Renders the stock information for the symbol
 * @param {*} symbol 
 */
function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
    if (stockArea) {
        const stock = stocks.find(s => s.symbol == symbol);
        document.querySelector('#stockName').textContent = stock.name;
        document.querySelector('#stockSector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent = stock.address;
        document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
}

/**
 * Clears the user details form
 */
function clearUserDetails() {
    document.querySelector('#userID').value = '';
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#email').value = '';
}

/**
 * Clears the stock details form
 */
function clearStockDetails() {
    document.querySelector('#stockName').textContent = '';
    document.querySelector('#stockSector').textContent = '';
    document.querySelector('#stockIndustry').textContent = '';
    document.querySelector('#stockAddress').textContent = '';
    document.querySelector('#logo').src = '';
}

