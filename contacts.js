const fs = require('fs');
const { readFile: readFileAsync, writeFile: writeFileAsync } = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('db/contacts.json');

function listContacts() {
   return fs.readFile(contactsPath, 'utf8', (error, data) => {
       if (error) {
           return console.error(error.message)
       }

       console.log(data)

   })
}

function getContactById(contactId) {
    return fs.readFile(contactsPath, (error, data) => {
        if (error) {
            return console.error(error.message)
        }

       console.log(JSON.parse(data.toString()).filter(({id}) => id === String(contactId)));
    })
}

async function removeContact(contactId) {
    try {
        const fileData = await readFileAsync(contactsPath, 'utf8');

        const parsedFile = JSON.parse(fileData.toString());
        const data = parsedFile.filter(({id}) => id !== String(contactId));

        await writeFileAsync(contactsPath, JSON.stringify(data), "utf-8");

        const newData = await readFileAsync(contactsPath, 'utf8');
        console.log(JSON.parse(newData));


    } catch (error) {
        console.log(error.message)
    }
}

async function addContact(name, email, phone) {
    try {
        const fileData = await readFileAsync(contactsPath, 'utf8');

        const parsedFile = JSON.parse(fileData.toString());
        const data = [...parsedFile, {id: (Math.random()*100).toFixed(0), name, email, phone}];

        await writeFileAsync(contactsPath, JSON.stringify(data))
    } catch(error) {
        console.log(error.message)
    }

}

module.exports = {
    listContacts, getContactById, removeContact, addContact
}