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

let name, tag, price, imgname, id;

//kép ---------------------------------------




var files = [];
var reader = new FileReader();

let namebox = document.querySelector(".namebox");
let extlab = document.querySelector(".extlab");
let myimg = document.querySelector(".uploadedImg");
let proglab = document.querySelector(".upProgress");
let selBtn = document.querySelector(".selbtn");


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

selBtn.addEventListener("click", function () {
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







//képek lekéréséhez
function setUrl(id){
    const docRef = doc(db, "ImageLinks", id);
    onSnapshot(docRef, (doc) => {
        if (doc.exists()) {

            let url=doc.data().ImageURL;
            document.querySelector(".img-" + id).src=url;
        } else {
        console.log("No such document!");
        }
    }, (error) => {
        console.error("Error getting document:", error);
    });
    }


//szöveges adatok --------------------------

function addDataWithId() {
    name = document.querySelector(".name").value;
    tag = "érték"
    price = document.querySelector(".price").value;
    const docRef = doc(db, "datas", String(id));
    setDoc(docRef, {
        name: name,
        tag: tag,
        price: price,
        imgName: namebox.value,
    })
        .then(() => {
            console.log("Document written with ID", id);
        })
        .catch((error) => {
            console.error("Error adding document:", error);
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

// Real-time listener for all documents
onSnapshot(colRef, (querySnapshot) => {
    let datas = [];
    querySnapshot.docs.forEach((doc) => {
        datas.push({ ...doc.data(), id: doc.id });
    });
    console.log(datas);
    document.querySelector(".shop").innerHTML = ""; 
    for (let i = 0; i < datas.length; i++) {
        document.querySelector(".shop").innerHTML += "<div class=\"item\">" +
            "<img class=\"img-" + datas[i].imgName + " small\"><br>" + 
            datas[i].name + " " + datas[i].description + " " + 
            datas[i].price + " " + datas[i].imgName + " - " + datas[i].id + "<br></div>";  
       
        setUrl(datas[i].imgName)
    }
    id=datas.length;
    
}, (error) => {
    console.error("Error getting documents:", error);
});





document.querySelector(".addwithimg").addEventListener("click", function () {
    UploadProcess();
    addDataWithId();
});



