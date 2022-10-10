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


function clearImage() {
    document.getElementById("image").value = "";
}

function updateImage() {
    let imageInput = document.getElementById("image");
    let image = document.getElementById("itemImage");
    if (imageInput.value) image.src = imageInput.value;
}


function prepareForm(reference) {
    let input = document.getElementById("confirm_delete");
    let form = document.getElementById("formId");
    if (input.value == reference) {
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
        input.value = "";
        return false
    }
}

$(document).ready(function () {
    $('#dataTables').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: '<i class="fa-solid fa-file-excel"></i>',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-info',
            },
            {
                extend: 'pdf',
                text: '<i class="fa-solid fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-info',
            },
            {
                text: '<i class="fa-solid fa-list"></i>',
                className: 'btn btn-info',
                titleAttr: 'Categorías',
                action: function (e, dt, node, config) {
                    $('#categoryModal').modal('show');
                }
            },
            {
                text: '<i class="fa-regular fa-file"></i>',
                className: 'btn btn-info',
                titleAttr: 'Agregar Elemento',
                action: function (e, dt, node, config) {
                    document.location.href = "/item/create"
                }
            }
        ]
    });
});

// function isImage(url) {
//     return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
// }

function openDataSheet() {
    let dataSheetInput = document.getElementById("inputdatasheet").value;
    window.open(dataSheetInput);
}


function openDrive() {
    let dataSheetInput = document.getElementById("inputdrive").value;
    window.open(dataSheetInput);
}


