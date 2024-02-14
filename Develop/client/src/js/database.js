import { openDB } from 'idb';

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
  });  // check indexdb for 'jate' database, if not found, create it



// Logic to add content to the database
export const putDb = async (content) => {
  const db = await initdb(); // the database is opened
  const tx = db.transaction('jate', 'readwrite');  // a transaction is created
  console.log(tx);


  const store = tx.objectStore('jate');  // the object store is created
  console.log(store); 

  // the content is added to the object store

  await store.add({ content });  // does this need to be a string?  or is it already a string?  or is it an object?
  
  await tx.done;

  console.log('Content added to the database:', content);
};

// Logic to get all content from the database
export const getDb = async () => {
  const db = await initdb();  // the database is opened

  const tx = db.transaction('jate', 'readonly'); 
  

  const store = tx.objectStore('jate');
  const allContent = await store.getAll();
  await tx.done;
  
  console.log(typeof allContent);


  console.log('All content retrieved from the database:', allContent);
  return allContent;
};

initdb();