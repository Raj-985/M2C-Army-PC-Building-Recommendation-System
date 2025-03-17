import React, { useState } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Monitor, 
  Keyboard, 
  Disc, 
  Fan, 
  Zap, 
  Package
} from 'lucide-react';

interface PCPart {
  component: string;
  brand: string;
  model: string;
  price: number;
  amazonLink: string;
  flipkartLink: string;
}

const Home = () => {
  const [budget, setBudget] = useState<string>('');
  const [useCase, setUseCase] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string>('');
  const [pcParts, setPcParts] = useState<PCPart[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock data for demonstration
      const mockPcParts: PCPart[] = [
        {
          component: 'CPU',
          brand: 'AMD',
          model: 'Ryzen 7 5800X',
          price: 299.99,
          amazonLink: 'https://www.amazon.com',
          flipkartLink: 'https://www.flipkart.com'
        },
        {
          component: 'Motherboard',
          brand: 'ASUS',
          model: 'ROG Strix B550-F Gaming',
          price: 179.99,
          amazonLink: 'https://www.amazon.com',
          flipkartLink: 'https://www.flipkart.com'
        },
        {
          component: 'Memory',
          brand: 'Corsair',
          model: 'Vengeance RGB Pro 16GB (2x8GB) DDR4 3600',
          price: 89.99,
          amazonLink: 'https://www.amazon.com',
          flipkartLink: 'https://www.flipkart.com'
        },
        {
          component: 'Storage',
          brand: 'Samsung',
          model: '970 EVO Plus 1TB NVMe SSD',
          price: 129.99,
          amazonLink: 'https://www.amazon.com',
          flipkartLink: 'https://www.flipkart.com'
        },
        {
          component: 'GPU',
          brand: 'NVIDIA',
          model: 'GeForce RTX 3070',
          price: 599.99,
          amazonLink: 'https://www.amazon.com',
          flipkartLink: 'https://www.flipkart.com'
        },
        {
          component: 'Power Supply',
          brand: 'EVGA',
          model: 'SuperNOVA 750 G5, 80 Plus Gold 750W',
          price: 109.99,
          amazonLink: 'https://www.amazon.com',
          flipkartLink: 'https://www.flipkart.com'
        },
        {
          component: 'Case',
          brand: 'NZXT',
          model: 'H510 - Compact ATX Mid-Tower',
          price: 69.99,
          amazonLink: 'https://www.amazon.com',
          flipkartLink: 'https://www.flipkart.com'
        }
      ];
      
      setPcParts(mockPcParts);
      setLoading(false);
    }, 1500);
  };

  const getComponentIcon = (component: string) => {
    switch (component) {
      case 'CPU':
        return <Cpu className="h-5 w-5 text-gold-500" />;
      case 'Motherboard':
        return <HardDrive className="h-5 w-5 text-gold-500" />;
      case 'Memory':
        return <Disc className="h-5 w-5 text-gold-500" />;
      case 'Storage':
        return <HardDrive className="h-5 w-5 text-gold-500" />;
      case 'GPU':
        return <Monitor className="h-5 w-5 text-gold-500" />;
      case 'Power Supply':
        return <Zap className="h-5 w-5 text-gold-500" />;
      case 'Case':
        return <Package className="h-5 w-5 text-gold-500" />;
      default:
        return <Fan className="h-5 w-5 text-gold-500" />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm opacity-20 z-0"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold-500">Build Your Dream PC</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get AI-powered recommendations for PC components based on your budget and requirements.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-xl border border-gold-600">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="budget" className="block text-gold-500 font-medium mb-2">Budget (in $)</label>
              <input
                type="number"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-white"
                placeholder="Enter your budget"
                required
              />
            </div>
            
            <div>
              <label htmlFor="useCase" className="block text-gold-500 font-medium mb-2">Use Case</label>
              <select
                id="useCase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-white"
                required
              >
                <option value="">Select use case</option>
                <option value="gaming">Gaming</option>
                <option value="productivity">Productivity</option>
                <option value="streaming">Streaming</option>
                <option value="design">Graphic Design</option>
                <option value="development">Software Development</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="suggestions" className="block text-gold-500 font-medium mb-2">Additional Suggestions (Optional)</label>
              <textarea
                id="suggestions"
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-white h-32"
                placeholder="Any specific requirements or preferences?"
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gold-600 hover:bg-gold-700 text-black font-bold rounded-md transition-colors duration-300 flex items-center justify-center space-x-2 mx-auto"
                disabled={loading}
              >
                {loading ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black"></span>
                ) : (
                  <>
                    <Cpu className="h-5 w-5" />
                    <span>Generate Build</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {pcParts && (
          <div className="mt-16 max-w-5xl mx-auto bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-xl border border-gold-600">
            <h2 className="text-2xl font-bold mb-6 text-gold-500 text-center">Recommended PC Build</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-4 py-3 text-left text-gold-500">Component</th>
                    <th className="px-4 py-3 text-left text-gold-500">Brand</th>
                    <th className="px-4 py-3 text-left text-gold-500">Model</th>
                    <th className="px-4 py-3 text-left text-gold-500">Price</th>
                    <th className="px-4 py-3 text-left text-gold-500">Buy</th>
                  </tr>
                </thead>
                <tbody>
                  {pcParts.map((part, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-900'}>
                      <td className="px-4 py-3 flex items-center space-x-2">
                        {getComponentIcon(part.component)}
                        <span>{part.component}</span>
                      </td>
                      <td className="px-4 py-3">{part.brand}</td>
                      <td className="px-4 py-3">{part.model}</td>
                      <td className="px-4 py-3">${part.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <a
                            href={part.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 bg-gold-600 hover:bg-gold-700 text-black text-xs font-semibold rounded transition-colors"
                          >
                            Amazon
                          </a>
                          <a
                            href={part.flipkartLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-colors"
                          >
                            Flipkart
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-800">
                    <td colSpan={3} className="px-4 py-3 text-right font-bold">Total:</td>
                    <td className="px-4 py-3 font-bold text-gold-500">
                      ${pcParts.reduce((sum, part) => sum + part.price, 0).toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;