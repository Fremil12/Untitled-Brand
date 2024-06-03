

const sidebarItems = document.querySelectorAll(".sidebarItems");
const categoryLabel = document.querySelector(".category-label");
let buttonContainers;
const plusButtonContainer = document.querySelector(".plus-button-container");



function getSelectedValue(sel) {
    return (sel.options[sel.selectedIndex].value);
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


sidebarItems.forEach((sidebarItem) => {
    sidebarItem.addEventListener("click", function () {
        shopItems = document.querySelectorAll(".shopItem")
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


function toPrice(x) {
    let price = String(x).split("");
    for (let i = price.length; i > 0; i -= 3) {
        price.splice(i, 0, " ");
    }
    return price.join("");
}



