import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
//képekhez
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";
//szöveghez
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

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


function addData() {
    name = document.querySelector(".name-add").value;
    tag = getSelectedValue(document.querySelector(".tag-select"));
    price = document.querySelector(".price-add").value;
    imgName: namebox.value,
        console.log(name + " " + tag + " " + price)
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

function updateData(id, newData) {
    const docRef = doc(db, "datas", id);
    updateDoc(docRef, newData)
        .then(() => {
            imgToModal();
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document:", error);
        });
}


// Delete data
function deleteData(id) {
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
    // Clear the shop container
    document.querySelector(".shop").innerHTML = "";

    // Populate shop items
    datas.forEach(data => {
        document.querySelector(".shop").innerHTML += `
        <div class="shopItem col-md-3 minden ${data.tag} ${data.id} sizeChange">
            <div class="shopItemPicture">
            <img class="img-${data.imgName} small img-to-modal" alt="${data.name}">
            </div>
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

    setAdminStatus(datas);

}, (error) => {
    console.error("Error getting documents:", error);
});

function setAdminStatus(datas) {
    let shopItems;
    const adminSwitch = document.querySelector(".admin-switch");
    let adminStatus = false;

    // Toggle admin mode
    adminSwitch.addEventListener("click", () => {
        shopItems = document.querySelectorAll(".shopItem");
        const buttonContainers = document.querySelectorAll(".buttons");

        if (!adminStatus) {
            adminStatus = true;
            plusButtonContainer.innerHTML = `<input type="button" value="Hozzáadás" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target=".add-modal"></i>`;

            shopItems.forEach((item, index) => {
                if (!item.classList.contains("bestSellers")) {
                    buttonContainers[index].innerHTML = `
                    <div class="dropup inline">
                        <button type="button" class="btn btn-secondary dropdown-toggle set-dropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Szerkesztés
                        </button>
                        <form class="dropdown-menu p-4 szerkesztModal">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control flotatingName" placeholder="A ruhanem neve" value="${datas[index].name}" required>
                                <label for="flotatingName">Név</label>
                                <p class="edit-name-hiba text-danger"></p>
                            </div>
                            <div class="form-floating">
                                <input type="number" class="form-control flotatingPrice" placeholder="A ruhanem ára" value="${datas[index].price}" required>
                                <label for="flotatingPrice">Ár</label>
                                <p class="edit-price-hiba text-danger"></p>
                                <br>
                            </div>
                            <select class="form-select" aria-label="Default select example" required>
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
                        <div class="dropup inline">
                        <button type="button" class="btn btn-danger set-dropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Törlés
                        </button>
                        <form class="dropdown-menu p-4 torlesModal">
                            <h3>Biztos hogy törlöd?</h3>
                            <div class="center">
                                <button class="btn btn-success del-btn ${datas[index].id} me-2">Igen</button>
                                <button class="btn btn-danger ">Nem</button>
                            </div>
                
                        </form>
                    </div>
                    </div>`;
                }
            });

            
          
               imgToModal();
             
            const delBtns = document.querySelectorAll(".del-btn");
            delBtns.forEach(delBtn => {
                delBtn.addEventListener("click", function (event) {
                    event.preventDefault();
                    const delBtnId = delBtn.classList[3];
                    deleteData(delBtnId);
                });
            });

            // Add event listeners to the edit buttons
            const setBtns = document.querySelectorAll(".set-btn");
            setBtns.forEach((setBtn, index) => {
                setBtn.addEventListener("click", function (event) {
                    event.preventDefault();
                    const setBtnId = setBtn.classList[3];
                    const item = setBtn.closest('.shopItem');
                    const editedName = item.querySelector('.flotatingName').value;
                    const editedPrice = item.querySelector('.flotatingPrice').value;
                    const editedTag = item.querySelector('.form-select').value;
                    let editNameHiba = document.querySelectorAll(".edit-name-hiba")[index];
                    let editPriceHiba = document.querySelectorAll(".edit-price-hiba")[index];
                    editNameHiba.innerHTML = "";
                    editPriceHiba.innerHTML = "";
                    if(editedName==""&&editedPrice==""){
                        editNameHiba.innerHTML = "A mezőt ki kell tölteni!";
                        editPriceHiba.innerHTML = "A mezőt ki kell tölteni!";
                    }
                    else if(editedPrice<=0){
                        editPriceHiba.innerHTML = "Hibás ár!";
                    }
                    else if(editedPrice==""){
                        editPriceHiba.innerHTML = "A mezőt ki kell tölteni!";
                    }
                    else if(editedName==""){
                        editNameHiba.innerHTML = "A mezőt ki kell tölteni!";
                    }
                    else{

                        updateData(setBtnId, { name: editedName, price: editedPrice, tag: editedTag });
                        setAdminStatus(datas);
                    }
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
}

  sleep(200).then(() => { 
    imgToModal();
  });
function imgToModal(){
    var modal = document.getElementById("myModal");
            
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let imgs = document.querySelectorAll(".img-to-modal");
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");
       imgs.forEach(img => {
        img.onclick = function () {
            modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
        }
    });
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
    
    
}




//addwithimg input check
document.querySelector(".addwithimg").addEventListener("click", function () {
    let modalNameHiba = document.querySelector(".modalNameHiba");
    let modalPictureHiba = document.querySelector(".modalPictureHiba");
    let modalPriceHiba = document.querySelector(".modalPriceHiba");
    let extlab=document.querySelector(".extlab");

    modalNameHiba.innerHTML = "";
    modalPriceHiba.innerHTML = "";
    modalPictureHiba.innerHTML = "";
    if (document.querySelector(".name-add").value == "" && document.querySelector(".price-add").value == "" && (namebox.value == ""|| extlab.value==undefined) ) {
        modalNameHiba.innerHTML = "A mezőt ki kell tölteni!";
        modalPriceHiba.innerHTML = "A mezőt ki kell tölteni!";
        modalPictureHiba.innerHTML = "Nincs kiválasztva kép!";
    }
    else if (document.querySelector(".name-add").value == "") {
        modalNameHiba.innerHTML = "A mezőt ki kell tölteni!";
    }
    else if (document.querySelector(".price-add").value == "") {
        modalPriceHiba.innerHTML = "A mezőt ki kell tölteni!";
    }
    else if (document.querySelector(".price-add").value <=0) {
        modalPriceHiba.innerHTML = "Hibás ár!";
    }
    else if (namebox.value == "" || extlab.value == undefined) {
        modalPictureHiba.innerHTML = "Nincs kiválasztva kép!";
    }
    else {
        UploadProcess();
        addData();
        document.querySelector(".ModalNameHiba").innerHTML = ""
    }

});
