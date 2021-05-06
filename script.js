let sendButton = document.getElementById("send-button");
let input = document.getElementById("input");
let sel = document.getElementById("select");
let opts = sel.options;
let selectedOption;
let n = 2;

function changeOption() {
    if (input.value == '') {
        input.style.borderColor = "red";

    }
    else {
        console.log(input.value);
        sel.options[sel.selectedIndex].innerText = input.value;
        input.value = '';
    }
}

function selectClick() {
    input.style.borderColor = "black";

}

sendButton.addEventListener('click', changeOption);
sel.addEventListener('click', selectClick);
sel.addEventListener('change', function(){
    input.value = sel.options[sel.selectedIndex].innerText;
});
