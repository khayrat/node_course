console.log('Before');
getUser(1, (user) => {
  console.log('User', user);

  getRepositories(user.gitUsername, repos => {
    console.log('repos', repos);
  });
});
console.log('After');


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
    console.log('calling github api...');
   callback(['repo1', 'repo1', 'repo3']);
  }, 2000);
}
