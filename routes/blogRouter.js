import express from "express";
export const router = express.Router();
import { protectRoute, restrict } from "../controllers/authController.js";
import {
  getAllBlogs,
  getBlog,
  getBlogsByUserID,
  createBlog,
  updateBlog,
  deleteBlog,
  authorizeOwner,
} from "../controllers/blogController.js";

// ROUTES
router.route("/").get(getAllBlogs).post(protectRoute, createBlog);
router.route("/me").get(protectRoute, getBlogsByUserID);
router
  .route("/:id")
  .get(getBlog)
  .patch(protectRoute, authorizeOwner, updateBlog)
  .delete(protectRoute, authorizeOwner, deleteBlog);

// router.get("/", getAllBlogs);
// router.get("/:id", getBlog);
// router.use(protectRoute);
// router.post("/", createBlog);
// router.get("/me", getBlogsByUserID);
// router.patch("/:id", authorizeOwner, updateBlog);
// router.delete("/:id", authorizeOwner, deleteBlog);
