window.onload = function() {

    window.addEventListener('contextmenu', function (e) { 
      // do something here... 
      e.preventDefault(); 
    }, false);

    // const skills = [
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    //     {status: 'outstanding', value: ''},
    // ];

    const skills = [
        {status: 'outstanding', value: 'Unit Testing'},
        {status: 'acquired', value: 'Deploy a CRUD app (Heroku)'},
        {status: 'outstanding', value: 'CSS Pre-processing'},
        {status: 'outstanding', value: 'SQL Queries'},
        {status: 'outstanding', value: 'Complete Frontend Expert'},
        {status: 'outstanding', value: 'React Dynamic Forms / Hooks'},
        {status: 'acquired', value: 'OAuth 2.0'},
        {status: 'outstanding', value: 'Redux'},
        {status: 'acquired', value: 'Dijkstra\'s Algorithm'},
        {status: 'outstanding', value: 'Big O Notation'},
        {status: 'outstanding', value: 'Sorting Algorithms (Merge, Bubble, Pancake, Quick)'},
        {status: 'acquired', value: 'RESTful API'},
        {status: 'outstanding', value: 'React Hooks (memo / useMemo, ref / useRef, useEffect)'},
        {status: 'acquired', value: 'TypeScript'},
        {status: 'outstanding', value: 'Tree Recursion'},
        {status: 'outstanding', value: 'Deploy a microservice app (Docker, Kubernetes, AWS'},
    ];

    const board = document.getElementById('board');
    const boxValue = document.getElementById('box-value');

    function boxSelect() {
        content = this.innerText;
        index = this.key;
        boxValue.innerText = 'Box# ' + index + '\n' + content;
    }

    function toggleColor() {
        this.classList.toggle('outstanding');
        this.classList.toggle('acquired');
    }


    skills.forEach((skill, index) => {
        const box = document.createElement('div');

        box.innerText = skill.value;
        box.key = index;
        box.onclick = boxSelect;
        box.oncontextmenu = toggleColor;
        box.classList.add('boxes');

        if (skill.status === 'outstanding') {
            box.classList.add('outstanding');
        } else if (skill.status === 'acquired') {
            box.classList.add('acquired');
        }

        board.append(box);
    });
}