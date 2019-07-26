const AMOUNT_OF_USERS = 15;

const userSearchFieldUI = document.querySelector(".search-group--search-field");
const searchButtonUI = document.querySelector(".search-group--search-button");
const mainContentUI = document.querySelector(".main-content");
const usersListUI = document.querySelector(".users-list");
const headerUI = document.querySelector("header")

searchButtonUI.addEventListener("click", () => {
    fetch(`https://api.github.com/search/users?q=${userSearchFieldUI.value}`)
        .then(response => response.json())
        .then(res => {
            renderUsersList(res.items);
        })
        .catch(error => console.error(error));
});


// UI for search screen

function renderUsersList(usersList) {
    usersListUI.innerHTML = "";
    usersList.forEach((user) => {
        usersListUI.appendChild(createUserElement(user));
    });
}

function createUserElement(user) {
    const userListItem = document.createElement("li");
    userListItem.classList.add("user-card");
    userListItem.classList.add("card");
    userListItem.innerHTML =
        `<img class="user-card--avatar-img" src="${user.avatar_url}" alt="user photo" >
        <div>
            <h3 class="user-card--login">${user.login}</h3>
            <a class="btn user-card--repo-btn" href="#" onclick="renderRepos('${user.repos_url}','${user.login}','${user.avatar_url}')">Repositories</a>
            <a class="btn user-card--profile-btn" href = "${user.html_url}" target="_blank">Full Profile </a>
        </div>`
    return userListItem;
}

// UI for repositories screen
function renderRepos(reposURL, userName, userAvatar) {
    fetch(reposURL)
        .then(response => response.json())
        .then(res => {
            headerUI.innerHTML =
                `<img class="header--user-image" src="${userAvatar}" alt="user photo" >            
                <h1 class="header--user-title">${userName}'s Repositories (${reposURL.length})</h1>`;
            renderReposList(res);
        })
        .catch(error => console.error(error));
}

function renderReposList(reposList) {
    mainContentUI.innerHTML = '';
    const reposListUI = document.createElement('ul');
    reposListUI.classList.add('items-list');
    reposListUI.classList.add('repos-list');
    mainContentUI.appendChild(reposListUI);

    reposList.forEach((repo) => {
        reposListUI.appendChild(createRepoElement(repo));
    });
}

function createRepoElement(repo) {
    const repoListItem = document.createElement("li");
    repoListItem.classList.add("card");
    repoListItem.classList.add("repo-card");
    repoListItem.innerHTML =
        `<h3 class="repo-card--full-name"> ${repo.full_name}</h3>
        <div class="repo-card--privacy"> ${repo.private ? "Private" : "Public"}</div>
        <div class="repo-card--forks"> Forks: ${repo.forks_count}</div>
        <div class="repo-card--watchers"> Watchers: ${repo.watchers_count}</div>
        <div class="repo-card--url"> Url: <a href="${repo.html_url}">${repo.html_url}</a></div> `
    return repoListItem;
}