import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
//képekhez
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";
//szöveghez
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

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
const storage = getStorage();
let colRef = collection(db, "datas");

let name, description, price, Imgname, id;

//kép ---------------------------------------




var files = [];
var reader = new FileReader();

let namebox = document.querySelector(".namebox");
let extlab = document.querySelector(".extlab");
let myimg = document.querySelector(".uploadedImg");
let proglab = document.querySelector(".upProgress");
let SelBtn = document.querySelector(".selbtn");
let UpBtn = document.querySelector(".upbtn");
let DownBtn = document.querySelector(".downbtn");

var input = document.createElement("input");
input.type = "file";

input.onchange = e => {
    files = e.target.files;

    var extension = GetFileExtension(files[0]);
    var name = GetFileName(files[0]);
    namebox.value = name;
    extlab.innerHTML = extension;
    reader.readAsDataURL(files[0]);
};

reader.onload = function () {
    myimg.src = reader.result;
};

SelBtn.addEventListener("click", function () {
    input.click();
});

function GetFileExtension(file) {
    var temp = file.name.split(".");
    var ext = temp.slice((temp.length - 1), (temp.length));
    return "." + ext[0];
}

function GetFileName(file) {
    var temp = file.name.split(".");
    var fname = temp.slice(0, -1).join(".");
    return fname;
}

async function UploadProcess() {
    var ImgToUpload = files[0];
    var ImgName = namebox.value + extlab.innerHTML;
    const metaData = {
        contentType: ImgToUpload.type
    };

    const storageRef = sRef(storage, "Images/" + ImgName);
    const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

    UploadTask.on("state_changed", (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        proglab.innerHTML = "Upload " + progress + "%";
    },
        (error) => {
            console.log("error: image not uploaded!", error);
        },
        () => {
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL);
                setDoc(doc(db, "ImageLinks", namebox.value), {
                    ImageURL: downloadURL
                });
            });
        }
    );
}

UpBtn.addEventListener("click", function () {
    UploadProcess();
});

async function GetImagefromFirestore() {
    var name = namebox.value;
    var ref = doc(db, "ImageLinks", name);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        myimg.src = docSnap.data().ImageURL;
    } else {
        console.log("No such document!");
    }
}

DownBtn.addEventListener("click", function () {
    GetImagefromFirestore();
});





//szöveges adatok --------------------------

// Writing data
function addData() {
  name = document.querySelector(".name").value;
  description = document.querySelector(".description").value;
  price = document.querySelector(".price").value;
  id = document.querySelector(".id").value; 


  addDoc(colRef, {
    name: name,
    description: description,
    price: price,
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
  description = document.querySelector(".description").value;
  price = document.querySelector(".price").value;
  id = document.querySelector(".id").value; 

  const docRef = doc(db, "datas", id);
  setDoc(docRef, {
    name: name,
    description: description,
    price: price,
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

  id = document.querySelector(".id").value; 
  const docRef = doc(db, "datas", id);
  onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      let singleElement=document.querySelector(".one");
      singleElement.innerHTML=doc.data().name + " " + doc.data().description + " " + doc.data().price;
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
  description = document.querySelector(".description").value;
  price = document.querySelector(".price").value;
  id = document.querySelector(".id").value; 

  const docRef = doc(db, "datas", id);
  updateDoc(docRef, {
    name: name,
    description: description,
    price: price,
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
  id = document.querySelector(".id").value; 
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
        allElement.innerHTML += datas[i].name + " " + datas[i].description + " " + datas[i].price + "<br>";
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
  document.querySelector(".all").innerHTML = ""; // Clear previous data
  for (let i = 0; i < datas.length; i++) {
    document.querySelector(".all").innerHTML += datas[i].name + " " + datas[i].description + " " + datas[i].price +" - "+datas[i].id+"<br>";
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
  getData();
});
document.querySelector(".update").addEventListener("click", function () {
  updateData();
});
document.querySelector(".delete").addEventListener("click", function () {
  deleteData();
});
document.querySelector(".getall").addEventListener("click", function () {
  getAll();
});




