import app from "./app.js";
import dotenv from "dotenv";
import "./db/mongoose.js";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
