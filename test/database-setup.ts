import { connect, Connection } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

export const inMemoryDBConnect = async () => {
  const inMemoryDB = await MongoMemoryServer.create()
  const uri = inMemoryDB.getUri()

  const db = await connect(uri)

  return { connection: db.connection, instance: inMemoryDB, uri }
}

export const inMemoryDBDisconnect = async (
  connection: Connection,
  instance: MongoMemoryServer,
) => {
  await connection.dropDatabase()
  await connection.close()
  await instance.stop()
}
