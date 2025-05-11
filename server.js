import express from 'express'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

const VERIFICATION_CODES = {}

const __dirname = path.resolve();  
const app = express()
const upload = multer({ dest: 'uploads/' })

app.use(cors())

const saveToJsonFile = (filePath, data) => {
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    let jsonData = {}

    if (err && err.code !== 'ENOENT') {
      console.error('Error reading the file:', err)
      return
    }

    if (fileData) {
      jsonData = JSON.parse(fileData)
    }

    // Combine the new data into the existing data
    if (data.personalInfo) {
      jsonData.personalInfo = data.personalInfo
    }
    if (data.businessDetails) {
      jsonData.businessDetails = data.businessDetails
    }

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to the file:', err)
      } else {
        console.log('Data saved to JSON file.')
      }
    })
  })
}

// Endpoint for handling personal info
app.post('/api/personal-info', upload.single('profileImage'), (req, res) => {
  const { name, email, phone } = req.body
  const image = req.file

  const personalInfo = {
    name,
    email,
    phone,
    image: image ? image.path : null,
  }

  console.log('Received Personal Info:', personalInfo)

  // Save to the same JSON file
  saveToJsonFile(path.join(__dirname, 'data', 'combined-data.json'), { personalInfo })

  res.status(200).json({ message: 'Personal info submitted successfully' })
})

// Endpoint for handling business details
app.post('/api/business-details', upload.fields([{ name: 'logo' }, { name: 'document' }]), (req, res) => {
  const { name, industry, size } = req.body
  const logo = req.files['logo'] ? req.files['logo'][0] : null
  const document = req.files['document'] ? req.files['document'][0] : null

  const businessDetails = {
    name,
    industry,
    size,
    logo: logo ? logo.path : null,
    document: document ? document.path : null,
  }

  console.log('Received Business Details:', businessDetails)
  if (logo) console.log('Logo uploaded:', logo.path)
  if (document) console.log('Document uploaded:', document.path)

  // Save to the same JSON file
  saveToJsonFile(path.join(__dirname, 'data', 'combined-data.json'), { businessDetails })

  res.status(200).json({ message: 'Business details submitted successfully' })
})

// Endpoint to get the combined data (personal info + business details)
app.get('/api/get-details', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'combined-data.json');
    
    fs.readFile(filePath, 'utf8', (err, fileData) => {
      if (err) {
        console.error('Error reading the file:', err);
        return res.status(500).json({ message: 'Error reading data' });
      }
  
      const jsonData = fileData ? JSON.parse(fileData) : {};
      res.status(200).json(jsonData);
    });
  });
  app.post('/api/send-verification', express.json(), async (req, res) => {
    const { email } = req.body
  
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    VERIFICATION_CODES[email] = code
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'workerclass7447@gmail.com',         // Replace with your Gmail
        pass: 'pbyr ehnd bebm hwrf',       // Use Gmail App Password (NOT your Gmail password)
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: true,
    })
  
    const mailOptions = {
      from: '"My App" <workerclass7447@gmail.com>',
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`
    }
  
    try {
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: 'Verification code sent!' })
    } catch (error) {
      console.error('Email send failed:', error)
      res.status(500).json({ message: 'Failed to send email' })
    }
  })
  
  app.post('/api/verify-code', express.json(), (req, res) => {
    const { email, code } = req.body
    if (VERIFICATION_CODES[email] === code) {
      delete VERIFICATION_CODES[email]
      res.status(200).json({ message: 'Verification successful!' })
    } else {
      res.status(400).json({ message: 'Invalid verification code.' })
    }
  })
  
app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
