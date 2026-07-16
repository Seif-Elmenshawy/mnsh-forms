import { Pool } from "pg"


const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "13245",
  database: "mnsh_forms",
  port: 5432,
})

export default pool
