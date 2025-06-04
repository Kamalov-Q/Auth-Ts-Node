import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authentification and Authorization API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local Server",
      },
      {
        url: "https://auth-ts-node.onrender.com/",
        description: "Production Server",
      },
    ],
  },
  apis: ["./src/utils/swagger.ts"], // paths to files with annotations
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
