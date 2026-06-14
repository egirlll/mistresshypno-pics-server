const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for the autodrainer extension
app.use(cors());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Get list of all images
app.get('/api/images', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  
  if (!fs.existsSync(uploadsDir)) {
    return res.json([]);
  }

  const files = fs.readdirSync(uploadsDir).filter(file => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
  });

  res.json(files);
});

// Get random image
app.get('/api/random-image', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  
  if (!fs.existsSync(uploadsDir)) {
    return res.status(404).json({ error: 'No images available' });
  }

  const files = fs.readdirSync(uploadsDir).filter(file => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
  });

  if (files.length === 0) {
    return res.status(404).json({ error: 'No images available' });
  }

  const randomFile = files[Math.floor(Math.random() * files.length)];
  const imageUrl = `/uploads/${randomFile}`;

  res.json({ url: imageUrl, filename: randomFile });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mistresshypno-pics' });
});

app.listen(PORT, () => {
  console.log(`MistressHypno Pics Server running on port ${PORT}`);
});
