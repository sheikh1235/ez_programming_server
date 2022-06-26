const express = require("express");
const { generateFile } = require("./generateFile");
const { generateDebugFile } = require("./generateDebugFile");
const { executeFile } = require("./executeFile");
const { debugFile, next, end, nextLine } = require("./debugFile");
const connection = require("./db");
const authRoutes = require("./routes/auth");
const codeRoutes = require("./routes/code");

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

app.post("/debug", async (req, res) => {
  try {
    const filepath = await generateFile(req.body.code);
    const debugFilePath = await generateDebugFile(filepath);
    // initialization of the debugger.
    let breakpoint = "main"
    if(req.body.breakpoint > 0){
      breakpoint = req.body.breakpoint;
    }
    await debugFile(debugFilePath, breakpoint);
    const output = await next("info locals");
    return res.json({ output });
  } catch (err) {
    return res.json({ output: err.stack });
  }
});
// to move debugger to next line or function
app.get("/next", async (req, res) => {
  try {
    const nextLine = await next("next");
    const infoLocals = await next("info locals");
    
    return res.json({ nextLine: nextLine, infoLocals: infoLocals});
  } catch (err) {
    return res.json({ });
  }
});

// to move debugger to next line or function
app.get("/end", async (req, res) => {
  try {
    const output = await end();
    return res.json({ output });
  } catch (err) {
    return res.json({ output: err.stack });
  }
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes);

//-------------------------------------------------------------

app.post("/add-user", async(req, resp) => {
  let product = new User(req.body);
  let result = await product.save();
  console.log("add succes");
  resp.send(result);
});

app.get("/users", async(req, resp) => {
  const products = await User.find();
  if (products.length > 0) {
      resp.send(products);
  } else {
      resp.send({ result: "No User found" });
  }
});

app.delete("/product/:id", async(req, resp) => {
      let result = await User.deleteOne({ _id: req.params.id });
      resp.send(result);
  }),
  app.get("/product/:id", async(req, resp) => {
      let result = await User.findOne({ _id: req.params.id });
      if (result) {
          resp.send(result);
      } else {
          resp.send({ result: "No Record Found." });
      }
  });

app.put("/product/:id", async(req, resp) => {
  let result = await User.updateOne({ _id: req.params.id }, { $set: req.body });
  resp.send(result);
});

app.put("/product/:id", async(req, resp) => {
  let result = await User.updateOne({ _id: req.params.id }, { $set: req.body });
  resp.send(result);
});

app.get("/search/:key", async(req, resp) => {
  let result = await User.find({
      $or: [{
              firstName: { $regex: req.params.key, $options: "i" },
          },

          {
              lastName: { $regex: req.params.key, $options: "i" },
          },

          {
              email: { $regex: req.params.key, $options: "i" },
          },
      ],
  });
  resp.send(result);
});
//-------------------------------------------------------------


app.listen(5000, () => {
  console.log("server is listening at port 5000");
});
