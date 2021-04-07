import fs from 'fs'
import { resolve } from 'path'

// 900 -> 15 minutos
// 1800 -> 30 minutos
// 3600 -> 60 minutos
// 7200 -> 120 minutos
const MAXIMUM_INACTIVITY_SECONDS = 3600

const databasePath = resolve(__dirname, 'users.json')

export interface User {
  from: string
  stage: number
  updated_at: number
}

function getUsersOnDatabase (): User[] {
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

function writeUsersOnDatabase (users: string) {
  fs.writeFileSync(databasePath, users)
}

function existsOnDatabase (from: string) {
  const users = getUsersOnDatabase()
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

  const users = getUsersOnDatabase()

  const newUsers = users.filter(user => user.from !== from)
  newUsers.push(newUser)

  const stringifyUsers = JSON.stringify(newUsers)

  writeUsersOnDatabase(stringifyUsers)

  console.log(stringifyUsers)

  return newUser
}

function getFromUser (from: string, field: string) {
  const users = getUsersOnDatabase()
  const user = users.filter(user => user.from === from)[0]
  return user[field]
}

function changeUser (from: string, field: string, value: any) {
  const users = getUsersOnDatabase()

  const newUsers = users.filter(user => user.from !== from)

  const currentUser = users.filter(user => user.from === from)[0]

  newUsers.push({
    ...currentUser,
    [field]: value
  })

  const stringifyNewUsers = JSON.stringify(newUsers)

  writeUsersOnDatabase(stringifyNewUsers)
}

function removeUser (from: string) {
  const users = getUsersOnDatabase()

  const newUsers = users.filter(user => user.from !== from)

  const stringifyNewUsers = JSON.stringify(newUsers)

  writeUsersOnDatabase(stringifyNewUsers)
}

export {
  existsOnDatabase,
  saveUserOnDatabase,
  getFromUser,
  changeUser,
  removeUser
}
