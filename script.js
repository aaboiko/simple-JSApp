const sendButton = document.getElementById("send-button");
const addButton = document.getElementById("add-button");
const input = document.getElementById("input");
const select = document.getElementById("select");
let canMakeBlack = false;
let optionsObject = [];
let json;

optionsObject = JSON.parse(localStorage.getItem('data'));

if (optionsObject !== null) {
    console.log('Selected option: ' + select.selectedIndex);
    for (let i = 0; i < optionsObject.length; i++) {
        if (select.options[i] === undefined) {
            let opt = document.createElement('option');
            select.append(opt);
            select.options[select.options.length - 1].value = optionsObject[i];
            select.options[select.options.length - 1].text = select.options[select.options.length - 1].value;
        }
        select.options[i].value = optionsObject[i];
        select.options[i].text = select.options[i].value;

        select.selectedIndex = localStorage.getItem('selected');
    }
    input.value = select.options[select.selectedIndex].value;
}
else {
    optionsObject = [1, 2, 3, 4];
}

function changeOption() {
    let val = input.value.trim();
    if (val === '') {
        input.classList.toggle('input-red', true);
        canMakeBlack = true;
    }
    else {
        select.options[select.selectedIndex].value = val;
        select.options[select.selectedIndex].text = val;
        optionsObject[select.selectedIndex] = val;
        input.value = input.value.trim();
        saveData();
    }
}

function addOption() {
    let val = input.value.trim();
    if (val === '') {
        input.classList.toggle('input-red', true);
        canMakeBlack = true;
    }
    else {
        let opt = document.createElement('option');
        opt.classList.add('option');
        select.append(opt);
        select.options[select.options.length - 1].value = val;
        select.options[select.options.length - 1].text = val;
        optionsObject.push(val);
        saveData();
    }
}

function selectClick() {
    input.classList.toggle('input-red', false);
    canMakeBlack = false;
}

function saveData() {
    for (let i = 0; i < select.options.length; i++) {
        optionsObject[i] = select.options[i].innerText;
    }
    json = JSON.stringify(optionsObject);
    localStorage.setItem('data', json);
    localStorage.setItem('selected', select.selectedIndex);
}

sendButton.addEventListener('click', changeOption);
select.addEventListener('click', selectClick);

input.oninput = function () {
    
    if (canMakeBlack) {
        input.classList.toggle('input-red', false);
        canMakeBlack = false;
    }
}

select.addEventListener('change', function () {
    input.value = select.options[select.selectedIndex].value;
    localStorage.setItem('selected', select.selectedIndex);
});

addButton.addEventListener('click', addOption);

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        let number = parseInt(prompt('Press 1 to save option or 2 to add option', 1));

        switch (number) {
            case 1:
                changeOption();
                break;
            case 2:
                addOption();
                break;
            default:
                alert('You can type 1 or 2 only');
        }
    }
});