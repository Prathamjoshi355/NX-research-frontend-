
export const getResearchConsultantResponse = async (industry: string, problem: string) => {
  // Simulate a short network delay for better UX
  await new Promise(resolve => setTimeout(resolve, 800));

  const templates: Record<string, string> = {
    'Technology & Software': `1. Strategic Approach: Implementation of a scalable microservices architecture coupled with robust data validation pipelines.
2. Potential Methodologies: Iterative prototyping, load testing for high-concurrency scenarios, and edge-case security auditing.
3. Expected Value: Enhanced system reliability and a 30% reduction in technical debt through optimized code-base modularity.`,
    
    'FinTech & Banking': `1. Strategic Approach: Deployment of advanced encryption standards and real-time fraud detection algorithms.
2. Potential Methodologies: Quantitative risk modeling, stress-testing under market volatility, and compliance-first data architecture.
3. Expected Value: Improved transaction security and strictly audited regulatory reporting frameworks.`,
    
    'Healthcare & BioTech': `1. Strategic Approach: Secure patient data handling utilizing HIPAA-compliant cloud infrastructure and biostatistical analysis.
2. Potential Methodologies: Clinical trial data verification, genomic sequencing data mining, and predictive patient outcome modeling.
3. Expected Value: Accelerated R&D cycles and verified data sets for medical peer-review submission.`,
    
    'Smart Manufacturing': `1. Strategic Approach: Integration of IoT sensor arrays with predictive maintenance schedules for hardware longevity.
2. Potential Methodologies: Digital twin simulation, supply chain logistics optimization, and factory floor throughput analysis.
3. Expected Value: 15% reduction in unplanned downtime and optimized resource allocation across the production line.`,
    
    'Public Sector': `1. Strategic Approach: Open-source transparency combined with high-security clearance data silos for public trust.
2. Potential Methodologies: Socio-economic impact studies, urban planning simulations, and public sentiment analysis.
3. Expected Value: Data-backed policy recommendations and streamlined citizen service delivery.`,
    
    'Other Industries': `1. Strategic Approach: Cross-disciplinary research application focused on identifying unique market inefficiencies.
2. Potential Methodologies: Custom ethnographic research, competitive landscape mapping, and experimental data gathering.
3. Expected Value: Actionable insights tailored specifically to the unique constraints of your vertical.`
  };

  return templates[industry] || templates['Other Industries'];
};
