//-----------------------------------------------------------------------------
//Datatables
$(document).ready(function () {
    $('#dataTables').DataTable({
        dom: 'rtip',
    });
});
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Image
function openUrlImage(urlType) {
    let urlInput = document.getElementById("image").value;      
    window.open(urlInput);
}

function openUrlResource(urlType) {
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
//Delete item
function deleteItem() {
    let reference = document.getElementById('deleteReference').textContent;
    let confirm_reference = document.getElementById("confirm_reference");
    let form = document.getElementById('deleteForm')
    if (confirm_reference.value == reference) {
        form.submit();
    }
    else {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        toastr.error('Error de validación')
        confirm_reference.value = "";
        return false
    }
}

function deleteSelectItem(id) {
    document.getElementById('deleteReference').textContent = "";
    document.getElementById('deleteId').textContent = "";
    fetch('/item/list/' + id)
        .then(response => response.json())
        .then((data) => {
            document.getElementById('deleteReference').textContent = data.reference;
            document.getElementById('deleteId').textContent = data.id;
            document.getElementById('deleteForm').action = "/item/delete/" + data.id
            var myModal = new bootstrap.Modal(document.getElementById('deleteModal'), {})
            myModal.show();
        }
        );
}
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Detail item
function detailSelectItem(id) {
    // document.getElementById('deleteReference').textContent = "";
    // document.getElementById('deleteId').textContent = "";
    fetch('/item/list/' + id)
        .then(response => response.json())
        .then((data) => {
            let image = document.getElementById("detailItemImage");
            image.src = data.image;
            document.getElementById('detailReference').textContent =  "Referencia: "+ data.reference; 
            document.getElementById('detailCategory').textContent = "Categoría: "+ data.category;
            document.getElementById('detailQuantity').textContent = "Cantidad: "+ data.quantity;
            document.getElementById('detailLocation').textContent = "Ubicación: "+ data.location;
            document.getElementById('detailDescription').innerHTML = data.description;
            document.getElementById('detailResource').textContent = data.resource;
            
            detailDescription
            // document.getElementById('deleteReference').textContent = data.reference;
            // document.getElementById('deleteId').textContent = data.id;
            // document.getElementById('deleteForm').action = "/item/delete/" + data.id
            var myModal = new bootstrap.Modal(document.getElementById('detailModal'), {})
            myModal.show();
        }
        );
}

function openUrlDetailResource() {
    let  url = document.getElementById("detailResource").textContent;           
    window.open(url);
}
//-----------------------------------------------------------------------------





