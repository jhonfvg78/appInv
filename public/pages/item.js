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


function updateImage() {
    let imageInput = document.getElementById("image");
    let image = document.getElementById("uploadedAvatar");
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

