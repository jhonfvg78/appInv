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
    let urlInput = document.getElementById("image").value;
    window.open(urlInput);
}

function openUrlResource() {
    let urlInput = document.getElementById("resource").value;
    window.open(urlInput);
}

function imageError(event) {
    event.target.src = "/template/img/item/item.png"
    event.onerror = null
}

function clearUrlImage() {    
    document.getElementById("image").value = "";
    let image = document.getElementById("itemImage");
    let imageTemplate = document.getElementById("imageTemplate");
    image.src = imageTemplate.src;
}

function clearUrlResource() {
    document.getElementById("resource").value = "";
}

function updateImage() {
    let imageInput = document.getElementById("image");
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
//Update item
function updateItem() {
    let form = document.getElementById('updateForm')
    var selectedValue = document.getElementById("status").value;
    if (selectedValue == "Mantenimiento") {
        var date = new Date();
        document.getElementById("admission").value = date.toLocaleDateString();
        form.submit();
    }
    else {
        document.getElementById("admission").value = "";
        form.submit();
    }
}
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
//Search item
function itemSearch(value) {
    document.location.href = "/item/search/" + value
}
//-----------------------------------------------------------------------------
