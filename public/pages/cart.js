//-----------------------------------------------------------------------------
//Datatables
$(document).ready(function () {
    var events = $('#events');
    var table = $('#dataTables').DataTable({
        dom: 'rtp',
        paging: false,
        columnDefs: [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            }
        ]
    });
});
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Search item
function itemSearch(value) {
    document.location.href = "/loan/search/" + value
}
//-----------------------------------------------------------------------------
