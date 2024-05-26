// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, updateDoc,setDoc} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq7OU5i2WgamVcWwXtvLTjP20L5449HJo",
  authDomain: "prrrr-b7e19.firebaseapp.com",
  projectId: "prrrr-b7e19",
  storageBucket: "prrrr-b7e19.appspot.com",
  messagingSenderId: "739124303183",
  appId: "1:739124303183:web:7058f38824dbedc6b3613a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
let colRef = collection(db, "datas");

let name, data, data2, id;

// Writing data
function addData() {
  name = document.querySelector(".name").value;
  data = document.querySelector(".data").value;
  data2 = document.querySelector(".data2").value;

  addDoc(colRef, {
    name: name,
    data: data,
    data2: data2,
  })
    .then((docRef) => {
      console.log("Document written with ID", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document:", error);
    });
}

function addDataWithId() {
  name = document.querySelector(".name").value;
  data = document.querySelector(".data").value;
  data2 = document.querySelector(".data2").value;
  id = document.querySelector(".id").value; // Get the ID from input

  const docRef = doc(db, "datas", id); // Create a document reference with the specified ID
  setDoc(docRef, {
    name: name,
    data: data,
    data2: data2,
  })
  .then(() => {
    console.log("Document written with ID", id);
  })
  .catch((error) => {
    console.error("Error adding document:", error);
  });
}

// Get single document data
function getData() {
  const docRef = doc(db, "datas", id);
  onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      console.log(doc.data(), doc.id);
    } else {
      console.log("No such document!");
    }
  }, (error) => {
    console.error("Error getting document:", error);
  });
}

// Update data
function updateData() {
  name = document.querySelector(".name").value;
  data = document.querySelector(".data").value;
  data2 = document.querySelector(".data2").value;

  const docRef = doc(db, "datas", id);
  updateDoc(docRef, {
    name: name,
    data: data,
    data2: data2,
  })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document:", error);
    });
}

// Delete data
function deleteData() {
  const docRef = doc(db, "datas", id);
  deleteDoc(docRef)
    .then(() => {
      console.log("Document deleted with ID", id);
    })
    .catch((error) => {
      console.error("Error deleting document:", error);
    });
}

// Get all data
function getAll() {
  getDocs(colRef)
    .then((querySnapshot) => {
      let datas = [];
      querySnapshot.docs.forEach((doc) => {
        datas.push({ ...doc.data(), id: doc.id });
      });
      console.log(datas);
      let allElement = document.querySelector(".all");
      allElement.innerHTML = ""; // Clear previous data
      for (let i = 0; i < datas.length; i++) {
        allElement.innerHTML += datas[i].name + " " + datas[i].data + " " + datas[i].data2 + "<br>";
      }
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
}

// Real-time listener for all documents
onSnapshot(colRef, (querySnapshot) => {
  let datas = [];
  querySnapshot.docs.forEach((doc) => {
    datas.push({ ...doc.data(), id: doc.id });
  });
  console.log(datas);
  document.querySelector(".all").innerHTML = "<br><br>"; // Clear previous data
  for (let i = 0; i < datas.length; i++) {
    document.querySelector(".all").innerHTML += datas[i].name + " " + datas[i].data + " " + datas[i].data2 + "<br>";
  }
}, (error) => {
  console.error("Error getting documents:", error);
});


document.querySelector(".add").addEventListener("click", function () {
  addData();
});
document.querySelector(".adddatawithid").addEventListener("click", function () {
  addDataWithId();
});


document.querySelector(".get").addEventListener("click", function () {
  id = document.querySelector(".id").value;
  getData();
});
document.querySelector(".update").addEventListener("click", function () {
  id = document.querySelector(".id").value;
  updateData();
});
document.querySelector(".delete").addEventListener("click", function () {
  id = document.querySelector(".id").value;
  deleteData();
});
document.querySelector(".getall").addEventListener("click", function () {
  getAll();
});
