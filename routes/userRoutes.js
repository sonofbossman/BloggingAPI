import express from "express";
export const router = express.Router();
import {
  getMyProfile,
  getAllUsers,
  updatePassword,
  updateProfile,
  deleteProfile,
} from "../controllers/userController.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile operations
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/updatePassword:
 *   patch:
 *     summary: Update current user's password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/updateProfile:
 *   patch:
 *     summary: Update current user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/deleteProfile:
 *   delete:
 *     summary: Delete current user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Profile deleted successfully
 *       401:
 *         description: Unauthorized
 */
import { protectRoute, restrict } from "../controllers/authController.js";

router
  .route("/")
  .get(protectRoute, restrict("admin", "superuser"), getAllUsers);
router.route("/me").get(protectRoute, getMyProfile);
router.route("/updatePassword").patch(protectRoute, updatePassword);
router.route("/updateProfile").patch(protectRoute, updateProfile);
router.route("/deleteProfile").delete(protectRoute, deleteProfile);
