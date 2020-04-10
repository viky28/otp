const express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/getOtp", (req, res) => {
  if (!req.body.mobileNumber) {
    res.send(JSON.stringify({ status: 404, messgae: "Missing body!" }));
  } else {
    let otp = generateOTP();
    res.send(JSON.stringify({ status: 200, otp: otp }));
  }
});

function generateOTP() {
  var digits = "0123456789";

  var otpLength = 4;

  var otp = "";

  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length);

    otp = otp + digits[index];
  }

  return otp;
}

app.listen(3000, () => {
  console.log("server is listening on 3000");
});
