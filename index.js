const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000/" || "https://chatgptv2-9d9a1.web.app/",
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/message", async (req, res) => {
  try {
    const message = req.body.message;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });
    res.status(200).send({
      message: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

/*
model: "text-davinci-003",
      prompt: `${message}`,
      temperature: 1,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,

*/
