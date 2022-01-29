window.onload = function() {



    // select the main board div
    const board = document.querySelector('#board');
    // select the form field where new box values are entered
    const boxValue = document.querySelector('#box-value');
    // select the user input form
    const userInput = document.querySelector('#user-input');

    const submitButton = document.querySelector('#submit-button');
    submitButton.onclick = submitForm;



    // get and display the current user's skills array
    async function getSkillsArray() {
        const response = await fetch('/user-skills', {
            method: 'GET'
        });
        const user = await response.json();
        populateBoard(user.boardContent);

        const image = document.createElement('img');
        image.src = user.imageUrl;
        image.classList.add('user-image');
        document.querySelector('#top-menu ul').append(image);
    }
    // invoke
    getSkillsArray();


    // select the box that is clicked and display it's content
    function boxSelect() {
        content = this.innerText;
        index = this.key;
        boxValue.innerText = 'Box# ' + index + '\n' + content;
    }
    // toggle color via form submit
    function toggleColor() {
        this.classList.toggle('outstanding');
        this.classList.toggle('acquired');
    }


    // to-do: update from itraversing hardcoded array to acquiring user array
    function populateBoard(arrayOfSkills) {
        return arrayOfSkills.forEach((skill, index) => {
            const box = document.createElement('div');

            box.innerText = skill.value;
            box.key = index;
            box.onclick = boxSelect;
            box.classList.add('boxes');

            if (skill.status === 'outstanding') {
                box.classList.add('outstanding');
            } else if (skill.status === 'acquired') {
                box.classList.add('acquired');
            }

            board.append(box);
        });
    }


    function submitForm(e) {
        e.preventDefault();
        const boxValue = document.querySelector('#box-value').innerText;
        const radioButtons = document.querySelectorAll('[name="status"]');

        if (boxValue === '' || (!radioButtons[0].checked && !radioButtons[1].checked)) {
            alert('                    NO BOX SELECTED OR NO STATUS SELECTED!!');
            return;
        }

        const boxes = document.querySelectorAll('.boxes');
        const boxIndex = boxValue.match(/\b(0?[0-9]|[1-9][0-9]|100)\b/g)[0];
        const newValue = document.querySelector('#text-input').value;
        const newStatus = radioButtons[0].checked ? radioButtons[0].value : radioButtons[1].value;
        const oldStatus = radioButtons[0].checked ? radioButtons[1].value : radioButtons[0].value;

        console.log(newStatus, oldStatus);

        // console.log(boxIndex);
        // console.log(newValue);
        // console.log(newStatus);

        const selectedBox = boxes[boxIndex];
        selectedBox.innerText = newValue;
        selectedBox.classList.add(newStatus);
        selectedBox.classList.remove(oldStatus);
        console.log(![...selectedBox.classList].includes(newStatus));

        const newBody = {
            status: newStatus,
            value: newValue,
            index: boxIndex,
        }
        console.log(newBody);

        const request = fetch('/user-skills', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBody)
        });

    }

}