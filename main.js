const maxFileSize = 1048576; // 1MB
const removeButton = 'X';

// hide warnings
document.getElementById("error").style.display = "none";
document.getElementById("warning").style.display = "none";

const realFile = document.getElementById("image-file");
const btn = document.getElementById("add");
const upload = document.getElementById("upload");
const name = document.getElementById("noFile");

// button to choose the file
btn.addEventListener("click", function () {
    realFile.click();
});

realFile.addEventListener("change", function () {
    if (realFile.value) {
        name.innerHTML = realFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    } else {
        name.innerHTML = "No file(s) chosen.";
    }
});

// create event to upload the file
upload.addEventListener('click', function () {
    let fileName = document.getElementById('image-file').value;

    if (fileName) {
        addFile(fileName);
        document.getElementById('image-file').value = null;
        name.innerHTML = "No file(s) chosen.";
    }
});

function selectFile() {

    // when you choose wrong file format
    const fileName = document.getElementById("image-file").value;
    const removeDot = fileName.lastIndexOf(".") + 1;
    const fileFormat = fileName.substr(removeDot, fileName.length).toLowerCase();
    if (fileFormat != "jpg") {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").style.color = "red";

        document.getElementById("image-file").value = null;
        return;
    }

    // if you choose wrong file size
    const imgFile = document.getElementById("image-file").files[0];
    if (imgFile.size > maxFileSize) {
        document.getElementById("warning").style.display = "block";

        document.getElementById("image-file").value = null;
        return;
    }
}

// remove an item
function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
     
     parent.removeChild(item);
 }


// create a list of added images 
function addFile(event) {
    const list = document.getElementById('info-files');

    const item = document.createElement('li');
    item.classList.add('img_name');
    item.innerHTML = event.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];

    var buttons = document.createElement('span');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeButton;

    remove.addEventListener('click', removeItem);

    buttons.appendChild(remove);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
};
