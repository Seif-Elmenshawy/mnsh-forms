import { Request, Response } from "express";
import pool from "../config/db";

export const createForm = async (req: Request, res: Response) => {
  const userId = req.user?.user.id

  try {
    const form = await pool.query("INSERT INTO forms(user_id) VALUES($1) RETURNING *", [userId])
    const updatedStats = await pool.query("UPDATE stats SET forms_created = forms_created + 1 WHERE user_id = $1", [userId])
    console.log(form.rows[0])
    return res.status(201).json({message: "Form Created", data: form.rows[0]})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
  }
}

export const editForm = async (req: Request, res: Response) => {
  const userId = req.user?.user.id;
  const { formTitle, isPublished, isPrivate, questions } = req.body;
  const formId = req.params.id
  
  const client = await pool.connect()

  try {
    await client.query("BEGIN");

    const form = await client.query(
      `UPDATE forms SET formTitle = $1, is_published = $2, is_private = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4`,
      [formTitle, isPublished, isPrivate, formId],
    );

    for (const [questionIndex, question] of questions.entries()) {
      const createdQuestion = await client.query(
        `INSERT INTO questions(question_title, question_description, question_type, question_order, is_required, form_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [question.title, question.description, question.type, questionIndex, question.isRequired, form.rows[0].id],
      );

      for (const [choiceIndex, choice] of (question.choices ?? []).entries()) {
        await client.query(
          `INSERT INTO choices(choice_title, choice_order, question_id) VALUES($1, $2, $3) RETURNING *`,
          [choice.title, choiceIndex, createdQuestion.rows[0].id],
        );
      }
    }
    console.log(form.rows[0]);

    await client.query("COMMIT");
    return res.status(200).json({ message: "From Created Successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchForms = async (req: Request, res: Response) => {
  const userId = req.user?.user.id
  
  try {
    const forms = await pool.query(`SELECT * FROM forms WHERE user_id = $1`, [userId])
    return res.status(200).json({message: "Forms Fetched Successfully", data: forms.rows})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
}