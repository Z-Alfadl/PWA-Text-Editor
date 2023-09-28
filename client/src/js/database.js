import { openDB } from 'idb';
//initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Function to update an IDB entry
export const putDb = async (content) => {
  console.log('Put request');
  const textDb = await openDB('jate', 1);
  const tx = textDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  //put creates a new entry if one doesnt exist with a value of content. If the entry already exists, it gets updated.
  const request = store.put({id: 1 , value: content});
  const result = await request;
  console.log("data saved to database", result)
}

//Function to get all entries in the database
export const getDb = async () => {
  console.log('Get Request');
  const textDb = await openDB('jate', 1);
  const tx = textDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log("data saved to database", result)
}
initdb();


