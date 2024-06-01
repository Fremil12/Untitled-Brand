

const sidebarItems = document.querySelectorAll(".sidebarItems");
const shopItems = document.querySelectorAll(".shopItem");
const categoryLabel = document.querySelector(".category-label");
const adminSwitch = document.querySelector(".admin-switch");
const buttonContainers = document.querySelectorAll(".buttons");
const plusButtonContainer=document.querySelector(".plus-button-container");
let adminStatus=false;






adminSwitch.addEventListener("click", function () {
    if (!adminStatus) {
        adminStatus=true;
        plusButtonContainer.innerHTML="<i class=\"bi bi-clipboard-plus-fill\"  data-bs-toggle=\"modal\" data-bs-target=\".add-modal\"></i>"

        
        shopItems.forEach((shopItem) => {
            if (!shopItem.classList.contains("bestSellers")) {
                buttonContainers.forEach((buttonContainer) => {
                    buttonContainer.innerHTML = "<br><input  type=\"button\" class=\"button btn btn-secondary\" value=\"szerkesztés\"><input  type=\"button\" class=\"button btn btn-danger\" value=\"törlés\">";
                })

            }
        })
    }
    else {
        adminStatus=false;
        plusButtonContainer.innerHTML="";
        buttonContainers.forEach((buttonContainer) => {
            buttonContainer.innerHTML = " <a href=\"../aloldalak/nem.html\"><button class=\"btn btn-green\" type=\"button\">Megveszem</button></a>";
        })
    }

});
sidebarItems.forEach((sidebarItem) => {
    sidebarItem.addEventListener("click", function () {
        sidebarItems.forEach((sidebarItem) => sidebarItem.classList.remove("sidebarSelected"));
        sidebarItem.classList.add("sidebarSelected");
        categoryLabel.innerHTML = sidebarItem.innerHTML;
        shopItems.forEach((shopItem) => {
            if (!(shopItem.classList.contains(sidebarItem.classList[1]))) {
                shopItem.classList.add("hidden")
            }
            else {
                shopItem.classList.remove("hidden")

            }
        }
        );
    })
});


document.querySelector(".logo").addEventListener("click", function () {
    if (document.querySelector(".logo").classList.contains("easteregg")) {
        document.querySelector(".logo").classList.remove("easteregg");
    }
    else {
        document.querySelector(".logo").classList.add("easteregg");
    }
});

