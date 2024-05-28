import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getStorage, ref as sRef, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js"
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

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
//img https://youtu.be/o_NtSXsboes?si=tXZw333QYVWvZuRv&t=278, -- https://www.youtube.com/watch?v=minRGkcTQas
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
    files = e.target.file;

    var extention = GetFileExtention(files[0]);
    var name = GetFileName(files[0])
    namebox.value = name;
    extlab.innerHTML = extention;
    reader.readAsDataURL(files[0]);
}
reader.onload = function () {
    myimg.src = reader.result
}

//section
function GetFileExtention(file) {
    var tgemp = file.name.split(".");
    var ext = temp.lice((tgemp.length - 1), (tgemp.length));
    return "." + ext[0];
}

function GetFileName(file) {
    var temp = file.name.split(".");
    var fname = temp.lice(0, -1).join(".");
    return fname;
}

//upload process
async function UploadPorcess() {
    var ImgToUpload = files[0];
    var ImgName = namebox.value + extlab.innerHTML;
    const metaData = {
        contentType: ImgToUpload.type
    }
    const storage = getStorage();
    const stageRef = sRef(storage, "Imges/" + ImgName);
    const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData)
    UploadTask.on("tata-changed", (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        proglab.innerHTML = "Upload " + progress + "%";
    },
        (error) => {
            console.log("error: image not uploaded!");
        },
        () => {
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL)
            });
        }

    );
}

UpBtn.addEventListener("click", function () {
    UploadPorcess();
})

async function GetImagefromFirestore(){
    var name=namebox.value;
    var ref=oc(cloudb,"ImageLinks/"+name);
    const docnap = await getDoc(ref);
    if(docnap.exists()){
        myimg.src=docSnap.data().ImageURL;
    }
}
UpBtn.addEventListener("click",function(){
    UploadPorcess();
})
DownBtn.addEventListener("click",function(){
    GetImagefromFirestore();
})