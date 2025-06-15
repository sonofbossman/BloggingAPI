import { Blog } from "../models/blogModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import { createCustomError } from "../utils/custom-error.js";

// const highestRated = (req, res, next) => {
//   req.sort = "-ratings";
//   req.limit = "5";
//   next();
// };

export const authorizeOwner = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return next(
        createCustomError(
          `Blog with ID: '${req.params.id}' not found!`,
          404,
          "fail"
        )
      );
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return next(
        createCustomError(
          "You do not have permission to perform this action!",
          403,
          "fail"
        )
      );
    }

    req.blog = blog;
    next();
  } catch (err) {
    return next(createCustomError(err, 404, "fail"));
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    req.query.state = "published";
    const features = new APIFeatures(
      Blog.find(),
      req.query,
      req.sort,
      req.limit
    )
      .filter()
      .sort()
      .limit()
      .paginate();
    const blogs = await features.query;
    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    return next(createCustomError(err, 500));
  }
};

export const getBlogsByUserID = async (req, res, next) => {
  try {
    const features = new APIFeatures(
      Blog.find({ author: req.user._id }),
      req.query,
      req.sort,
      req.limit
    )
      .filter()
      .sort()
      .limit()
      .paginate();
    const blogs = await features.query;
    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    return next(createCustomError(err, 500));
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "firstName lastName email"
    );
    if (!blog) {
      return next(
        createCustomError(
          `Blog with ID: '${req.params.id}' not found or not published!`,
          404,
          "fail"
        )
      );
    }
    // // If the blog is in draft state and the requester is not the owner
    if (
      blog.state == "draft" &&
      (!req.user || blog.author.toString() !== req.user._id.toString())
    ) {
      return next(createCustomError("Access Denied!", 403, "fail"));
    }
    if (blog.state == "published") {
      // Increment read_count only if blog is published
      blog.read_count += 1;
      await blog.save();
    }
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    return next(createCustomError(err, 404, "fail"));
  }
};

export const createBlog = async (req, res, next) => {
  try {
    let blogs = req.body;
    if (!Array.isArray(blogs)) {
      blogs = [blogs];
    }
    const blog = await Blog.create(
      blogs.map((blog) => ({ ...blog, author: req.user._id }))
    );
    res.status(201).json({
      status: "success",
      results: blog.length,
      data: {
        blog,
      },
    });
  } catch (err) {
    return next(createCustomError(err.message, 400));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = req.blog;
    Object.assign(blog, req.body);
    await blog.save();
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    return next(createCustomError(err, 400, "fail"));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    await req.blog.deleteOne();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return next(createCustomError(err, 404, "fail"));
  }
};
