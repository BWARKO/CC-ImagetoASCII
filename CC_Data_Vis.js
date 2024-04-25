let asciiDiv;

function setup() {
  noCanvas();

  // Create a container div for styling and centering
  const containerDiv = createDiv();
  containerDiv.id('container');
  containerDiv.style('display', 'flex');
  containerDiv.style('flex-direction', 'column');
  containerDiv.style('align-items', 'center');
  containerDiv.style('justify-content', 'center');
  containerDiv.style('height', '100vh'); // Use the full height of the viewport

  // Create a div for the file input and position it at the top with 10px space
  const inputDiv = createDiv();
  inputDiv.style('position', 'absolute');
  inputDiv.style('top', '10px');
  inputDiv.style('left', '50%');
  inputDiv.style('transform', 'translateX(-50%)');
  inputDiv.parent(containerDiv);

  // File input for uploading images
  const input = createFileInput(handleFile);
  input.parent(inputDiv);

  // ASCII Art container div
  asciiDiv = createDiv();
  asciiDiv.id('ascii');
  asciiDiv.parent(containerDiv);

  // Styling
  const style = createElement('style');
  style.html(`
    #ascii {
      font-size: 6pt;
      font-family: 'Courier New', monospace;
      line-height: 1;
      white-space: pre;
      margin-top: 20px; // Add space between the input and the ASCII art
    }
    #container {
      text-align: center;
    }
  `);
  style.parent(document.head);
}

function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, img => {
      console.log('Image loaded', img);
      processImage(img);
    });
  } else {
    console.error('Not an image file:', file);
    asciiDiv.html('Please upload an image.');
  }
}

function processImage(img) {
  console.log('Processing image');
  img.loadPixels();
  let asciiImage = '';
  for (let j = 0; j < img.height; j += 10) {
    for (let i = 0; i < img.width; i += 5) {
      const pixelIndex = (i + j * img.width) * 4;
      const r = img.pixels[pixelIndex];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      asciiImage += getAsciiChar(avg);
    }
    asciiImage += '\n';
  }
  asciiDiv.html('<pre>' + asciiImage + '</pre>');
}

function getAsciiChar(brightness) {
  const chars = "@#S%?*+;:,."; // From dark to light
  const scale = brightness / 255;
  const index = Math.floor(scale * (chars.length - 1));
  return chars[index];
}
