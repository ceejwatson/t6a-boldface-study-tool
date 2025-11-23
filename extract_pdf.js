const fs = require('fs');

// Try using pdf-parse if available
try {
  const pdfParse = require('pdf-parse');
  const dataBuffer = fs.readFileSync('T6_AP_SG_Mar21.pdf');
  
  pdfParse(dataBuffer).then(function(data) {
    console.log(data.text.substring(0, 5000));
  });
} catch (e) {
  console.log("pdf-parse not available, need to install it");
  console.log("Error:", e.message);
}
