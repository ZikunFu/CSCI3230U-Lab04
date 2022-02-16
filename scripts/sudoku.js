$(document).ready(function () {
    let board = $('#board');
    let interface = $('#interface');
    for (let row = 1; row <= 9; row++) {
        let rowElement = $('<tr>');
        let data = $('<td>');
        for (let col = 0; col <= 8; col++) {
            let data = $('<td>');
            data.text(''+col+row);
            data.attr('id', '' + row + col);
            //alert(data.attr('id'))
            board.append(data);
            
        }
        board.append(rowElement);
        console.log(row);
    }

    for (let i = 0; i <= 8; i++) {
        let data = $('<td>');
        if (i != 8) {
            data.click(interfaceOnClick);
            data.text(i);
            interface.append(data);
        }
        else {
            interface.append('<td><a href="#"><img src="images/undo.png" alt="undo" /></a></td>');
        }
        
        
    }
    var selected = '';
    function interfaceOnClick() {
        alert($(this).text()+'is clicked');
        selected = $(this).text();
    }
})
