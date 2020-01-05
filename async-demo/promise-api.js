const p = Promise.resolve({id: 1});
//const p = Promise.reject(new Error('s.th. went wrong.'));

p
  .then(result => console.log(result))
  .catch(err => console.log('Error: ', err));


const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log('async op1...');
    resolve(1);
  }, 4000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log('async op2...');
    resolve(2);
  }, 2000);
});

/*
Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log('error: ', err));
*/

Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log('error: ', err));
