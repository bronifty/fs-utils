const fakeServer = {
  fetch() {
    localStorage.setItem('3rd-party-cookie', 'goog');
    return { users: 0 };
  },
};

const result = fakeServer.fetch();
console.log(localStorage.getItem('3rd-party-cookie'));

/* ---  usage --- */
// node --experimental-webstorage --localstorage-file=test.db ./reference/node-local-storage.ts
/* ---  result --- */
// goog
/* ---  note --- */
