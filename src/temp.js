const boxesArray = document.querySelectorAll('.boxes');

function colorToggle() {
    this.classList.toggle('outstanding');
    this.classList.toggle('acquired');
}

const greenBoxes = [0, 2, 5, 8];

for (let i = 0; i < 16; i++) {
    const box = boxesArray[i];
    box.onclick = colorToggle;

    if (greenBoxes.includes(i)) {
        box.classList.add('acquired');
    } else {
        box.classList.add('outstanding');
    }
}
