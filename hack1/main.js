// TODO:
let comment_input = document.getElementById('comment-input');
let comment_button = document.getElementById('comment-button');
let cancel_button = document.getElementById('cancel-button');
let comment_btn_group = document.getElementById('comment-button-group');
let comment_group = document.getElementById('comment-group');
let comment_sample = document.getElementsByClassName('comment')[0];
let comment_number = document.getElementById('comment-num');
let basic_number = 1;

comment_btn_group.style.visibility = 'hidden';

function updateComNum(){
    comment_number.innerText = `${basic_number}則留言`;
}

function startInput(){
    comment_btn_group.style.visibility = 'visible';
}

function clearInput(){
    let tmp_value =  comment_input.value;
    comment_input.value="";
    comment_button.style.background="#cccccc";
    return tmp_value;
}
function cancel(){
    let nothing = clearInput(); 
    comment_btn_group.style.visibility = 'hidden';
}
function confirmComment(){
    comment = clearInput();
    if (comment == ""){
        comment_button.disable = true;
    }
    else{
        comment_button.disable = false;
        let divClone = comment_sample.cloneNode(true);
        let new_comment_content = divClone.getElementsByTagName('p')[0];
        new_comment_content.innerText = comment;
        comment_group.appendChild(divClone);
        basic_number++;
        updateComNum();
    }
}

comment_input.oninput = function(){
    if (comment_input.value != ""){
        comment_button.style.background="#065fd4";
    }
    else{
        comment_button.style.background="#cccccc";
    }
};
comment_input.addEventListener('click',startInput);
comment_button.addEventListener('click',confirmComment);
cancel_button.addEventListener('click',cancel);