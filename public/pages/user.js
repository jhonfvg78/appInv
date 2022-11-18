//-----------------------------------------------------------------------------
//Datatables
$(document).ready(function () {
    $('#dataTables').DataTable({
        dom: 'rtp',
    });
});
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Image
function openUrlImage() {
    let urlInput = document.getElementById("photo").value;
    window.open(urlInput);
}

function imageError(event) {
    event.target.src = "/template/img/item/item.png"
    event.onerror = null
}

function clearUrlImage() {
    document.getElementById("photo").value = "";
    let image = document.getElementById("itemImage");
    let imageTemplate = document.getElementById("imageTemplate");
    image.src = imageTemplate.src;
}

function updateImage() {
    let imageInput = document.getElementById("photo");
    let image = document.getElementById("itemImage");
    if (imageInput.value) image.src = imageInput.value;
}
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//GenerateTag
function dec2hex(dec) {
    return dec.toString(16).padStart(2, "0")
}

function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

function genId() {
    document.getElementById('tag').value = generateId(20);
}
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Search user
function userSearch(value) {
    document.location.href = "/user/search/" + value
}
//-----------------------------------------------------------------------------
