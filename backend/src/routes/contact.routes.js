import express from "express";
import {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contact.controller.js";
import { validateContactForm, handleValidationErrors } from "../middleware/validation.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public route - submit contact form (with rate limiting)
router.post("/", contactLimiter, validateContactForm, handleValidationErrors, submitContact);

// Protected routes (would need auth middleware in production)
router.get("/", getContacts); // Admin only
router.patch("/:id/read", markAsRead); // Admin only
router.delete("/:id", deleteContact); // Admin only

export default router;
