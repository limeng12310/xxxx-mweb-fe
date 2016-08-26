
const apiPrefix = 'http://test.thorgene.com/thorgene-mweb-api';

fetch(`${apiPrefix}/isNewUser`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (response.status === 200) {
    return response.json();
  }
  throw new Error;
})
.then(json => {
  console.log(json.retCode);
  window.location.replace('app-home.html');
})
.catch(err => {
  // TODO
  console.log(err);
});