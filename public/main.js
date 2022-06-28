document.getElementById('updateButton').addEventListener('click', updateEntry)

document.getElementById('deleteButton').addEventListener('click', deleteEntry)

async function updateEntry(){
    try{
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                character: document.getElementsByName('character')[0].value,
                actor: document.getElementsByName('actor')[0].value,
                significantOther: document.getElementsByName('significantOther')[0].value,
                currentStory: document.getElementsByName('currentStory')[0].value
            })
        })
            const data = await response.json()
            console.log(data)
            location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function deleteEntry(){
    const input = document.getElementById('deleteInput')
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                character: input.value
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}