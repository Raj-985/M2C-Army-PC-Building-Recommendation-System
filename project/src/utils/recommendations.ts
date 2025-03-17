import { readFileSync } from 'fs';
import { join } from 'path';
import natural from 'natural';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Component {
  brand: string;
  model: string;
  price: number;
  amazon_link: string;
  flipkart_link: string;
}

interface CPU extends Component {
  cores: number;
  threads: number;
  base_clock: number;
  boost_clock: number;
  tdp: number;
}

interface GPU extends Component {
  memory: number;
  memory_type: string;
  base_clock: number;
  boost_clock: number;
  tdp: number;
}

interface PCBuild {
  cpu: CPU | null;
  gpu: GPU | null;
  totalPrice: number;
}

interface ComponentScore {
  component: CPU | GPU;
  score: number;
}

// Initialize TF-IDF
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// Cache for component data and embeddings
let cpuCache: CPU[] | null = null;
let gpuCache: GPU[] | null = null;
let componentEmbeddings: Map<string, number[]> = new Map();

// Load and parse component data
function loadComponents(): void {
  if (cpuCache && gpuCache) return;

  try {
    const cpuData = readFileSync(join(__dirname, '../../data/components/cpus.csv'), 'utf-8');
    const gpuData = readFileSync(join(__dirname, '../../data/components/gpus.csv'), 'utf-8');

    cpuCache = parseCSV(cpuData) as CPU[];
    gpuCache = parseCSV(gpuData) as GPU[];

    // Create embeddings for components
    createComponentEmbeddings();
  } catch (error) {
    console.error('Error loading component data:', error);
    throw error;
  }
}

// Parse CSV data
function parseCSV(data: string): Component[] {
  const lines = data.split('\n').slice(1); // Skip header
  return lines.map(line => {
    const [brand, model, ...specs] = line.split(',');
    return {
      brand,
      model,
      // Parse other fields based on component type
      ...parseSpecs(specs)
    };
  });
}

// Create embeddings for components using TF-IDF
function createComponentEmbeddings(): void {
  const documents: string[] = [];

  // Add CPU documents
  cpuCache?.forEach(cpu => {
    const doc = `${cpu.brand} ${cpu.model} CPU with ${cpu.cores} cores ${cpu.threads} threads ${cpu.base_clock}GHz base ${cpu.boost_clock}GHz boost ${cpu.tdp}W TDP`;
    documents.push(doc);
    tfidf.addDocument(doc);
  });

  // Add GPU documents
  gpuCache?.forEach(gpu => {
    const doc = `${gpu.brand} ${gpu.model} GPU with ${gpu.memory}GB ${gpu.memory_type} ${gpu.base_clock}MHz base ${gpu.boost_clock}MHz boost ${gpu.tdp}W TDP`;
    documents.push(doc);
    tfidf.addDocument(doc);
  });

  // Create embeddings
  documents.forEach((doc, index) => {
    const embedding = Array.from({ length: documents.length }, (_, i) => {
      return tfidf.tfidf(doc.split(' '), i);
    });
    componentEmbeddings.set(doc, embedding);
  });
}

// Calculate similarity between query and component
function calculateSimilarity(query: string, component: CPU | GPU): number {
  const queryDoc = createComponentDescription(component);
  const queryEmbedding = Array.from({ length: componentEmbeddings.size }, (_, i) => {
    return tfidf.tfidf(queryDoc.split(' '), i);
  });

  const componentEmbedding = componentEmbeddings.get(queryDoc) || [];
  return cosineSimilarity(queryEmbedding, componentEmbedding);
}

// Create component description for embedding
function createComponentDescription(component: CPU | GPU): string {
  if ('cores' in component) {
    return `${component.brand} ${component.model} CPU with ${component.cores} cores ${component.threads} threads ${component.base_clock}GHz base ${component.boost_clock}GHz boost ${component.tdp}W TDP`;
  } else {
    return `${component.brand} ${component.model} GPU with ${component.memory}GB ${component.memory_type} ${component.base_clock}MHz base ${component.boost_clock}MHz boost ${component.tdp}W TDP`;
  }
}

