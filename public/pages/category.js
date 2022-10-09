function updateImage() {
    let imageInput = document.getElementById("image");
    let image = document.getElementById("categoryImage");
    if (imageInput.value) image.src = imageInput.value;
}

$(document).ready(function () {
    $('#dataTables').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'excel',
            'pdf',
            {
                text: '<i class="fa-regular fa-file"></i>',
                className: 'btn btn-primary',
                action: function (e, dt, node, config) {
                    document.location.href = "/category/create"
                }
            }
        ]
    });
});

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