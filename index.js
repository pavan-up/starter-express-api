const express = require('express');
const cors = require('cors');
const Jimp = require('jimp');
const { Readable } = require('stream');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  location: 'San Francisco',
  change: '$5.50',
  time: '3:30AM',
};

let stream;
app.get('/get_text_image', async (req, res) => {
  

  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  stream.pipe(res);
});

app.post('/set_variables', async (req, res) => {
  
  config.location = req.body.location;
  config.change = req.body.change;
  config.time = req.body.time;

  const text = `Location: ${config.location}\nChange: ${config.change}\nTime: ${config.time}`;

  const img = await new Jimp(1000, 200, 0xFFFFFFFF);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  img.print(font, 10, 40, text);

  const buffer = await img.getBufferAsync(Jimp.MIME_JPEG);

  stream = Readable.from(buffer);

  res.send('String variables updated successfully.');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
