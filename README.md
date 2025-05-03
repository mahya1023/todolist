# todolist
html , css , js
# To-Do List Project with IndexedDB

This project is a **to-do list** application that stores user data using **IndexedDB**, instead of relying on temporary storage or server-based databases. IndexedDB is a built-in browser database that allows structured, **offline, and persistent** data storage.

## Features
- **Local data storage**, eliminating the need for an internet connection
- **Fast and dynamic task management**
- **CRUD operations (Create, Read, Update, Delete)** using IndexedDB
- **Simple and responsive UI** built with HTML, CSS, and JavaScript

## How IndexedDB Works in This Project
1. We create a database called **TodoDB** and set up an **object store** to store tasks.
2. The application interacts with IndexedDB using APIs such as `open()`, `transaction()`, `objectStore()`, and `add()`.
3. Each task entry includes an **ID, task text, completion status**, and other related details.
4. When the page loads, previously stored tasks are fetched and displayed.
5. Users can **add, edit, or delete** their tasks, and changes are saved locally.

## Installation & Usage
1. Download and run the code in a web browser.
2. Ensure your browser supports IndexedDB.
3. Manage your tasks, and they will be automatically stored in IndexedDB.

## Contribution
If you'd like to enhance the project, feel free to add new features or optimize the data storage approach.

For more details about IndexedDB, check out the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).


