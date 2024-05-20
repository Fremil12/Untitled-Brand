window.innerWidth
const body=document.querySelector("body");


if(window.innerWidth<992){
    document.querySelector(".reversed-row").innerHTML="<div class=\"col-lg-6\"> <div class=\"center\"> <div><div class=\"description\"> <h2>Téli Kollekció</h2> <p> A téli street wear kollekció a hideg időjáráshoz igazodik, meleg <br> és stílusos darabokat kínálva. Vastagabb anyagok, mint a gyapjú, a fleece és a technikai <br> szövetek kerülnek előtérbe, hogy biztosítsák a hőszigetelést. </p> </div> <img class=\"picture img-fluid clickable\" src=\"images/tavaszi.png\" alt=\"tavaszi\">  </div> </div> </div> <div class=\"col-lg-6\"> <div class=\"center\"> <div> <div class=\"description\"> <h2>Tavaszi Kollekció</h2> <p> A tavaszi street wear kollekció friss és megújuló energiát sugároz,<br> könnyed és kényelmes darabokkal. Vékonyabb anyagok, mint a pamut,<br> vászon és poliészter kerülnek előtérbe, hogy alkalmazkodjanak a felmelegedő időhöz. </p> </div> <img class=\"picture img-fluid clickable\" src=\"images/oszi.png\" alt=\"oszi.png\"> </div> </div> </div>";
    document.querySelector(".removeable-descripotion").innerHTML="<img class=\"picture img-fluid\" src=\"images/teli.png\" alt=\"teli\">";
}
else{
    document.querySelector(".reversed-row").innerHTML="<div class=\"col-lg-6\"> <div class=\"center\"> <div> <img class=\"picture img-fluid clickable\" src=\"images/tavaszi.png\" alt=\"tavaszi\"> <div class=\"description\"> <h2>Tavaszi Kollekció</h2> A tavaszi street wear kollekció friss és megújuló energiát sugároz,<br> könnyed és kényelmes darabokkal. Vékonyabb anyagok, mint a pamut,<br> vászon és poliészter kerülnek előtérbe, hogy alkalmazkodjanak a felmelegedő időhöz. </div> </div> </div> </div> <div class=\"col-lg-6\"> <div class=\"center\"> <div> <div class=\"description\"> <h2>Téli Kollekció</h2> <p> A téli street wear kollekció a hideg időjáráshoz igazodik, meleg <br> és stílusos darabokat kínálva. Vastagabb anyagok, mint a gyapjú, a fleece és a technikai <br> szövetek kerülnek előtérbe, hogy biztosítsák a hőszigetelést. </p> </div> <img class=\"picture img-fluid clickable\" src=\"images/oszi.png\" alt=\"oszi.png\"> </div> </div> </div>";
    document.querySelector(".removeable-descripotion").innerHTML="<div class=\"description\"></div><img class=\"picture img-fluid\" src=\"images/teli.png\" alt=\"teli\">";
}

window.onresize=function(){
    if(window.innerWidth<992){
        document.querySelector(".reversed-row").innerHTML="<div class=\"col-lg-6\"> <div class=\"center\"> <div><div class=\"description\"> <h2>Téli Kollekció</h2> <p> A téli street wear kollekció a hideg időjáráshoz igazodik, meleg <br> és stílusos darabokat kínálva. Vastagabb anyagok, mint a gyapjú, a fleece és a technikai <br> szövetek kerülnek előtérbe, hogy biztosítsák a hőszigetelést. </p> </div> <img class=\"picture img-fluid clickable\" src=\"images/tavaszi.png\" alt=\"tavaszi\">  </div> </div> </div> <div class=\"col-lg-6\"> <div class=\"center\"> <div> <div class=\"description\"> <h2>Tavaszi Kollekció</h2> <p> A tavaszi street wear kollekció friss és megújuló energiát sugároz,<br> könnyed és kényelmes darabokkal. Vékonyabb anyagok, mint a pamut,<br> vászon és poliészter kerülnek előtérbe, hogy alkalmazkodjanak a felmelegedő időhöz. </p> </div> <img class=\"picture img-fluid clickable\" src=\"images/oszi.png\" alt=\"oszi.png\"> </div> </div> </div>";
        document.querySelector(".removeable-descripotion").innerHTML="<img class=\"picture img-fluid\" src=\"images/teli.png\" alt=\"teli\">";
    }
    else{
        document.querySelector(".reversed-row").innerHTML="<div class=\"col-lg-6\"> <div class=\"center\"> <div> <img class=\"picture img-fluid clickable\" src=\"images/tavaszi.png\" alt=\"tavaszi\"> <div class=\"description\"> <h2>Tavaszi Kollekció</h2> A tavaszi street wear kollekció friss és megújuló energiát sugároz,<br> könnyed és kényelmes darabokkal. Vékonyabb anyagok, mint a pamut,<br> vászon és poliészter kerülnek előtérbe, hogy alkalmazkodjanak a felmelegedő időhöz. </div> </div> </div> </div> <div class=\"col-lg-6\"> <div class=\"center\"> <div> <div class=\"description\"> <h2>Téli Kollekció</h2> <p> A téli street wear kollekció a hideg időjáráshoz igazodik, meleg <br> és stílusos darabokat kínálva. Vastagabb anyagok, mint a gyapjú, a fleece és a technikai <br> szövetek kerülnek előtérbe, hogy biztosítsák a hőszigetelést. </p> </div> <img class=\"picture img-fluid clickable\" src=\"images/oszi.png\" alt=\"oszi.png\"> </div> </div> </div>";
        document.querySelector(".removeable-descripotion").innerHTML="<div class=\"description\"></div><img class=\"picture img-fluid\" src=\"images/teli.png\" alt=\"teli\">";
    }

}



document.querySelector(".logo").addEventListener("click",function(){
    if(document.querySelector(".logo").classList.contains("easteregg")){
        document.querySelector(".logo").classList.remove("easteregg");
    }
    else{
    document.querySelector(".logo").classList.add("easteregg");
}});

document.querySelector(".bi-list").addEventListener("click",function() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  });
  
  document.querySelector(".closebtn").addEventListener("click",function() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  });