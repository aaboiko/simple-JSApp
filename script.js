let sendButton = document.getElementById("send-button");
let addButton = document.getElementById("add-button");
let input = document.getElementById("input");
let sel = document.getElementById("select");
let canMakeBlack = false;
let optionsObject = [];
let json;

optionsObject = JSON.parse(localStorage.getItem('data'));

if (optionsObject !== null) {
    sel.selectedIndex = localStorage.getItem('selected');
    console.log('Selected option: ' + sel.selectedIndex);
    for (let i = 0; i < optionsObject.length; i++) {
        try {
            sel.options[i].innerText = optionsObject[i];
            console.log(sel.options[i].innerText);
        }
        catch (err) {
            let opt = document.createElement('option');
            sel.append(opt);
            sel.options[sel.options.length - 1].innerText = optionsObject[i];
        }
        console.log('Parsed: ' + optionsObject[i]);
    }
    input.value = sel.options[sel.selectedIndex].innerText;
}
else {
    optionsObject = [1, 2, 3, 4];
    console.log(optionsObject.length);
}

function changeOption() {
    let val = input.value.trim();
    if (val === '') {
        input.style.borderColor = "red";
        console.log("border is red");
        canMakeBlack = true;
    }
    else {
        console.log(val);
        sel.options[sel.selectedIndex].innerText = val;
        optionsObject[sel.selectedIndex] = val;
        saveData();
    }
}

function addOption() {
    let val = input.value.trim();
    if (val === '') {
        input.style.borderColor = "red";
        console.log("border is red");
        canMakeBlack = true;
    }
    else {
        let opt = document.createElement('option');
        sel.append(opt);
        sel.options[sel.options.length - 1].innerText = val;
        optionsObject.push(val);
        saveData();
    }
}

function selectClick() {
    input.style.borderColor = "black";
    canMakeBlack = false;
}

function saveData(){
    for(let i=0; i<sel.options.length; i++){
        optionsObject[i] = sel.options[i].innerText;
    }
    json = JSON.stringify(optionsObject);
    localStorage.setItem('data', json);
    localStorage.setItem('selected', sel.selectedIndex);
    console.log('Saved. Selected: ' + sel.selectedIndex);
    console.log(optionsObject.length);
}

sendButton.addEventListener('click', changeOption);
sel.addEventListener('click', selectClick);

input.oninput = function () {
    if (canMakeBlack) {
        input.style.borderColor = "black";
        console.log("border is black");
    }
    canMakeBlack = false;
}
sel.addEventListener('change', function () {
    input.value = sel.options[sel.selectedIndex].innerText;
    localStorage.setItem('selected', sel.selectedIndex);
    console.log('Selected option changed on ' + sel.selectedIndex);
});

addButton.addEventListener('click', addOption);

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        let number = parseInt(prompt('Press 1 to save option or 2 to add option', 1));
        console.log(number);

        switch (number) {
            case 1:
                console.log('1 pressed');
                changeOption();
                break;
            case 2:
                console.log('2 pressed');
                addOption();
                break;
            default:
                console.log('Default');
        }
    }
});

