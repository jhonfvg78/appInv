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

function updateImage() {
    let imageInput = document.getElementById("image");
    let image = document.getElementById("itemImage");
    if (imageInput.value) image.src = imageInput.value;
}
//-----------------------------------------------------------------------------
