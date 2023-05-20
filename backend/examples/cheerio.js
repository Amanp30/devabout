const cheerio = require("cheerio");
const request = require("request");
const express = require("express");

const app = express();

app.get("/languages", (req, res) => {
  //cheerio
  request(
    "https://compile.blog/programming-languages-list/",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        // Select the rows in the table
        const rows = $("table tr");

        // Create an empty array to store the programming language names
        const languageNames = [];

        // Iterate over the rows and extract the second column (the programming language name)
        rows.each((i, element) => {
          const languageName = $(element).find("td:nth-child(2)").text();
          languageNames.push(languageName);
        });

        console.log(languageNames);
        res.json(languageNames);
      }
    }
  );
});
