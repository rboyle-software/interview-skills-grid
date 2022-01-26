window.onload = function() {

    const boxesArray = document.querySelectorAll('.boxes');

    function colorToggle() {
        this.classList.toggle('outstanding');
        this.classList.toggle('acquired');
    }

    for (let i = 0; i < 16; i++) {
        const box = boxesArray[i];
        box.onclick = colorToggle;
        box.classList.add('boxes');

        if (i % 5 === 0) {
            box.classList.add('acquired');
        } else {
            box.classList.add('outstanding');
        }

    }

}
