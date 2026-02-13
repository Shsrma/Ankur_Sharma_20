import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

/**
 * Get top/recent contact submissions for public display
 */
export const getTopMessages = async (req, res, next) => {
  try {
    const { limit = 5 } = req.query;
    
    // Get recent messages, exclude sensitive information
    const messages = await Contact.find({ status: { $in: ['new', 'read'] } })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('-ipAddress -phone')
      .lean();

    // Format messages for public display
    const formattedMessages = messages.map(msg => ({
      id: msg._id,
      name: msg.name,
      message: msg.message.length > 150 
        ? msg.message.substring(0, 150) + '...' 
        : msg.message,
      createdAt: msg.createdAt,
      status: msg.status
    }));

    return res.status(200).json({
      success: true,
      count: formattedMessages.length,
      data: formattedMessages,
    });
  } catch (error) {
    next(error);
  }
};

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
    console.log("[Email Debug] SMTP Configured:", !!(process.env.SMTP_USER && process.env.SMTP_PASS));
    if (process.env.SMTP_USER) { // Log user for verification (careful not to log pass)
      console.log("[Email Debug] SMTP User:", process.env.SMTP_USER);
    }

    // Extract recipient from request body (pushed there by frontend)
    const { recipient } = req.body;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await Promise.all([
          sendConfirmationEmail(email, name),
          sendAdminNotificationEmail(savedContact, recipient)
        ]);
      } catch (emailError) {
        console.error("Failed to send emails:", emailError);
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

  console.log(`[Email Debug] Attempting to send confirmation to: ${recipientEmail}`);
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Debug] Confirmation email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[Email Debug] Failed to send confirmation email:`, error);
    throw error;
  }
}

/**
 * Helper function to send notification email to admin
 */
async function sendAdminNotificationEmail(contact, recipientType) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Determine admin email based on user selection
  let adminEmail;
  if (recipientType === 'outlook') {
    adminEmail = "ankurbpradhan@outlook.com";
  } else if (recipientType === 'gmail') {
    adminEmail = "ankurbpradhan@gmail.com";
  } else {
    // Default or 'both' -> Send to both
    adminEmail = "ankurbpradhan@gmail.com, ankurbpradhan@outlook.com";
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Message from ${contact.name} (${recipientType || 'general'})`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Topic/Recipient:</strong> ${recipientType === 'outlook' ? 'Business/Outlook' : 'General/Gmail'}</p>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ddd;">
        ${contact.message}
      </blockquote>
      <p><em>This message was sent from your portfolio website.</em></p>
    `,
  };

  console.log(`[Email Debug] Attempting to send admin notification to: ${adminEmail}`);
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Debug] Admin notification sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[Email Debug] Failed to send admin notification:`, error);
    throw error;
  }
}
