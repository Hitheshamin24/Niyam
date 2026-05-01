const connectDB = require("./config/db");
const dotenv = require("dotenv");
const app = require("./app");
// load env variable
dotenv.config();
// connect to MongoDB
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    console.log(`Environment ${process.env.NODE_ENV}`);
  });
};
startServer();
