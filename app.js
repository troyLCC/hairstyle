/* ==============================================
 Old images
==================================================*/
//https://i.imgur.com/MdVeYvj.jpg
/* https://i.imgur.com/aumWMke.jpg face*/
//https://i.imgur.com/46phoN2.jpg non-face
//https://i.imgur.com/wHyei23.jpg cover face
//https://i.imgur.com/SZIvJ8c.jpg far face
/* ==============================================
 New Images
 ================================================*/
//https://i.imgur.com/UaGBY7d.jpg two faces
//https://i.imgur.com/3VEiviR.jpg once face
//https://i.imgur.com/fLh2PHp.jpg far face
//https://i.imgur.com/eCQLWzI.jpg good face
const link = "https://i.imgur.com/UaGBY7d.jpg";
var data = `urls=${link}`;
const output = document.getElementById("output");

document.getElementById("img1").src = link;

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    const responseArry = JSON.parse(this.responseText);
    const responPrediction = responseArry.result[0].prediction;
    console.log(responseArry);
    console.log(responPrediction);
    const verticalDifference =
      responPrediction[0].xmax - responPrediction[0].xmin;

    //response that have only one face and score >= .9
    if (
      responPrediction.length === 1 &&
      responPrediction[0].score >= 0.9 &&
      Number(verticalDifference) > 100
    ) {
      const score = responPrediction[0].score;

      output.innerHTML = `This is a good image. <br>
       										Score: ${score} <br>
                          Size: ${verticalDifference} px`;
    } else {
      output.innerHTML = `This is a bad image`;
      console.log("this is else");
      /* 	bad.innerHTML = `This is a bad image`; */
    }
  }
});

xhr.open(
  "POST",
  "https://app.nanonets.com/api/v2/ObjectDetection/Model/ade1aebf-d188-4582-947c-614fd5f97aa0/LabelUrls/"
);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader(
  "authorization",
  "Basic " + btoa("9rZ3FETSEczI3S0wPzVc-OvJ0BdrzRvT:")
);

xhr.send(data);
