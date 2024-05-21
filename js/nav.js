document.querySelector(".bi-list").addEventListener("click",function() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  });
  
  document.querySelector(".closebtn").addEventListener("click",function() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  });