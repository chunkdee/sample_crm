import fs from 'fs';
import path from 'path';
import { generateSampleData }  from '../datagenerator/generatesampleData';

const generateJsonFile = () => {
  // Generate sample data with desired counts
  const sampleData = generateSampleData(
    10,  // companies
    20,  // contacts
    30,  // deals
    15,  // customers
    5,   // products
    20,  // quotes
    15,  // orders
    10,  // invoices
    5    // payments
  );

  // Convert to formatted JSON
  const jsonData = JSON.stringify(sampleData, null, 2);

  // Define output path
  const outputPath = path.join(__dirname, '..', 'data', 'db.json');

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write to file
  fs.writeFileSync(outputPath, jsonData);
  console.log(`Sample data written to ${outputPath}`);
};

// Run generator
generateJsonFile();