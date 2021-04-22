let array=["https://assets.bonappetit.com/photos/601835eb8033ceb527d78059/1:1/w_578,c_limit/Chocolate-Banoffee-Pie.jpg",
"https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg",
"https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/2KL6JYQYH4I6REYMIWBYVUGXPI.jpg"]
window.onload=loadImage;
let count = 0;
let image = document.getElementById('display');
let leftClick = document.getElementById('previous');
//let button = document.getElementsByClassName("image-viewer__button");
let rightClick = document.getElementById('next');
let imgSource = document.getElementsByClassName("image-viewer__display-source-wrapper");



function showImage(){
    if (count == 0 ){
        leftClick.parentElement.className="disabled";
    }
    else if (count==array.length-1 ){
        rightClick.parentElement.className="disabled";
    }
    else {
        leftClick.parentElement.className="image-viewer__button";
        rightClick.parentElement.className="image-viewer__button";
    }
    image.src= array[count];
    imgSource[0].innerHTML=
    `<span>Source: </span><a href=${ array[count] }>${array[count]}</a>`;

}

function loadImage(){
    image.src="./images/loading.gif";
    setTimeout(function() {showImage()}, 500);
    /*
    if (count == 0 ){
        leftClick.parentElement.className="disabled";
    }
    else if (count==array.length-1 ){
        rightClick.parentElement.className="disabled";
    }
    else {
        leftClick.parentElement.className="image-viewer__button";
        rightClick.parentElement.className="image-viewer__button";
    }
    image.src= array[count];
    imgSource[0].innerHTML=
    `<span>Source: </span><a href=${ array[count] }>${array[count]}</a>`;*/

}

leftClick.addEventListener("click", function(){ 
    if (count==0){
        alert('This is the first page!');
    }
    else{
        count=count-1;
        loadImage();
    }
});
rightClick.addEventListener("click", function(){ 
    if (count==array.length-1){
        alert('This is the final page!');
    }
    else{
        count=count+1;
        loadImage();
    }
});

