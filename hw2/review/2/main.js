var image_url = [
    "http://www.pngall.com/wp-content/uploads/4/Pepperoni-Dominos-Pizza-PNG-Free-Download.png",
    "http://www.pngall.com/wp-content/uploads/4/Pepperoni-Dominos-Pizza-PNG-Free-Image.png",
    "http://www.pngall.com/wp-content/uploads/4/Pepperoni-Dominos-Pizza-PNG-Picture.png",
];

var buttons = document.getElementsByTagName("button");
var _img = document.getElementById("display");
var _img_source = document.getElementsByTagName("a");
var image_index = 1;
var watcher = new IntersectionObserver(onEnterView);

function onEnterView(entries, observer) {
    console.log(1);
    for (let entry of entries) {
        if (entry.isIntersecting) {
            // 監視目標進入畫面
            const img = entry.target;
            img.setAttribute("src", img.dataset.src); // 把值塞回 src
            img.removeAttribute("data-src");
            observer.unobserve(img); // 取消監視
        }
    }
}

// For initial screen
_img.src = "./images/loading.gif";
_img.dataset.src = image_url[image_index];
_img_source[0].href = image_url[image_index];
watcher.observe(_img); // 開始監視

// previous button
buttons[0].addEventListener("click", function Load_Image() {
    /*if (image_index == 0) {
        image_index = image_url.length - 1;
    } else {
        image_index--;
    }*/
    buttons[1].disabled = false;
    if (image_index == 0) {
        buttons[0].disabled = true;
    } else {
        image_index--;
    }
    _img.src = "./images/loading.gif";
    _img.dataset.src = image_url[image_index];
    _img_source[0].href = image_url[image_index];
    watcher.observe(_img); // 開始監視
});

// next button
buttons[1].addEventListener("click", function Load_Image() {
    /*if (image_index == image_url.length - 1) {
        image_index = 0;
    } else {
        image_index++;
    }*/
    buttons[0].disabled = false;
    if (image_index == image_url.length - 1) {
        buttons[1].disabled = true;
    } else {
        image_index++;
    }
    _img.src = "./images/loading.gif";
    _img.dataset.src = image_url[image_index];
    _img_source[0].href = image_url[image_index];
    watcher.observe(_img); // 開始監視
});
