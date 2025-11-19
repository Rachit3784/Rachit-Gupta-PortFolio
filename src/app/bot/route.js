import { NextResponse } from 'next/server';
import dbConnect from '@/utils/mongodb';
import Contact from '@/models/Message';
import nodemailer from 'nodemailer';



export async function POST(request) {
  try {
    const body = await request.json();
    const { message } = body;

    // Validate required fields
    if (!message) {
      return NextResponse.json(
        { error: 'Some Imformation is required ' },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if a contact with this email already exists

    await Model.deleteMany({});

    console.log(message)
      // If contact doesn't exist, create a new one
    //   BotContents = new BotContent({
    //     content : message
    //   });
    

    // // Save the contact
    // await BotContents.save();

    // Optional: Send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
          subject: `New Contact Form Message from ${name}`,
          text: `
            Your Content Updated
            Message: ${message}
          `,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> Rachit Boss</p>
            <p><strong>Email:</strong> grachit736@gmail.com</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // We don't return an error response here as the message was still saved
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("I am called")
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}