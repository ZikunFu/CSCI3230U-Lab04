$(document).ready(function () {
    let board = $('#board');
    let interface = $('#interface');

    //generate board table
    for (let row = 0; row <= 8; row++) {
        let tr = $('<tr>');
        for (let col = 0; col <= 8; col++) {
            let data = $('<td>');
            data.text('');
            data.attr('id', '' + col + row);
            data.click(boardOnClick)
            tr.append(data);
            
        }
        board.append(tr);
        
    }
    
    //generate interface table
    for (let i = 0; i <= 8; i++) {
        let data = $('<td>');
        if (i != 8) {
            data.click(interfaceOnClick);
            data.text(i);
            interface.append(data);
            
        }
        else {
            interface.append(data);
            let img = '<img src="images/undo.png" alt="undo"/>';
            data.append(img);
            data.click(redo);
        }
        
        
    }

    //create 2d array of board for check purposes
    var Vboard = new Array(9);
    for (var i = 0; i < Vboard.length; i++) {
        Vboard[i] = new Array(9)
    }

    for (var row = 0; row < Vboard.length; row++) {

        for (var col = 0; col < Vboard[row].length; col++) {
            Vboard[row][col] = '';
        }

    }

    //monitor user input on interface
    var inputValue = '';
    function interfaceOnClick() {
        inputValue = $(this).text();
    }

    var lastStep_id = '';

    //clear last step
    function redo() {
        Vboard[lastStep_id[0]][lastStep_id[1]]
        getCell(lastStep_id).text('');
        getCell(lastStep_id).css("background-color", "");
    }

    //monitor user input on board
    function boardOnClick() {
        var selected_value = $(this).text();
        if (selected_value != '') {
            alert("This spot is taken");
        }
        if (inputValue == '') {
            alert("Pick a number first");
            
        }
        else {
            
            var selected_id = $(this).attr('id');

            selectedCol = selected_id[0];
            selectedRow = selected_id[1];

            if (isValid(inputValue, selectedCol, selectedRow)) {
                //Replace cell
                $(this).text(inputValue);

                //Replace Vboard
                Vboard[selectedRow][selectedCol] = inputValue;

                //Reset inputvalue
                inputValue = '';

                lastStep_id = selected_id;
            }
            //check failed scenario
            else {
                $(this).css("background-color", "#f76c5e");
                lastStep_id = selected_id;
            }
            
        }
        
        
    }

    //take value and position as argument
    //return True it meets all checks
    function isValid(value,x1, y1) {
        var check1 = true;
        var check2 = true;
        var check3 = true;
        for (var row = 0; row < Vboard.length; row++) {
            for (var col = 0; col < Vboard[row].length; col++) {
                //id1 is position of the input value
                let id1 = '' + x1 + y1;
                //id2 is the position of the looping value
                let id2 = '' + row + col;

                //This checks if board contains same value
                //also avoid checking itself
                if (value == Vboard[row][col] && (!(id1 === id2))) {
                    //check for row
                    if (sameRow(x1, y1, col, row)) {
                        check1 = false
                    }
                    //check for column
                    if (sameColumn(x1, y1, col, row)) {
                        check2 = false;
                    }
                    //check for block
                    if (sameBlock(x1, y1, col, row)) {
                        check3 = false;
                    }
                }
                           
            }
        }
        return check1 && check2 && check3;
    }

    //return cell by its position
    function getCell(id) {
        return $("[id=" + id + "]")
    }

    //check functions
    function sameBlock(x1, y1, x2, y2) {
        let firstRow = Math.floor(y1 / 3) * 3;
        let firstCol = Math.floor(x1 / 3) * 3;
        return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
    }

    function sameRow(x1, y1, x2, y2) {
        return y1 == y2;
    }

    function sameColumn(x1, y1, x2, y2) {
        return x1 == x2;
    }
})
