console.log('Before');

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
      
    console.log('commits: ', commits);
  } catch (err) {
    console.log('Error: ', err);
  }
}
displayCommits();
console.log('After');


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
//      reject(new Error('failed to get repos.'));
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
