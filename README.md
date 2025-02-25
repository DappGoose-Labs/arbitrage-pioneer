# Welcome to your GPT Engineer project

## Project info

**Project**: arbitrage-pioneer

**URL**: https://run.gptengineer.app/projects/f23a950b-a0d5-4ec9-a77a-600a97461838/improve

## API Documentation

### Overview
The arbitrage-pioneer API provides endpoints to retrieve arbitrage opportunities and detailed trade route instructions. All endpoints return JSON data and use promises for asynchronous operations.

### Endpoints

#### 1. Fetch All Arbitrage Opportunities
```javascript
const opportunities = await fetchArbitrageOpportunities();
```
Returns an array of all available arbitrage opportunities.

**Response Format**:
```javascript
[
  {
    id: string,           // Unique identifier
    type: string,         // Type of arbitrage
    profitUSD: number,    // Expected profit in USD
    route: string[],      // Array of DEXes in the route
    networks: string[],   // Blockchain networks involved
    estimatedFees: number,// Estimated transaction fees in USD
    steps: [              // Detailed steps for execution
      {
        step: number,
        action: 'SWAP' | 'BRIDGE',
        from: {
          token: string,
          amount: string,
          dex?: string,
          network: string,
          bridge?: string
        },
        to: {
          token?: string,
          expectedAmount?: string,
          dex?: string,
          network: string,
          estimatedTime?: string
        }
      }
    ]
  }
]
```

#### 2. Get Route Instructions
```javascript
const instructions = await getRouteInstructions(opportunityId);
```
Returns detailed instructions for executing a specific arbitrage opportunity.

**Parameters**:
- `opportunityId`: string (required) - The unique identifier of the opportunity

**Response Format**:
```javascript
{
  id: string,
  type: string,
  profitUSD: number,
  estimatedFees: number,
  totalSteps: number,
  networks: string[],
  route: string[],
  detailedSteps: Array<Step>,
  estimatedTimeToComplete: number, // in minutes
  timestamp: string               // ISO format
}
```

#### 3. Get Opportunities Summary
```javascript
const summary = await getOpportunitiesSummary();
```
Returns a summary of all available arbitrage opportunities.

**Response Format**:
```javascript
{
  timestamp: string,           // ISO format
  totalOpportunities: number,
  networks: string[],         // List of unique networks
  opportunities: [
    {
      id: string,
      type: string,
      profitUSD: number,
      networks: string[],
      estimatedFees: number,
      route: string[]
    }
  ]
}
```

### Example Usage

```javascript
// Get all opportunities
const opportunities = await fetchArbitrageOpportunities();
console.log('Available opportunities:', opportunities);

// Get specific route instructions
const routeInstructions = await getRouteInstructions('arb-001');
console.log('Route instructions:', routeInstructions);

// Get opportunities summary
const summary = await getOpportunitiesSummary();
console.log('Opportunities summary:', summary);
```

