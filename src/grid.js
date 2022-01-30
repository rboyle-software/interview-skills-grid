window.onload = function() {

    // select the main board div
    const board = document.querySelector('#board');
    // select the form field where new box values are entered
    const boxValue = document.querySelector('#box-value');
    // select the user input form
    const userInput = document.querySelector('#user-input');
    // select the submit button
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
        document.querySelector('#top-menu').append(image);
    }
    // invoke
    getSkillsArray();


    // select the box that is clicked and display it's content
    function boxSelect() {
        content = this.innerText;
        index = this.key;
        boxValue.innerText = 'Box#'.concat(' ', index, '\n', content);
    }
    // toggle color via form submit
    function toggleColor() {
        this.classList.toggle('outstanding');
        this.classList.toggle('acquired');
    }


    // populate the board with values from the user's boardContent array
    function populateBoard(arrayOfSkills) {

        return arrayOfSkills.forEach((skill, index) => {
            const box = document.createElement('div');

            box.key = index;
            box.onclick = boxSelect;
            box.classList.add('boxes');
            box.innerText = skill.value;

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

        // select all boxes, input text, text from interface screen, and radio buttons
        const boxes = document.querySelectorAll('.boxes');
        const newValue = document.querySelector('#text-input').value;
        const boxValue = document.querySelector('#box-value').innerText;
        const radioButtons = document.querySelectorAll('[name="status"]');

        // alert if no Box selected
        if (boxValue === '') {
            Swal.fire(
                'Please select a box on the grid!',
                '',
                'error'
            );
            return;
        }

        // alert if no Status radio selected
        if (!radioButtons[0].checked && !radioButtons[1].checked) {
            Swal.fire(
                'Please select a "Status"!',
                '',
                'error'
            );
            return;
        }

        // prepare update for box and interface
        const newStatus = radioButtons[0].checked ? radioButtons[0].value : radioButtons[1].value;
        const oldStatus = radioButtons[0].checked ? radioButtons[1].value : radioButtons[0].value;
        const boxIndex = boxValue.match(/\b(0?[0-9]|[1-9][0-9]|100)\b/g)[0];
        const selectedBox = boxes[boxIndex];

        // update box
        selectedBox.innerText = newValue;
        selectedBox.classList.add(newStatus);
        selectedBox.classList.remove(oldStatus);

        // update the interface
        document.querySelector('#box-value').innerText = 'Box#'.concat(' ', boxIndex, '\n', newValue);

        // prepare database update
        const updateObject = {
            status: newStatus,
            value: newValue,
            index: boxIndex,
        }

        // update database
        const request = fetch('/user-skills', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateObject)
        });

    }

}