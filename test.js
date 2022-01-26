const oldSkills = [
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
];

const newSkills = [
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

oldSkills[4] = newSkills[4];

console.log(oldSkills);