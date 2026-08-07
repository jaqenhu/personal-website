export const profile = {
  name: 'Jaqen Hu',
  alias: 'Chaojie Hu',
  handle: '@jaqenhu',
  role: 'AI Engineer / Unity VR Designer',
  tagline: 'integrating and shipping frontier technology',
  location: 'Hangzhou, China',
  email: 'jaqenhu@foxmail.com',
  phone: '+86 184-5712-6326',
  github: 'https://github.com/jaqenhu',
  intro: [
    'I work deep in AI, LLM and VR, focused on integrating frontier technology and bringing it into production. Right now I am building AI Agents — exploring agent self-iteration, digital-twin scene optimization and the limits of VR interaction systems.',
    'I believe great technical products are born where academic exploration meets engineering practice. Whether it is open-source co-creation, project collaboration or technical exchange, I am glad to take part and build together.',
  ],
}

export const stats = [
  { value: '6+', label: 'Years exploring tech' },
  { value: '12+', label: 'Projects shipped' },
  { value: '3', label: 'Core research areas' },
  { value: '∞', label: 'Curiosity for the frontier' },
]

export const projects = [
  {
    id: 'ai-workflow',
    index: '01',
    title: 'Enterprise AI Agent & Workflow Automation',
    category: 'AI Agent / Workflow',
    description:
      'A privately deployed AI automation platform built with FastGPT and n8n for customer inquiries, ticket summarization, document processing, and report generation.',
    features:
      'Agent configuration, knowledge retrieval, API-triggered workflows, human approval, error retries, and execution logs.',
    results:
      'Built 6 workflows with 15+ integrations. Achieved a 92% success rate across 200 test runs and reduced average processing time from 15 to 3 minutes.',
    image: '/project-ai-agent-workflow.png',
    tags: ['FastGPT', 'n8n', 'LLM API', 'FastAPI', 'Docker'],
  },
  {
    id: 'rag-knowledge-base',
    index: '02',
    title: 'Enterprise RAG Knowledge Base',
    category: 'RAG / Knowledge Base',
    description:
      'A RAGFlow-based knowledge system that transforms policies, product materials, and operation manuals into searchable, traceable answers.',
    features:
      'Multi-format document parsing, configurable chunking, semantic retrieval, reranking, and source citation.',
    results:
      'Processed 300+ documents into 20,000+ chunks. Reached 84% Top-3 retrieval accuracy and 88% valid-answer accuracy on a 100-question test set.',
    image: '/project-rag-knowledge-base.png',
    tags: ['RAGFlow', 'Embedding', 'Reranker', 'LLM API', 'Docker'],
  },
  {
    id: 'vr',
    index: '03',
    title: 'NPP VR Interaction System',
    category: 'Digital Twin / VR',
    description:
      'A digital-twin training environment that recreates key nuclear power plant (NPP) areas at full scale for safe and repeatable VR practice.',
    features:
      'Equipment interaction, guided procedures, inspection training, emergency simulation, and performance tracking.',
    results:
      'Delivered 10 training scenarios across 3 operational areas with 60+ interactive equipment points, reducing training costs by 40% and training time by 35%.',
    image: '/project-npp-vr-digital-twin.png',
    tags: ['Unreal Engine 5', 'BIM', 'Plant Simulation', 'OpenXR', 'C++'],
  },
]

export const skills = [
  { name: 'Python', value: 90 },
  { name: 'Langchain', value: 85 },
  { name: 'Workflow', value: 95 },
  { name: 'LLM-API', value: 85 },
  { name: 'Prompt engineering', value: 80 },
  { name: 'VR', value: 85 },
  { name: 'Unity 3D', value: 80 },
]

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
