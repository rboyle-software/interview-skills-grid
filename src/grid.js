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
        this.classList.toggle('outstanding');
        this.classList.toggle('acquired');
    }

    boxes.forEach((box, i) => {
        box.onclick = transition;
        if (i % 7 === 0) {
            box.classList.toggle('outstanding');
            box.classList.toggle('acquired');
        }
    })
    
}