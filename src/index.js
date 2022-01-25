window.onload = function() {

    const skills = [
        {status: 'outstanding', value: 'Unit Testing / Integration Testing'},
        {status: 'acquired', value: 'Deploy a CRUD app (Heroku, Netlify)'},
        {status: 'acquired', value: 'SASS/LESS'},
        {status: 'outstanding', value: 'SQL Queries'},
        {status: 'outstanding', value: 'Frontend Expert'},
        {status: 'outstanding', value: 'React Dynamic Forms'},
        {status: 'outstanding', value: 'O-Auth (Auth-0)'},
        {status: 'outstanding', value: 'Practical Redux'},
        {status: 'acquired', value: 'Dijkstra\'s Algorithm'},
        {status: 'outstanding', value: 'Talking about Big O Notation'},
        {status: 'outstanding', value: 'Pancake Sort, Bubble Sort, Merge Sort, Quick Sort'},
        {status: 'outstanding', value: 'RESTful API'},
        {status: 'outstanding', value: 'React Hooks\n(memo / useMemo,\nrefs / useRef,\nuseEffect)'},
        {status: 'acquired', value: 'TypeScript'},
        {status: 'outstanding', value: 'Tree Recursion'},
        {status: 'outstanding', value: 'Deploy a\nmicroservice app\n(Docker,\nKubernetes, AWS)'}
    ]

    const board = document.getElementById('board');

    function colorToggle() {
        this.classList.toggle('outstanding');
        this.classList.toggle('acquired');
    }

    skills.forEach((skill, i) => {
        const box = document.createElement('div');

        box.innerText = skill.value;
        box.key = i;
        box.onclick = colorToggle;
        box.classList.add('boxes');

        if (skill.status === 'outstanding') {
            box.classList.add('outstanding');
        } else if (skill.status === 'acquired') {
            box.classList.add('acquired');
        }

        board.append(box);
    });

}