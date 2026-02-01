import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

/**
 * Get all contact submissions (admin only)
 */
export const getContacts = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .select("-ipAddress");
    
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit a contact form
 */
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    
    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone: phone || null,
      message,
      ipAddress,
    });
    
    const savedContact = await contact.save();
    
    // Send confirmation email (if SMTP configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await sendConfirmationEmail(email, name);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the request if email fails
      }
    }
    
    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      data: { id: savedContact._id },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark contact as read (admin only)
 */
export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status: "read" },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Contact marked as read",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a contact (admin only)
 */
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findByIdAndDelete(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Helper function to send confirmation email
 */
async function sendConfirmationEmail(recipientEmail, name) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  const mailOptions = {
    from: `"Ankur Sharma" <${process.env.SMTP_USER}>`,
    to: recipientEmail,
    subject: "Message Received - Ankur Sharma",
    html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
      <p>Best regards,<br/>Ankur Sharma</p>
    `,
  };
  
  return transporter.sendMail(mailOptions);
}
