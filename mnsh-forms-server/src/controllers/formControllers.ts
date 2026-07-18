import { Request, Response } from "express";
import pool from "../config/db";

export const createForm = async (req: Request, res: Response) => {
  const { userId } = req.user.user.id;
  const { formTitle, description, questions } = req.body;

  try {
    await pool.query("BEGIN");

    const form = await pool.query(
      `INSERT INTO form(form_title, form_description, user_id) VALUES ($1, $2, $3) RETURNING *`,
      [formTitle, description, userId],
    );

    for (const question of questions) {
      await pool.query(
        `INSERT INTO questions(question_title, question_description, question_type, form_id) VALUES($1, $2, $3, $4) RETURNING *`,
        [question.title, question.description, question.type, form.rows[0].id],
      );
      
    }
    console.log(form.rows[0]);

    await pool.query("COMMIT");
    return res.status(200).json({message: "From Created Successfully"})
  } catch (error) {
    await pool.query("ROLLBACK")
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
