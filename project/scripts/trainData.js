import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import natural from 'natural';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize TF-IDF
const tfidf = new natural.TfIdf();

// Function to read and parse CSV files
async function readCSV(filePath) {
  const records = [];
  const parser = createReadStream(filePath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    })
  );

  for await (const record of parser) {
    records.push(record);
  }

  return records;
}

// Function to create component description
function createComponentDescription(component, type) {
  if (type === 'cpu') {
    return `${component.brand} ${component.model} CPU with ${component.cores} cores ${component.threads} threads ${component.base_clock}GHz base ${component.boost_clock}GHz boost ${component.tdp}W TDP`;
  } else {
    return `${component.brand} ${component.model} GPU with ${component.memory}GB ${component.memory_type} ${component.base_clock}MHz base ${component.boost_clock}MHz boost ${component.tdp}W TDP`;
  }
}

// Main function to train the data
async function trainData() {
  try {
    console.log('Starting data training process...');

    // Load component data
    const cpus = await readCSV(join(__dirname, '..', 'src', 'data', 'components', 'cpus.csv'));
    const gpus = await readCSV(join(__dirname, '..', 'src', 'data', 'components', 'gpus.csv'));

    // Create documents for TF-IDF
    console.log('\nCreating component embeddings...');
    
    cpus.forEach(cpu => {
      const doc = createComponentDescription(cpu, 'cpu');
      tfidf.addDocument(doc);
    });

    gpus.forEach(gpu => {
      const doc = createComponentDescription(gpu, 'gpu');
      tfidf.addDocument(doc);
    });

    // Test the recommendation system
    console.log('\nTesting recommendations...');
    
    const testCases = [
      { useCase: 'gaming', budget: 1000, suggestion: 'Need high FPS for competitive gaming' },
      { useCase: 'productivity', budget: 1500, suggestion: 'Video editing and 3D rendering' },
      { useCase: 'development', budget: 2000, suggestion: 'Software development with multiple VMs' }
    ];

    testCases.forEach(test => {
      console.log(`\nUse Case: ${test.useCase}, Budget: $${test.budget}`);
      console.log('Suggestion:', test.suggestion);
      
      // Simulate recommendations
      const cpuWeight = test.useCase === 'gaming' ? 0.3 : 0.6;
      const gpuWeight = 1 - cpuWeight;
      
      const cpuBudget = test.budget * cpuWeight;
      const gpuBudget = test.budget * gpuWeight;
      
      const eligibleCPUs = cpus.filter(cpu => parseFloat(cpu.price) <= cpuBudget);
      const eligibleGPUs = gpus.filter(gpu => parseFloat(gpu.price) <= gpuBudget);
      
      if (eligibleCPUs.length > 0 && eligibleGPUs.length > 0) {
        const recommendedCPU = eligibleCPUs[0];
        const recommendedGPU = eligibleGPUs[0];
        
        console.log('Recommended CPU:', recommendedCPU.brand, recommendedCPU.model);
        console.log('Recommended GPU:', recommendedGPU.brand, recommendedGPU.model);
      } else {
        console.log('No suitable components found within budget');
      }
    });

    console.log('\nData training completed successfully!');
  } catch (error) {
    console.error('Error during data training:', error);
  }
}

// Run the training process
trainData();