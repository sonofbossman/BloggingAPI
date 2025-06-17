import swaggerJSDoc from "swagger-jsdoc";
// config/swaggerOptions.js
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blogging API",
      version: "1.0.0",
      description: "API for managing blogs and users",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
      {
        url: "https://bloggingapi-254i.onrender.com/api/v1", // deployed URL
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Blog: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            body: { type: "string" },
            author: {
              type: "object",
              properties: {
                _id: { type: "string" },
                firstName: { type: "string" },
                lastName: { type: "string" },
              },
            },
            state: {
              type: "string",
              enum: ["draft", "published"],
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            read_count: {
              type: "integer",
              example: 0,
            },
            reading_time: {
              type: "string",
              readOnly: true,
              description: "Estimated reading time, calculated by the server",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
            role: { type: "string", enum: ["user", "admin"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
