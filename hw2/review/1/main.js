let current = 0;
let images = [
"https://static.wikia.nocookie.net/bahapedia/images/e/ef/025c3937969d2ff9591374cb6dcd0cad.JPG/revision/latest/top-crop/width/360/height/450?cb=20180806122947&path-prefix=zh",
"https://img.ttshow.tw/images/author/vivian/1(34).jpg",
"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg",
"https://images.hdqwalls.com/wallpapers/warrior-cat-4k-6c.jpg",
"https://eskipaper.com/images/cat-eyes-hd-1.jpg",
"https://www.wallpaperbetter.com/wallpaper/179/477/118/nyan-cat-wallpaper-windows-7-2K.jpg",
"https://i.kym-cdn.com/entries/icons/facebook/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.jpg",
"https://img-comment-fun.9cache.com/media/ayoeWVX/abxE5DL0_700w_0.jpg",
"https://img-comment-fun.9cache.com/media/abMBZxX/a2KzDa7r_700w_0.jpg",
];
let back = document.getElementById("previous");
let display = document.getElementById("display");
let source = document.getElementById("source");
let next = document.getElementById("next");
let display_box = document.getElementById("display_box");

function show_current() {
	display.src = images[current];
	source.href = images[current];
	source.textContent = images[current];
}
function disable(button) {
	button.classList.add("disabled");
}
function enable(button) {
	button.classList.remove("disabled");
}
function show_loading() {
	display.src = "./images/loading.gif";////wrong
	source.href = "";
	source.textContent = "";
}
display_box.classList.add("loading");
show_current();
if (current === 0) {
	disable(back);
}
if (current === images.length - 1) {
	disable(next);
}
function previousImage() {
	if (current > 0) {
		current--;
		
		display.style.opacity = 0;
		display_box.classList.add("loading");
		show_current();
		//show_loading();
		//setTimeout(show_current, 1000);
	}
	if (current === 0) {
		disable(back);
	}
	if (current === images.length - 2) {
		enable(next);
	}
}
function nextImage() {
	if (current < images.length - 1) {
		current++;

		display.style.opacity = 0;
		display_box.classList.add("loading");
		show_current();
		//show_loading();
		//setTimeout(show_current, 1000);
	}
	if (current === images.length - 1) {
		disable(next);
	}
	if (current === 1) {
		enable(back);
	}
}
function loadImage() {
    display.style.opacity = 1;
    display_box.classList.remove("loading");
}

/*back.addEventListener(
	"click",
	function() {
		if (current > 0) {
			current--;
			display.style.background = "./images/loading.gif";
			show_current();
			//show_loading();
			//setTimeout(show_current, 1000);
		}
		if (current === 0) {
			disable(back);
		}
		if (current === images.length - 2) {
			enable(next);
		}
	}
);
next.addEventListener(
	"click",
	function() {
		if (current < images.length - 1) {
			current++;
			
			//display.style.background = "./images/loading.gif";
			display.style.background = "./images/loading.gif";
			show_current();
			//show_loading();
			//setTimeout(show_current, 1000);
		}
		if (current === images.length - 1) {
			disable(next);
		}
		if (current === 1) {
			enable(back);
		}
	}
);*/


