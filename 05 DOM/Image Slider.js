let index = 1;
function adjSlide(n) { SlideShow(index += n); }
function spSlide(n) { SlideShow(index = n); }
function SlideShow(n) {
    let images = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > images.length) { index = 1; }
    if (n < 1) { index = images.length; }
    for (let i = 0; i < images.length; i++) { images[i].style.display = 'none'; }
    for (let i = 0; i < dots.length; i++) { dots[i].style.backgroundColor = 'lightgray'; }
    images[index - 1].style.display = 'block';
    dots[index - 1].style.backgroundColor = 'gray';
    // setTimeout(SlideShow, 2000, index += 1);
}
window.onload = SlideShow;