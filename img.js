import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAq7OU5i2WgamVcWwXtvLTjP20L5449HJo",
    authDomain: "prrrr-b7e19.firebaseapp.com",
    projectId: "prrrr-b7e19",
    storageBucket: "prrrr-b7e19.appspot.com",
    messagingSenderId: "739124303183",
    appId: "1:739124303183:web:7058f38824dbedc6b3613a"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();

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
