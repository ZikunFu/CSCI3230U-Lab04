$(document).ready(function () {
    let table = $('#scores');
    
    for (let i = 0; i <= 4; i++) {
        let tr = $('<tr>');
        
        const month = randomNum(0, 12);
        const day = randomNum(1, 31);
        const time = randomNum(10, 60);

        let data1 = $('<td>');
        data1.text("2021/" + month + "/" + day);
        
        tr.append(data1);

        let data2 = $('<td>');
        data2.text("00:" + time);
        
        tr.append(data2);
        table.append(tr);

    }

    function randomNum(start, end) {
        return Math.floor((Math.random() * end) + start);
    }
})