$(function() {
  $(".hamburger,nav ul li a").click(function() {
    $("nav ul").toggleClass("open");
  });
});
//transparency on scroll
window.addEventListener("scroll", function() {
  if (window.scrollY > 150) {
    document.querySelector("#navbar").style.opacity = 0.9;
  } else {
    document.querySelector("#navbar").style.opacity = 1;
  }
});
