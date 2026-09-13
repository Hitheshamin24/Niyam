const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const app = require("./app");
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    console.log(`Environment ${process.env.NODE_ENV}`);
  });
};
startServer();