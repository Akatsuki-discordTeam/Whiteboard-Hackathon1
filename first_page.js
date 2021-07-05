/*const checkpoint = 70;
 
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= checkpoint) {
    opacity = 1 - (currentScroll / checkpoint)*2;
  } else {
    opacity = 0;
  }
  document.querySelector(".front").style.opacity = opacity;
});*/
function sc1(){
  var header = document.getElementById('header');

  function fadeOutOnScroll(element) {
    if (!element) {
      return;
    }
    
    var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
    var elementHeight = element.offsetHeight;
    var scrollTop = document.documentElement.scrollTop;
    
    var opacity = 1;
    
    if (scrollTop > distanceToTop) {
      opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
    }
    
    if (opacity >= 0) {
      element.style.opacity = opacity;
    }
  }

  function scrollHandler() {
    fadeOutOnScroll(header);
  }

  window.addEventListener('scroll', scrollHandler);
}

function sc2(){
  var header = document.getElementById('header2');

  function fadeOutOnScroll(element) {
    if (!element) {
      return;
    }
    
    var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
    var elementHeight = element.offsetHeight;
    var scrollTop = document.documentElement.scrollTop;
    
    var opacity = 1;
    
    if (scrollTop > distanceToTop) {
      opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
    }
    
    if (opacity >= 0) {
      element.style.opacity = opacity;
    }
  }

  function scrollHandler() {
    fadeOutOnScroll(header);
  }

  window.addEventListener('scroll', scrollHandler);
}
sc1();
sc2();

var exp = document.getElementById('explore');
var ct = document.getElementById('container')
exp.addEventListener('click', () => {
  ct.scrollIntoView({ behavior: 'smooth', block: 'end'});
});


function sc3(){
  var image = document.getElementById('image');

  function fadeOutOnScroll(element) {
    if (!element) {
      return;
    }
    
    var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
    var elementHeight = element.offsetHeight;
    var scrollTop = document.documentElement.scrollTop;
    
    var opacity = 1;
    
    if (scrollTop > distanceToTop) {
      opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
    }
    
    if (opacity >= 0) {
      element.style.opacity = opacity;
    }
  }

  function scrollHandler() {
    fadeOutOnScroll(image);
  }

  window.addEventListener('scroll', scrollHandler);
}

sc3();

function sc4(){
  var container = document.getElementById('container');

  function fadeOutOnScroll(element) {
    if (!element) {
      return;
    }
    
    var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
    var elementHeight = element.offsetHeight;
    var scrollTop = document.documentElement.scrollTop;
    
    var opacity = 1;
    
    if (scrollTop > distanceToTop) {
      opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
    }
    
    if (opacity >= 0) {
      element.style.opacity = opacity;
    }
  }

  function scrollHandler() {
    fadeOutOnScroll(container);
  }

  window.addEventListener('scroll', scrollHandler);
}

sc4();

var cnt = document.getElementById('contact');
var ct2 = document.getElementById('container2')
cnt.addEventListener('click', () => {
  ct2.scrollIntoView({ behavior: 'smooth', block: 'center'});
});


$('#aaa').click(function() {
    var aaa =  $(this);
    aaa.prop('disabled', true);
    setTimeout(function() {
        aaa.prop('disabled', false);
    }, 3000);
});