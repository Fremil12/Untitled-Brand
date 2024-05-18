window.innerWidth
const body=document.querySelector("body");


if(window.innerWidth<992){
    document.querySelector(".reversed-row").innerHTML="<div class=\"col-lg-6\"> <div class=\"center\"> <div> <div class=\"description\"> <h2>02 Partitions</h2> <p> Describe the service and how customers or clients can benefit from it. This is <br> the place to add a short description with relevant details, like pricing, <br> duration and how to book. </p> </div> <img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_842faa3e4da847fa9e587189d672195d~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/tarun-tom-rtMfGPc95dc-unsplash.jpg\" alt=\"\"> </div> </div> </div> <div class=\"col-lg-6\"> <div class=\"center\"> <div> <div class=\"description\"> <h2>03 Skylights</h2> Describe the service and how customers or clients can benefit from it. This is<br> the place to add a short description with relevant details, like pricing, duration <br>and how to book. </div> <img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_5a55331475e241f4a8daa6415c2ddf69~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/norman-brown-FVaimgno3dw-unsplash.jpg\" alt=\"\"> </div> </div> </div>";
    document.querySelector(".removeable-descripotion").innerHTML="<img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_e679eb111494484db8c0c6e7dee879d2~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/jean-philippe-delberghe-m1MSf-FLO_E-unsplash.jpg\" alt=\"\">";
}
else{
    document.querySelector(".reversed-row").innerHTML="<div class=\"col-lg-6\"> <div class=\"center\"> <div> <img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_842faa3e4da847fa9e587189d672195d~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/tarun-tom-rtMfGPc95dc-unsplash.jpg\" alt=\"\"> <div class=\"description\"> <h2>03 Skylights</h2> Describe the service and how customers or clients can benefit from it. This is<br> the place to add a short description with relevant details, like pricing, duration <br>and how to book. </div> </div> </div> </div> <div class=\"col-lg-6\"> <div class=\"center\"> <div> <div class=\"description\"> <h2>02 Partitions</h2> <p> Describe the service and how customers or clients can benefit from it. This is <br> the place to add a short description with relevant details, like pricing, <br> duration and how to book. </p> </div> <img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_5a55331475e241f4a8daa6415c2ddf69~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/norman-brown-FVaimgno3dw-unsplash.jpg\" alt=\"\"> </div> </div> </div>";
    document.querySelector(".removeable-descripotion").innerHTML="<div class=\"description\"></div><img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_e679eb111494484db8c0c6e7dee879d2~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/jean-philippe-delberghe-m1MSf-FLO_E-unsplash.jpg\" alt=\"\">";
}

window.onresize=function(){
    if(window.innerWidth<992){
        document.querySelector(".reversed-row").innerHTML="<div class=\"col-lg-6\"> <div class=\"center\"> <div> <div class=\"description\"> <h2>02 Partitions</h2> <p> Describe the service and how customers or clients can benefit from it. This is <br> the place to add a short description with relevant details, like pricing, <br> duration and how to book. </p> </div> <img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_842faa3e4da847fa9e587189d672195d~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/tarun-tom-rtMfGPc95dc-unsplash.jpg\" alt=\"\"> </div> </div> </div> <div class=\"col-lg-6\"> <div class=\"center\"> <div> <div class=\"description\"> <h2>03 Skylights</h2> Describe the service and how customers or clients can benefit from it. This is<br> the place to add a short description with relevant details, like pricing, duration <br>and how to book. </div> <img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_5a55331475e241f4a8daa6415c2ddf69~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/norman-brown-FVaimgno3dw-unsplash.jpg\" alt=\"\"> </div> </div> </div>";
        document.querySelector(".removeable-descripotion").innerHTML="<img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_e679eb111494484db8c0c6e7dee879d2~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/jean-philippe-delberghe-m1MSf-FLO_E-unsplash.jpg\" alt=\"\">";
    }
    else{
        document.querySelector(".reversed-row").innerHTML="<div class=\"col-lg-6\"> <div class=\"center\"> <div> <img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_842faa3e4da847fa9e587189d672195d~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/tarun-tom-rtMfGPc95dc-unsplash.jpg\" alt=\"\"> <div class=\"description\"> <h2>03 Skylights</h2> Describe the service and how customers or clients can benefit from it. This is<br> the place to add a short description with relevant details, like pricing, duration <br>and how to book. </div> </div> </div> </div> <div class=\"col-lg-6\"> <div class=\"center\"> <div> <div class=\"description\"> <h2>02 Partitions</h2> <p> Describe the service and how customers or clients can benefit from it. This is <br> the place to add a short description with relevant details, like pricing, <br> duration and how to book. </p> </div> <img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_5a55331475e241f4a8daa6415c2ddf69~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/norman-brown-FVaimgno3dw-unsplash.jpg\" alt=\"\"> </div> </div> </div>";
        document.querySelector(".removeable-descripotion").innerHTML="<div class=\"description\"></div><img class=\"picture img-fluid\" src=\"https://static.wixstatic.com/media/c837a6_e679eb111494484db8c0c6e7dee879d2~mv2.jpg/v1/fill/w_788,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/jean-philippe-delberghe-m1MSf-FLO_E-unsplash.jpg\" alt=\"\">";
    }

}



document.querySelector(".logo").addEventListener("click", function () {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
});

document.querySelector(".bi-arrow-right").addEventListener("click", function () {
    this.classList.toggle("spin");
});
