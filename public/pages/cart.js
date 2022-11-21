//-----------------------------------------------------------------------------
//Datatables
$(document).ready(function () {
    var events = $('#events');
    var table = $('#dataTables').DataTable({
        dom: 'rtp',
        paging: false,
        // columnDefs: [
        //     {
        //         "targets": [0],
        //         "visible": false,
        //         //"searchable": false
        //     }
        // ]
    });
    
   
});
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Search item
function itemSearch(value) {
    document.location.href = "/loan/search/" + value
}
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
//Search item
function sendWswsCartQuantity(value, id) {
    const socket = io()
    socket.emit('wsCartQuantity', { value: value, id: id })
}
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Search item
function sendWsAddSearch(value) {
    const socket = io()
    socket.emit('wsItemAdd', { value: value })
    socket.on('refreshCart', () => {
        document.location.href = "/cart/list"
    })
    document.getElementById("searchItemInput").value="";
}
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Search item
function sendWsUserSelect(value) {
    const socket = io()
    socket.emit('wsUserSelect', { value: value })  
    socket.on('refreshCart', () => {
        document.location.href = "/cart/list"
    })  
    document.getElementById("userSelectInput").value="";
}
//-----------------------------------------------------------------------------