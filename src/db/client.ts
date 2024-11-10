import { createClient } from "@libsql/client";
import { type Votes } from "@/types/votes"

const turso = createClient({
  url: import.meta.env.TURSO_DATABASE_URL ?? "",
  authToken: import.meta.env.TURSO_AUTH_TOKEN ?? "",
});

export const addUserVotes = async (username: string, votes: Votes) => {
  const sql = `INSERT INTO votes (username, category_id, option_id, rank) VALUES (?, ?, ?, ?)`

  const inserts = votes.flatMap((categoryVotes, index) => {
    const categoryId = (index + 1).toString()
    return categoryVotes.map((vote, index) => {
      const rank = index + 1
      return {
        sql,
        args: [username, categoryId, vote, rank],
      }
    })
  })

  const result = await turso.batch(inserts, "write")
  return result
}
export const cleanUserVotes = async (username: string) => {
  const result =await turso.execute({
    sql: `DELETE FROM votes WHERE username = ?`,
    args: [username],
  })
  return result
}