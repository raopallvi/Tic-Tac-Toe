var boxes = document.querySelectorAll('.row-item');
var turn = "O"
var winnerArray = [];

var player = document.querySelector('#player-display span:nth-child(2)');
var result = document.querySelector('#player-display span:nth-child(1)');
function reset() {
    for (let i of boxes) {
        i.innerHTML = "";
    }
    turn = 'O';
    result.innerHTML = "Current Player -";
    player.innerHTML = "O";
    count = 0;
    for (let i of winnerArray) {
        document.getElementById(i).style.backgroundColor = 'rgba(35, 247, 35 , 0)'
    }
    while (winnerArray.length) winnerArray.pop();
}
reset();


var count = 0;
for (let i of boxes) {
    i.addEventListener('click', function () {
        if (i.innerHTML.length == 0) {
            count++;
            i.innerHTML = turn;
            let checker = false;
            if (checkWinner(i.id)) {
                announceWinner();
                checker = true;
            }
            else if (count == 9) {
                result.innerHTML = "Match Drawn 😒";
                player.innerHTML = '';
                setTimeout(reset, 3000);
            }
            if (turn == 'X' && !checker) {
                turn = player.innerHTML = 'O';
            }
            else if(!checker) player.innerHTML = turn = 'X';
        }
    })
}

function checkWinner(id) {
    let row = Number(id[0]);
    let col = Number(id[1]);
    for (let i = 0; i < 3; i++) {
        let tempId = String(i) + col;
        if (document.getElementById(tempId).innerHTML != turn) {
            while (winnerArray.length) winnerArray.pop();
            break;
        }
        winnerArray.push(tempId);
    }
    if (winnerArray.length == 3) return true;
    for (let i = 0; i < 3; i++) {
        let tempId = row + String(i);
        if (document.getElementById(tempId).innerHTML != turn) {
            while (winnerArray.length) winnerArray.pop();
            break;
        }
        winnerArray.push(tempId);
    }
    if (winnerArray.length == 3) return true;

    if (row == col) {
        if ((document.getElementById('00').innerHTML == document.getElementById('11').innerHTML) && (document.getElementById('11').innerHTML == document.getElementById('22').innerHTML)) {
            winnerArray.push('00');
            winnerArray.push('11');
            winnerArray.push('22');
            return true;
        }
    }
    if ((row == 0 && col == 2) || (row == 2 && col == 0)) {
        if ((document.getElementById('02').innerHTML == document.getElementById('11').innerHTML) && (document.getElementById('11').innerHTML == document.getElementById('20').innerHTML)) {
            winnerArray.push('02');
            winnerArray.push('11');
            winnerArray.push('20');
            return true;
        }
    }
    return false;
}

function announceWinner() {
    for (let i of winnerArray) {
        document.getElementById(i).style.backgroundColor = 'rgba(35, 247, 35 , 0.5)'
    }
    result.innerHTML = turn + " is Winner 🏆🏆";
    player.innerHTML = '';
    setTimeout(reset, 2000);
    return;
}