// Calculate cosine similarity between vectors
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  const dotProduct = vec1.reduce((acc, val, i) => acc + val * (vec2[i] || 0), 0);
  const mag1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
  const mag2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (mag1 * mag2) || 0;
}

// Get component weights based on use case
function getComponentWeights(useCase: string): { cpuWeight: number; gpuWeight: number } {
  switch (useCase.toLowerCase()) {
    case 'gaming':
      return { cpuWeight: 0.3, gpuWeight: 0.7 };
    case 'productivity':
      return { cpuWeight: 0.7, gpuWeight: 0.3 };
    case 'streaming':
      return { cpuWeight: 0.5, gpuWeight: 0.5 };
    case 'design':
      return { cpuWeight: 0.4, gpuWeight: 0.6 };
    case 'development':
      return { cpuWeight: 0.8, gpuWeight: 0.2 };
    default:
      return { cpuWeight: 0.5, gpuWeight: 0.5 };
  }
}

// Main recommendation function
export async function getRecommendation(budget: number, useCase: string, suggestions?: string): Promise<PCBuild> {
  try {
    loadComponents();
    
    const { cpuWeight, gpuWeight } = getComponentWeights(useCase);
    const cpuBudget = budget * cpuWeight;
    const gpuBudget = budget * gpuWeight;

    // Filter components by budget
    const eligibleCPUs = (cpuCache || []).filter(cpu => cpu.price <= cpuBudget);
    const eligibleGPUs = (gpuCache || []).filter(gpu => gpu.price <= gpuBudget);

    // Create query based on use case and suggestions
    const query = `${useCase} ${suggestions || ''}`.toLowerCase();

    // Score components based on similarity and specifications
    const cpuScores: ComponentScore[] = eligibleCPUs.map(cpu => ({
      component: cpu,
      score: calculateSimilarity(query, cpu) * getSpecScore(cpu, useCase)
    }));

    const gpuScores: ComponentScore[] = eligibleGPUs.map(gpu => ({
      component: gpu,
      score: calculateSimilarity(query, gpu) * getSpecScore(gpu, useCase)
    }));

    // Sort by score and select best components
    const recommendedCPU = cpuScores.sort((a, b) => b.score - a.score)[0]?.component || null;
    const recommendedGPU = gpuScores.sort((a, b) => b.score - a.score)[0]?.component || null;

    return {
      cpu: recommendedCPU,
      gpu: recommendedGPU,
      totalPrice: (recommendedCPU?.price || 0) + (recommendedGPU?.price || 0)
    };
  } catch (error) {
    console.error('Error in getRecommendation:', error);
    throw error;
  }
}

// Calculate score based on component specifications
function getSpecScore(component: CPU | GPU, useCase: string): number {
  if ('cores' in component) {
    // CPU scoring
    const coreScore = component.cores / 16; // Normalize to high-end CPU
    const threadScore = component.threads / 32;
    const clockScore = component.boost_clock / 5.0; // Normalize to typical max boost

    switch (useCase.toLowerCase()) {
      case 'gaming':
        return clockScore * 0.5 + coreScore * 0.3 + threadScore * 0.2;
      case 'productivity':
        return coreScore * 0.4 + threadScore * 0.4 + clockScore * 0.2;
      case 'development':
        return threadScore * 0.5 + coreScore * 0.3 + clockScore * 0.2;
      default:
        return (coreScore + threadScore + clockScore) / 3;
    }
  } else {
    // GPU scoring
    const memoryScore = component.memory / 16; // Normalize to high-end GPU
    const clockScore = component.boost_clock / 2500; // Normalize to typical max boost

    switch (useCase.toLowerCase()) {
      case 'gaming':
        return clockScore * 0.6 + memoryScore * 0.4;
      case 'design':
        return memoryScore * 0.7 + clockScore * 0.3;
      default:
        return (memoryScore + clockScore) / 2;
    }
  }
}