/**
TODO:

connect to MongoDB
boxes display green based on acquired property
entry form to select a box and enter innerText / acquired status

userID: {
    name: string,
    boxes: [
        {
            id: number
            grid-position: [number, number]
            innerText: string
            acquired: boolean
        }
    ]
}

 */



window.onload = function() {

    const board = document.getElementById('board');

    for (let i = 0; i < 16; i++) {
        const box = document.createElement('div');
        box.className = 'boxes outstanding';
        board.append(box);
    }

    const boxes = document.querySelectorAll('.boxes');
    console.log(boxes);

    function transition() {
        const thisStyle = window.getComputedStyle(this, null);
        console.log(thisStyle.getPropertyValue('background-color'));
        thisStyle.setPropertyValue('background-color', 'red');
    }

    boxes.forEach((box) => {
        box.onclick = transition;
    })

}