document.querySelector(".bi-list").addEventListener("click",function() {
  document.querySelector(".bi-list").style.display = 'none';
    document.querySelector(".sidenav").style.width = "400px";
    document.querySelector("main").style.marginLeft = "400px";
  });
  
  document.querySelector(".closebtn").addEventListener("click",function() {
  document.querySelector(".bi-list").style.display = 'block';
    document.querySelector(".sidenav").style.width = "0";
    document.querySelector("main").style.marginLeft = "0";
  });