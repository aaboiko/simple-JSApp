const sendButton = document.getElementById("send-button");
const addButton = document.getElementById("add-button");
const input = document.getElementById("input");
const sel = document.getElementById("select");
let canMakeBlack = false;
let optionsObject = [];
let json;

optionsObject = JSON.parse(localStorage.getItem('data'));

if (optionsObject !== null) {
    console.log('Selected option: ' + sel.selectedIndex);
    for (let i = 0; i < optionsObject.length; i++) {
        // TODO: remove try/catch - done
        sel.options[i].innerText = optionsObject[i];
        console.log(sel.options[i].value);
        let opt = document.createElement('option');
        sel.append(opt);
        sel.options[sel.options.length - 1].innerText = optionsObject[i];
        console.log('Parsed: ' + optionsObject[i]);
        sel.selectedIndex = localStorage.getItem('selected');
    }
    input.value = sel.options[sel.selectedIndex].value;
}
else {
    optionsObject = [1, 2, 3, 4];
    console.log(optionsObject.length);
}
// TODO: replace inline styles with class usage - done
function changeOption() {
    let val = input.value.trim();
    if (val === '') {
        input.className = 'input-red';
        console.log("border is red");
        canMakeBlack = true;
    }
    else {
        console.log('Sent: ' + val);
        sel.options[sel.selectedIndex].text = val;
        optionsObject[sel.selectedIndex] = val;
        input.value = input.value.trim();
        saveData();
    }
}

function addOption() {
    let val = input.value.trim();
    if (val === '') {
        input.className = 'input-red';
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
    input.className = 'input-black';
    canMakeBlack = false;
}

function saveData() {
    for (let i = 0; i < sel.options.length; i++) {
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
    // TODO: refctor - done
    if (canMakeBlack) {
        input.style.borderColor = "black";
        console.log("border is black");
        canMakeBlack = false;
    }
}
// TODO: use values instead of innerText
// TODO: cleanup id - done
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