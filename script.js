const fileInput = document.getElementById('fileInput');
const nameInput = document.getElementById('nameInput');
const fontSizeInput = document.getElementById('fontSizeInput');
const fontFamilyInput = document.getElementById('fontFamilyInput');
const xPosInput = document.getElementById('xPosInput');
const yPosInput = document.getElementById('yPosInput');
const generatePdfBtn = document.getElementById('generatePdfBtn');
const canvas = document.getElementById('certificateCanvas');
const ctx = canvas.getContext('2d');

let backgroundImage = null;

fileInput.addEventListener('change', handleImageUpload);
nameInput.addEventListener('input', drawCertificate);
fontSizeInput.addEventListener('input', drawCertificate);
fontFamilyInput.addEventListener('change', drawCertificate);
xPosInput.addEventListener('input', drawCertificate);
yPosInput.addEventListener('input', drawCertificate);
generatePdfBtn.addEventListener('click', generatePdf);

function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      backgroundImage = img;
      drawCertificate();
    }
    img.src = e.target.result;
  }

  reader.readAsDataURL(file);
}

function drawCertificate() {
  if (!backgroundImage) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  const fontSize = fontSizeInput.value;
  const fontFamily = fontFamilyInput.value;
  const name = nameInput.value;
  const xPos = (canvas.width * xPosInput.value) / 100;
  const yPos = (canvas.height * yPosInput.value) / 100;

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(name, xPos, yPos);
}

function generatePdf() {
  const pdf = new jsPDF('landscape', 'px', [canvas.width, canvas.height]);
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('certificado.pdf');
}
