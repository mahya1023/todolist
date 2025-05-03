 //step 1 : add function with button ,write new do => save in database clint
 let db;
 let newElemnt;
 let newtime;
 let box;
 let box2;
 let deletBtn3;
 let doneBoxmark;
 let doneBox;
 let deletBtn4 = [];
 const Enter = document.querySelector(".Enter");
 const input = document.querySelector(".input");
 const ulelement = document.querySelector("#oldDo2");
 const ulelementS = "oldDo2";

 //databaes in clint
 //made table
 function opanDatabase() {
     const request = window.indexedDB.open("do", 1);
     request.onupgradeneeded = function(event) {
         let db = event.target.result;
         const store = db.createObjectStore("dolist", { keyPath: "id" });
         console.log("database structure created");
     }
     request.onsuccess = function(event) {
         db = event.target.result;
         console.log("database Opened susseccfully");
     }
     request.onerror = function(event) {
         console.log("error opening databaese :", event.target.error);
     }
 }
 //updat edit data 
 function updat(markdone, id) {
     console.log(typeof markdone);
     const nowdate = new Date();
     newtime = nowdate.getTime();
     const request = window.indexedDB.open("do", 1);
     request.onsuccess = function(event) {
         let db = event.target.result;
         const transaction = db.transaction(['dolist'], 'readwrite');
         const store = transaction.objectStore('dolist');
         const record = store.get(id);
         record.onsuccess = function() {
             let data = record.result;
             if (data) {
                 data.done = markdone;
                 let updateRequest = store.put(data);
                 updateRequest.onsuccess = function() {
                     console.log("be came update");
                 }
                 updateRequest.onerror = function() {
                     console.log("record not found");
                 }
             }

         }

     }
 }
 //delet data 
 function deletData(id) {
     console.log(id);
     const request = window.indexedDB.open("do", 1);
     request.onsuccess = function(event) {
         let db = event.target.result;
         const transaction = db.transaction(['dolist'], 'readwrite');
         const store = transaction.objectStore('dolist');
         let requstdelet = store.delete(id);
         requstdelet.onsuccess = function() {
             console.log("record found proceding with delet ...")
         }
         requstdelet.onerror = function() {
             console.log("fail")
         }
     }
 }
 //clear data 
 function clearatDatabaese() {
     const request = window.indexedDB.open("do", 1);
     request.onsuccess = function(event) {
         let db = event.target.result;
         const transaction = db.transaction(['dolist'], 'readwrite');
         const store = transaction.objectStore('dolist');
         let clearRequest = store.clear();
         clearRequest.onsuccess = function() {
             console.log("all data was clear");
         }
     }
 }

 //add in table
 function addtoDatabaese(str, done) {
     console.log(done);
     const nowdate = new Date();
     newtime = nowdate.getTime();

     if (!db) {
         console.log("database is not open")
         return;
     }
     const transaction = db.transaction(['dolist'], 'readwrite');
     const Store = transaction.objectStore('dolist');
     Store.add({ id: newtime, do: str, done: false });


 }
 //get date at table 
 function GetData(id, callback) {
     let request = indexedDB.open("do", 1);
     request.onsuccess = function() {
         let db = request.result;
         let transaction = db.transaction("dolist", "readonly");
         let store = transaction.objectStore("dolist");
         let getRequest = store.get(id);
         getRequest.onsuccess = function() {
             callback(getRequest.result);
         };
         getRequest.onerror = function() {
             console.log(" we get fail");
         };

     }

 }
 //get all data 
 function loadDataFromIndexedDB() {
     let request = indexedDB.open("do", 1);
     request.onsuccess = function() {
         let db = request.result;
         let transaction = db.transaction("dolist", "readonly");
         let store = transaction.objectStore("dolist");
         let getAllRequest = store.getAll();
         getAllRequest.onsuccess = function() {
             for (let i = 0; i < getAllRequest.result.length; i++) {
                 makeEement(getAllRequest.result[i].do, getAllRequest.result[i].id);
                 if (getAllRequest.result[i].done) {
                     doneBox.style.background = "green";
                     doneBox.innerHTML = ` <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="snow" d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"/></svg>`;
                 }
             }
         };
         getAllRequest.onerror = function() {
             console.log(" we get fail");
         };

     }

 }
 //make element 
 function makeEement(value, newtime) {
     ulelement.style.display = "flex";
     box = document.createElement("li");


     box.classList.add("Box");
     //set attrabiuete
     box2 = box.setAttribute("box_id", newtime);
     //donebox 
     doneBox = document.createElement("button");
     doneBox.innerText = "";


     doneBox.classList.add("DonBox");
     doneBoxmark = false;
     //delete
     let deletBtn = document.createElement("button");
     deletBtn.innerText = "delet";
     deletBtn3 = deletBtn.classList.add("deletBtn2");
     deletBtn4.push(deletBtn);
     //div 
     divParents = document.createElement("div");
     divlaue = document.createElement("div");
     divParents.innerText = "";
     divlaue.innerText = value;
     divlaue.classList.add("divlaue");
     divParents.classList.add("divParents");

     // box.appendChild(EditBtn);
     divParents.appendChild(doneBox);
     divParents.appendChild(deletBtn);
     box.appendChild(divlaue);
     box.appendChild(divParents);
     ulelement.appendChild(box);
 }

 Enter.addEventListener("click", () => {
     if (input.value != "") {
         console.log("we full");
         const inputData = input.value;
         addtoDatabaese(inputData, doneBoxmark);
         GetData(newtime, function(data) {
             makeEement(data.do, newtime);

         });
         input.value = "";
     } else {
         alert("Enter your praogram");
     }
 });

 document.addEventListener("click", function(event) {
     if (event.target.classList.contains("deletBtn2")) {
         let item = event.target.parentElement.parentElement;
         console.log(item);
         item.remove();
         let itemID = event.target.parentElement.parentElement.getAttribute("box_id");
         deletData(Number(itemID));
     }
     if (event.target.classList.contains("DonBox")) {
         let item = event.target;
         let itemID = event.target.parentElement.parentElement.getAttribute("box_id");
         item.style.background = "lightgreen";
         item.innerHTML = ` <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="snow" d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"/></svg>`;
         console.log(item.innerHtml);
         if (item.style.background = "green") {
             doneBoxmark = true;
             updat(doneBoxmark, Number(itemID));
         }
     }
 });
 opanDatabase();

 window.onload = function() {
         loadDataFromIndexedDB();
         //clearatDatabaese();
     }
     /* (open database) when became load page : 
             1.دیتابیس رو باز میکنیم 
             2.اگه دیتابیس قبلا داشته باشیم که هیچ نداشته باشیم ایجاد میکند
             3.برای وارد شدن به دنیای دیتابیس متغیر db  را می سازیم 
             4.توی این دیتابیس یه جدول باز میکنیم مسخصه را یا باز میکنیم یا ایجاد میکنیم
             5.بعد چک مکینم به درستی جدول و دیتا بیس ما باز شده یا نه 
             6.برای انجام عملیات ادد کردن از متد ترنسیکیشن استفاده میکنیم تا علاوه بر خوانده جدول در ان بنویسیم 
             7.در متغیری داده های تغیراتی که میخواهیم انجام بدیم را ذخیره میکنیم
             8.حالا تغییراتی که میخواهیم را با خواندن متغیر ذخیره اعمال میکنیم 
 
              */