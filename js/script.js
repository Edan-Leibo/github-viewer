const AMOUNT_OF_USERS = 15;

const userSearchFieldUI = document.querySelector(".user-search-field");
const searchButtonUI = document.querySelector(".user-search-submit");
const mainContentUI = document.querySelector(".main-content");
const headerUI = document.querySelector("header")

searchButtonUI.addEventListener("click", () => {
    fetch(`https://api.github.com/search/users?q=${userSearchFieldUI.value}`)
        .then(response => response.json())
        .then(res => {
            renderEmptyUsersList();
            renderUsersList(res.items);
        })
        .catch(error => console.error(error));
});


// UI for search screen
function renderEmptyUsersList() {
    mainContentUI.innerHTML = `
    <li class="users-list">
    </li>
    `
}

function renderUsersList(usersList) {
    usersList.forEach((user) => {
        const usersListUI = document.querySelector(".users-list");
        usersListUI.appendChild(createUserElement(user));
    });
}

function createUserElement(user) {
    const userListItem = document.createElement("li");
    userListItem.innerHTML =
        `<img src="${user.avatar_url}" alt="login name">
        <h3>${user.login}</h3>
        <a href="#" onclick="renderRepos('${user.repos_url}','${user.login}')">Repositories</a>
        <a href = "${user.html_url}" target="_blank">Full Profile </a>`
    return userListItem;
}

// UI for repositories screen
function renderRepos(reposURL, userName) {
    fetch(reposURL)
        .then(response => response.json())
        .then(res => {
            const headerPageHeadingUI = document.querySelector("header h1")
            headerPageHeadingUI.textContent = userName;
            //renderReposHeader();
            renderReposList(res);
        })
        .catch(error => console.error(error));
}

function renderReposHeader() {
}

function renderReposList(reposList) {
    mainContentUI.innerHTML = "";
    reposList.forEach((repo) => {
        mainContentUI.appendChild(createRepoElement(repo));
    });
}

function createRepoElement(repo) {
    const repoListItem = document.createElement("li");
    repoListItem.innerHTML =
        `<h3> ${repo.full_name}</h3 >
        <div class="privacy"> ${repo.private ? "Private" : "Public"}</div>
        <div class="forks"> Forks:${repo.forks_count}</div>
        <div class="watchers"> Watchers:${repo.watchers_count}</div>
        <div class="url"> Url:${repo.html_url}</div>`
    return repoListItem;
}