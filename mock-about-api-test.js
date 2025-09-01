const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock About data storage
let aboutData = null;

// Mock About API endpoints
app.get('/api/about', (req, res) => {
  console.log('GET /api/about called');
  if (aboutData) {
    res.json({
      success: true,
      data: aboutData
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'No About data found'
    });
  }
});

app.post('/api/about', (req, res) => {
  console.log('POST /api/about called with data:', JSON.stringify(req.body, null, 2));
  
  // Simulate data validation
  if (!req.body.hero_title) {
    return res.status(400).json({
      success: false,
      message: 'Hero title is required'
    });
  }
  
  // Store the data
  aboutData = {
    id: 1,
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  console.log('About data saved successfully');
  
  res.status(201).json({
    success: true,
    message: 'About data created successfully',
    data: aboutData
  });
});

app.put('/api/about/:id', (req, res) => {
  console.log(`PUT /api/about/${req.params.id} called with data:`, JSON.stringify(req.body, null, 2));
  
  if (!aboutData) {
    return res.status(404).json({
      success: false,
      message: 'About data not found'
    });
  }
  
  // Update the data
  aboutData = {
    ...aboutData,
    ...req.body,
    updated_at: new Date().toISOString()
  };
  
  console.log('About data updated successfully');
  
  res.json({
    success: true,
    message: 'About data updated successfully',
    data: aboutData
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Mock About API server running on http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log('  GET  /api/about');
  console.log('  POST /api/about'); 
  console.log('  PUT  /api/about/:id');
  console.log('\n💡 To test the About POST functionality:');
  console.log('1. Update API URL in your frontend to http://localhost:3001');
  console.log('2. Try submitting the About form');
  console.log('3. Check this console for request details');
});