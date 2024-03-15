const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.command({
    command: 'add',
    describe: 'it will add nodes',
    builder: {
        title: {
            describe: 'Notes title',
            demandOption: true,
            string: true,
        },
        body :{
            describe: 'Notes Body',
            demandOption: true,
            string: true,
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    description: 'it will remove nodes',

    builder: {
        title:{
            describe: 'Title to be deleted',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => {
        notes.removeNotes(argv.title)
    }
})
yargs.command({
    command: 'read',
    description: 'it will list nodes',
    builder:{
        title:{
            describe: 'list title',
            demandOption : true,
            string : true,
        }
    },

    handler: (argv) => {
        notes.getNotes(argv.title)
    }
})

yargs.command({
    command: 'listnotes',
    describe: "It will provide list of all notes available",
    
    handler: (argv) => {
        notes.listNotes()
    }
})
yargs.parse()
// console.log(yargs.argv)