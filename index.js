import express from "express";
import { marked } from "marked";

const app = express();
app.use(express.json());

app.post("/functions/markdownToHTML", async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).send({ error: "Input is required" });
  }

  try {
    const output = marked(input);
    res.send({ output });
  } catch (error) {
    res.status(500).send({ error: "Failed to convert Markdown to HTML" });
  }
});

app.get("/functions/markdownToHTML", (req, res) => {
  const docs = {
    name: "markdownToHTML",
    description: "Convert Markdown text to HTML",
    input: {
      type: "string",
      description: "Input the Markdown text you'd like to convert",
      example: "# Hello, world\n\nThis is a paragraph in Markdown.",
    },
    output: {
      type: "string",
      description: "HTML representation of the Markdown input",
      example: "<h1>Hello, world</h1><p>This is a paragraph in Markdown.</p>",
    },
  };

  res.json(docs);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
