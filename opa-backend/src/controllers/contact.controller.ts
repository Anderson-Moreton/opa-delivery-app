import { Request, Response } from "express";
import { sendContactEmail } from "../services/mail.service";

export const sendContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, city, state, message } = req.body;

    await sendContactEmail(name, email, phone, city, state, message);

    res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to send message",
    });
  }
};
