const fs = require('fs')
const chalk = require('chalk')

err = chalk.red.bold
success = chalk.green.bold
warr = chalk.yellow.bold

const readNotes = (title) => {
    const notes = loadNotes();
    const getnote = notes.find((note) => {
        return note.title === title
    })
    if(getnote){
        console.log(success("Note Fetched..."))
            console.log(chalk.blue(getnote.body))
        
    } else {
        console.log(warr("No Note found with title: "+title))
    }
}

const addNote = (title, body) => {
        const notes = loadNotes()

        const duplicateTitle = notes.find((note)=> title === note.title)

        if(!duplicateTitle) {
            notes.push({
                title: title,
                body: body
            })
            saveNote(notes)
            console.log(success("Note added successfully!!"))
        } else {
            console.log(warr("Title name already in use!!"))
        }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.magenta.bold("Here are your notes----"))
    notes.forEach((note) => {
        console.log(chalk.blueBright.bold(note.title) +" -> " +chalk.blue(note.body))
    })
}

const saveNote = (notes) => {
    const data = fs.writeFileSync('notes.json',JSON.stringify(notes))
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const user = dataBuffer.toString();
        return JSON.parse(user)
    } catch (e) {
        console.log(err('File NOT Found'))
        return []
    }
}

const removeNotes = (title) =>{
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)
    
    if(notes.length === notesToKeep.length) {
        console.log(warr("Title doesn't exist!!"))
    } else {
        saveNote(notesToKeep)
        console.log(success(title+" removed successfully!!"))
    }
}

module.exports = {
    getNotes: readNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes
} 