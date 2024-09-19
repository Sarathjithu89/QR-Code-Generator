import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

inquirer
  .prompt([
    {
      message: "Enter Your Url : ", //url question
      name: "theUrl", // the url saved name
    },
  ])
  .then((answers) => {
    var qr_svg = qr.image(answers.theUrl, { type: "png" }); //the image name
    qr_svg.pipe(
      fs.createWriteStream(
        `./QR-images/QR-Image ${new Date().getDate().toLocaleString()}.png`
      )
    ); //the name to save the file
    let date = new Date().getDate().toLocaleString();
    let url = answers.theUrl + date;
    fs.appendFile("URLs.txt", url"\n", (err) => {
      if (err) throw err;
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
