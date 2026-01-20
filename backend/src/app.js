import express from "express";
import cors from "cors";
import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

export default app;
