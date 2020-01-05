console.log('Before');
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('commits: ', commits))
  .catch(err => console.log('Error: ', err));

console.log('After');

// callback -> callback hell -> replace
// anon. function with named function
// promises
// async/await

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('reading a user form a db...');
      resolve({ id: id, gitHubUsername: 'kalle' });
    }, 2000);
  });

}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('calling github api for repos...');
      resolve(['repo1', 'repo1', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('calling github api for commits...');
      resolve(['commit1', 'commit2', 'commit3']);
    }, 2000);
  });
}
