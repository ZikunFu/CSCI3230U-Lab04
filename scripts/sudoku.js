$(document).ready(function () {
    let board = $('#board');
    let interface = $('#interface');
    for (let row = 1; row <= 9; row++) {
        let rowElement = $('<tr>');
        let data = $('<td>');
        for (let col = 1; col <= 9; col++) {
            let data = $('<td>');
            data.text(''+col+row);
            data.attr('id', '' + col + row)
            //alert(data.attr('id'))
            board.append(data);
            
        }
        board.append(rowElement);
        console.log(row)
    }

    for (let i = 1; i <= 9; i++) {
        let data = $('<td>');
        if (i != 9) {
            data.click(interfaceOnClick)
            data.text(i);

        }
        
        interface.append(data);
    }
    function interfaceOnClick() {
        alert($(this).text())
    }
})
