document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
  });
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api.github.com/search/users?q=type:user&per_page=10');
      const data = await response.json();
      const users = data.items;
      renderUserList(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const renderUserList = (users) => {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.className = 'card';
      userCard.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
        <span>${user.login}</span>
      `;
      userCard.addEventListener('click', () => fetchUserDetails(user.login));
      userList.appendChild(userCard);
    });
  };
  
  const fetchUserDetails = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userDetails = await response.json();
      const reposResponse = await fetch(userDetails.repos_url);
      const repos = await reposResponse.json();
      renderUserDetails(userDetails, repos);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
  const renderUserDetails = (user, repos) => {
    const userDetailsDiv = document.getElementById('user-details');
    userDetailsDiv.style.display = 'block';
    userDetailsDiv.innerHTML = `
      <div class="user-details-card">
        <img src="${user.avatar_url}" alt="${user.login}" width="100" height="100">
        <h2>${user.login}</h2>
        <h3>Repositories</h3>
        <ul>
          ${repos.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('')}
        </ul>
      </div>
    `;
  };
  