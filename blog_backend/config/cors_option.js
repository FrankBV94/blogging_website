import { allowedOrigins } from "./allowedOrigins.js"

// If the domain is not in "allowedOrigins" it is not allowed by CORS
export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS."));
    }
  },
  optionsSuccessStatus: 200,
};