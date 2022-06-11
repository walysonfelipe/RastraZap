import fs from 'fs'
import { resolve } from 'path'
import { User } from '../models/userModel'

const MAXIMUM_INACTIVITY_SECONDS = 3600

const databasePath = resolve(__dirname, '..', 'database', 'db.json')



function getDataOnDatabase (): User[] {
    const jsonString = String(
      fs.readFileSync(databasePath)
    )
  
    try {
      const users = JSON.parse(jsonString)
        ? JSON.parse(jsonString)
        : []
  
      if (Array.isArray(users)) {
        return users
      }
    } catch (_) {
      return []
    }
  
    return []
}

function writeDataOnDatabase (users: string) {
    fs.writeFileSync(databasePath, users)
}

function existsOnDatabase (from: string) {
    const users = getDataOnDatabase()
    const user = users.filter(user => user.from === from)[0]

    if (user) {
      const inactivityInSeconds = (Date.now() - user.updated_at) / 1000
  
      if (inactivityInSeconds >= MAXIMUM_INACTIVITY_SECONDS) {
        return null
      }
  
      changeUser(user.from, 'updated_at', Date.now())
    }

    return user
  }

  function saveUserOnDatabase (from: string) {
    const newUser: User = {
      from,
      stage: 0,
      updated_at: Date.now()
    }
  
    const users = getDataOnDatabase()
  
    const newUsers = users.filter(user => user.from !== from)
    newUsers.push(newUser)
  
    const stringifyUsers = JSON.stringify(newUsers)
  
    writeDataOnDatabase(stringifyUsers)
  
 
  
    return newUser
  }

function getFromUser (from: string) {
    const users = getDataOnDatabase()

    const user = users.filter(user => user.from === from)[0]

    return user
  }

function removeUser (from: string) {
    const users = getDataOnDatabase()
  
    const newUsers = users.filter(user => user.from !== from)
  
    const stringifyNewUsers = JSON.stringify(newUsers)
  
    writeDataOnDatabase(stringifyNewUsers)
  }


function changeUser (from: string, field: string, value: any) {
    const users = getDataOnDatabase()
    const newUsers = users.filter(user => user.from !== from)
  
    const currentUser = users.filter(user => user.from === from)[0]
  
    newUsers.push({
      ...currentUser,
      [field]: value
    })
  
    const stringifyNewUsers = JSON.stringify(newUsers)
  
    writeDataOnDatabase(stringifyNewUsers)
}


export {
    existsOnDatabase,
    saveUserOnDatabase,
    getFromUser,
    changeUser,
    removeUser
  } 