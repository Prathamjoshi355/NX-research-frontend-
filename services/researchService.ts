
export const getResearchStrategyResponse = async (industry: string, problem: string) => {
  // Simulate a short processing delay for a professional feel
  await new Promise(resolve => setTimeout(resolve, 600));

  const strategies: Record<string, string> = {
    'Technology & Software': `1. Implementation Framework: Deployment of scalable architecture with integrated data validation layers.
2. Core Methodologies: Incremental prototyping, systematic load testing, and comprehensive security auditing.
3. Projected Outcome: Enhanced operational reliability and significant reduction in technical overhead through modular optimization.`,
    
    'FinTech & Banking': `1. Implementation Framework: Integration of high-level encryption standards and real-time anomaly detection.
2. Core Methodologies: Quantitative risk assessment, volatility stress-testing, and compliance-centric data structuring.
3. Projected Outcome: Strengthened transaction integrity and automated regulatory reporting compliance.`,
    
    'Healthcare & BioTech': `1. Implementation Framework: Secure handling protocols utilizing high-compliance infrastructure and biostatistical modeling.
2. Core Methodologies: Clinical validation cycles, genomic data mining, and predictive outcome analysis.
3. Projected Outcome: Streamlined R&D timelines and verified data sets for institutional review.`,
    
    'Smart Manufacturing': `1. Implementation Framework: IoT sensor integration with algorithmic maintenance scheduling.
2. Core Methodologies: Digital twin mapping, supply chain logistics optimization, and throughput analysis.
3. Projected Outcome: Measurable reduction in operational downtime and optimized hardware lifecycle management.`,
    
    'Public Sector': `1. Implementation Framework: Transparent data silos combined with high-security access protocols.
2. Core Methodologies: Socio-economic impact evaluation, urban simulation, and public sentiment modeling.
3. Projected Outcome: Evidence-based policy frameworks and optimized public service distribution.`,
    
    'Other Industries': `1. Implementation Framework: Multi-disciplinary research application focused on unique market identifiers.
2. Core Methodologies: Custom ethnographic studies, competitive landscape evaluation, and experimental data synthesis.
3. Projected Outcome: Strategic insights tailored specifically to vertical-specific constraints.`
  };

  return strategies[industry] || strategies['Other Industries'];
};
