# interview-skills-grid
Use this app to track and prioritize the topics you need to study during your job search.


TODO:

- connect to MongoDB
- boxes display green based on acquired property
- entry form to select a box and enter innerText / acquired status

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
