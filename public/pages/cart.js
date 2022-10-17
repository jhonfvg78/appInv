$(document).ready(function () {
    $('#dataTables').DataTable({
        dom: 'rtip'
    });
});

function imageError(event) {
    event.target.src = "/template/img/item/item.png"
    event.onerror = null
}