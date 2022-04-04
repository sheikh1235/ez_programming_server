const express = require("express");
const { generateFile } = require("./generateFile");
const { executeFile } = require("./executeFile");
const connection = require("./db");
const authRoutes = require("./routes/auth");
const codeRoutes = require("./routes/code")

const cors = require("cors");

const app = express();
connection();

app.use(cors());
app.options("*", cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.get("/", (req, res) => {});

app.post("/run", async (req, res) => {
  try {
    const filepath = await generateFile(req.body.code);
    const output = await executeFile(filepath, req.body.input);
    return res.json({ output });
  } catch (err) {
    return res.json({ output: err.stack });
  }
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes);

app.listen(5000, () => {
  console.log("server is listening at port 5000");
});
