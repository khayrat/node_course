console.log('Before');
getUser(1, getRepositoriesCB);
console.log('After');

function getRepositoriesCB(user) {
  console.log('User', user);
  getRepositories(user.gitHubUsername, getCommitsCB);
}

function getCommitsCB(data) {
  console.log('data', data);
  getCommits(data.repos[0], displayCommitsCB);
}

function displayCommitsCB(data) {
  console.log('data', data);
}

// callback -> callback hell -> replace
// anon. function with named function
// promises
// async/await

function getUser(id, callback) {
  setTimeout(() => {
    console.log('reading a user form a db...');
    callback({ id: id, gitHubUsername: 'kalle' });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('calling github api for repos...');
    callback({username: username, repos: ['repo1', 'repo1', 'repo3']});
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log('calling github api for commits...');
    callback({repo: repo, commits: ['commit1', 'commit2', 'commit3']});
  }, 2000);
}
