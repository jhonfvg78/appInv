//-----------------------------------------------------------------------------
//Datatables
$(document).ready(function () {
    var events = $('#events');
    var table = $('#dataTables').DataTable({
        dom: 'rtp',
        select: true,
        paging: false,
        order: [[2, 'asc']],
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
//Select
function selectAllRows() {
    var table = $('#dataTables').DataTable();
    table.rows().select();
}

function deselectAllRows() {
    var table = $('#dataTables').DataTable();
    table.rows().deselect();
}
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Modal
function showModal() {
    var table = $('#dataTables').DataTable();
    var data = table.rows({ selected: true }).data();
    if (data.length > 0) {
        $('#tableItemRemove tbody').empty();
        document.getElementById('countItems').textContent = data.length;
        for (var i = 0; i < data.length; i++) {
            var row = $(
                `<tr>  
                <td style="display:none;">` + data[i][0] + `</td>                     
                <td>` + data[i][2] + `</td>
                <td> 
                    <input type="number" class="form-control"
                    value="`+ data[i][3] + `" style="width: 80px" min="1"
                    max="`+ data[i][3] + `" />  
                </td> 
                <td>` + data[i][4] + `</td> 
                <td>` + data[i][5] + `</td>
            </tr>`
            );
            $("#tableItemRemove > tbody").append(row);
        }
        $('#loanModal').modal('show')
    }
}
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Search item
function itemSearch(value) {
    document.location.href = "/loan/search/" + value
}
//-----------------------------------------------------------------------------