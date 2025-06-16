/**
 * Blog Router
 * Handles all blog-related routes.
 *
 * @module routes/blogRouter
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all published blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of all published blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogInput'
 *           example:
 *             title: "My First Blog"
 *             description: "This is a blog regarding my first blog."
 *             body: "This is the content of my first blog."
 *             tags: ["javascript", "nodejs"]
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /blogs/me:
 *   get:
 *     summary: Get blogs created by the authenticated user
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of blogs by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: Blog found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogInput'
 *           example:
 *             title: "Updated Blog Title"
 *             content: "Updated content."
 *             tags: ["update"]
 *             published: false
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * tags:
 *   - name: Blogs
 *     description: Endpoints related to blog operations
 *   - name: Users
 *     description: Endpoints related to user authentication and profile
 */

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
