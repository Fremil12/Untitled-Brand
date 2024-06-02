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
function setUrl(id) {
    const docRef = doc(db, "ImageLinks", id);
    onSnapshot(docRef, (doc) => {
        if (doc.exists()) {

            let url = doc.data().ImageURL;
            document.querySelector(".img-" + id).src = url;
        } else {
            console.log("No such document!");
        }
    }, (error) => {
        console.error("Error getting document:", error);
    });
}


//szöveges adatok --------------------------

function addDataWithId() {
    name = document.querySelector(".name-add").value;
    tag = getSelectedValue(document.querySelector(".tag-select"));
    price = document.querySelector(".price-add").value;
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

function addData() {
    name = document.querySelector(".name-add").value;
    tag = getSelectedValue(document.querySelector(".tag-select"));
    price = document.querySelector(".price-add").value;
    imgName: namebox.value,
    console.log(name+" "+tag+" "+price)
    addDoc(colRef, {
      name: name,
      tag: tag,
      price: price,
      imgName: namebox.value,
    })
      .then((docRef) => {
        console.log("Document written with ID", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
  }

function updateData(id,newData) {
    const docRef = doc(db, "datas", id);
    
    updateDoc(docRef, newData)
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

// Real-time listener for all documents



// Listen for real-time updates to the collection
onSnapshot(colRef, (querySnapshot) => {
    let datas = [];
    querySnapshot.docs.forEach((doc) => {
        datas.push({ ...doc.data(), id: doc.id });
    });
    console.log(datas);
    // Clear the shop container
    document.querySelector(".shop").innerHTML = "";
    
    // Populate shop items
    datas.forEach(data => {
        document.querySelector(".shop").innerHTML += `
        <div class="shopItem col-md-3 minden ${data.tag} ${data.id}">
            <img class="img-${data.imgName} small">
            <div class="shopItemDesc">
                <p class="name">${data.name}</p>
                <p class="price">${toPrice(data.price)}ft</p>
                <div class="buttons">
                    <a href="../aloldalak/nem.html"><button class="btn btn-green" type="button">Megveszem</button></a>
                </div>
            </div>
        </div>`;
        setUrl(data.imgName);
    });

    let shopItems;
    const adminSwitch = document.querySelector(".admin-switch");
    let adminStatus = false;

    // Toggle admin mode
    adminSwitch.addEventListener("click", () => {
        shopItems = document.querySelectorAll(".shopItem");
        const buttonContainers = document.querySelectorAll(".buttons");

        if (!adminStatus) {
            adminStatus = true;
            plusButtonContainer.innerHTML = `<i class="bi bi-clipboard-plus-fill" data-bs-toggle="modal" data-bs-target=".add-modal"></i>`;

            shopItems.forEach((item, index) => {
                if (!item.classList.contains("bestSellers")) {
                    buttonContainers[index].innerHTML = `
                    <div class="dropdown inline">
                        <button type="button" class="btn btn-secondary dropdown-toggle set-dropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Szerkesztés
                        </button>
                        <form class="dropdown-menu p-4">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control flotatingName" placeholder="A ruhanem neve" value="${datas[index].name}">
                                <label for="flotatingName">Név</label>
                            </div>
                            <div class="form-floating">
                                <input type="number" class="form-control flotatingPrice" placeholder="A ruhanem ára" value="${datas[index].price}">
                                <label for="flotatingPrice">Ár</label>
                                <br>
                            </div>
                            <select class="form-select" aria-label="Default select example" required>
                                <option selected>Kategóriák</option>
                                <option value="bestSellers">Best seller</option>
                                <option value="ujTermekek">Új termékek</option>
                                <option value="polok">Pólok</option>
                                <option value="puloverek">Pulóverek</option>
                                <option value="nadragok">Nadrágok</option>
                                <option value="cipok">Cipók</option>
                                <option value="sapkak">Sapkák</option>
                                <option value="kiegeszitok">Kiegészítők</option>
                            </select>
                            <br>
                            <button class="btn btn-success set-btn ${datas[index].id}">Szerkesztés</button>
                        </form>
                        <input type="button" class="button btn btn-danger" value="törlés">
                    </div>`;
                }
            });

            // Add event listeners to the edit buttons
            const setBtns = document.querySelectorAll(".set-btn");
            setBtns.forEach(setBtn => {
                setBtn.addEventListener("click", function (event) {
                    event.preventDefault();
                    const setBtnId = setBtn.classList[3];
                    const item = setBtn.closest('.shopItem');
                    const name = item.querySelector('.flotatingName').value;
                    const price = item.querySelector('.flotatingPrice').value;
                    const category = item.querySelector('.form-select').value;

                    updateData(setBtnId, { name, price, category });
                });
            });

        } else {
            adminStatus = false;
            plusButtonContainer.innerHTML = "";
            buttonContainers.forEach(buttonContainer => {
                buttonContainer.innerHTML = `<a href="../aloldalak/nem.html"><button class="btn btn-green" type="button">Megveszem</button></a>`;
            });
        }
    });
}, (error) => {
    console.error("Error getting documents:", error);
});





document.querySelector(".addwithimg").addEventListener("click", function () {
    UploadProcess();
    addData();
});
