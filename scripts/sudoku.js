$(document).ready(function () {
    let board = $('#board');
    let interface = $('#interface');

    //generate board table
    for (let row = 0; row <= 8; row++) {
        let tr = $('<tr>');
        for (let col = 0; col <= 8; col++) {
            let data = $('<td>');
            data.text('-1');
            data.attr('id', '' + col + row);
            data.click(boardOnClick)
            tr.append(data);
            
        }
        board.append(tr);
        
    }

    //custom board
    getCell('01').text('1');
    getCell('07').text('9');
    getCell('12').text('4');
    getCell('16').text('2');
    getCell('22').text('8');
    getCell('25').text('5');
    getCell('37').text('3');
    getCell('40').text('2');
    getCell('44').text('4');
    getCell('46').text('1');
    getCell('62').text('1');
    getCell('63').text('8');
    getCell('66').text('6');
    getCell('71').text('3');
    getCell('77').text('8');
    getCell('82').text('6');

    
    //generate interface table
    for (let i = 0; i <= 10; i++) {
        let data = $('<td>');
        if (i != 10) {
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
            Vboard[row][col] = '-1';
        }

    }

    Vboard[1][0] = 1;
    Vboard[7][0] = 9;
    Vboard[2][1] = 4;
    Vboard[6][1] = 2;
    Vboard[2][2] = 8;
    Vboard[5][2] = 5;
    Vboard[7][3] = 3;
    Vboard[0][4] = 2;
    Vboard[4][4] = 4;
    Vboard[6][4] = 1;
    Vboard[2][6] = 1;
    Vboard[3][6] = 8;
    Vboard[6][6] = 6;
    Vboard[1][7] = 3;
    Vboard[7][7] = 8;
    Vboard[2][8] = 6;

    //monitor user input on interface
    var inputValue = '';
    function interfaceOnClick() {
        inputValue = $(this).text();
    }

    var lastStep_id = '';

    //clear last step
    function redo() {
        Vboard[lastStep_id[0]][lastStep_id[1]] = -1;
        getCell(lastStep_id).text('-1');
        
        for (var i = 0; i < 9; i++) {
            for (var y = 0; y < 9; y++) {
                getCell(''+i+y).css("background-color", "");
            }
        }
    }

    //monitor user input on board
    function boardOnClick() {
        var selected_value = $(this).text();
        if (inputValue == '') {
            alert("Pick a number first");

        }
        else if (selected_value != '-1') {
            alert("This spot is taken");
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
            else{

                $(this).css("background-color", "#f76c5e");
                lastStep_id = selected_id;
            }
            
        }        

    }

    //these functions handle same block errors
    function turnRed(rowStart,rowEnd, colStart,colEnd) {
        for (var i = rowStart; i < rowEnd; i++){
            for (var y = colStart; y < colEnd; y++) {
                getCell('' + i + y).css("background-color", "#f76c5e");
            }
        }
    }
    function blockRed(id1) {
        var row = id1[0];
        var col = id1[1];

        if (row < 3 && col < 3) {
            turnRed(0, 3, 0, 3);
        }
        else if (row < 3 && col < 6) {
            turnRed(0, 3, 3, 6);
        }
        else if (row < 3 && col < 9) {
            turnRed(0, 3, 6, 9);
        }

        else if (row < 6 && col < 3) {
            turnRed(3, 6, 0, 3);
        }
        else if (row < 6 && col < 6) {
            turnRed(3, 6, 3, 6);
        }
        else if (row < 6 && col < 9) {
            turnRed(3, 6, 6, 9);
        }
        else if (row < 9 && col < 3) {
            turnRed(6, 9, 0, 3);
        }
        else if (row < 9 && col < 6) {
            turnRed(6, 9, 3, 6);
        }
        else if (row < 9 && col < 9) {
            turnRed(6, 9, 6, 9);
        }


    }

    //take value and position as argument
    //return True it meets all checks
    function isValid(value,x1, y1) {
        var check1 = true;
        var check2 = true;
        var check3 = true;
        console.log()
        for (var row = 0; row < Vboard.length; row++) {
            for (var col = 0; col < Vboard[row].length; col++) {
                //id1 is position of the input value
                let id1 = '' + x1 + y1;
                //id2 is the position of the looping value
                let id2 = '' + row + col;

                //This checks if board contains same value
                //also avoid checking itself
                if (value == Vboard[row][col] && (!(id1 == id2))) {
                    //check for row
                    if (sameRow(x1, y1, col, row)) {
                        //change color to red
                        for (var i = 0; i < 9; i++){
                            getCell('' + i + id1[1]).css("background-color", "#f76c5e");
                        }
                        check1 = false
                        break;
                    }
                    //check for column
                    if (sameColumn(x1, y1, col, row)) {
                        console.log("position " + id1 + " is in the same column with " + id2)
                        //change color to red
                        for (var i = 0; i < 9; i++) {
                            getCell('' + id1[0] + i).css("background-color", "#f76c5e");
                        }
                        check2 = false;
                        break;
                    }
                    //check for block
                    if (sameBlock(x1, y1, col, row)) {
                        //change color to red
                        blockRed(id1);
                        check3 = false;
                        
                        break;
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
