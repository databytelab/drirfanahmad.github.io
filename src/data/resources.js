/**
 * Resources, opportunities, and useful links shared by Dr. Irfan Ahmad.
 *
 * Categories: 'scholarship' | 'phd' | 'postdoc' | 'faculty' | 'dataset' | 'tool' | 'paper'
 * Status:     'open' | 'closing-soon' | 'closed'  (auto-renders correctly)
 *
 * To add a new entry: copy any object below to the top of the array, edit fields.
 */
export const resources = [
  {
    category: 'scholarship',
    title: 'New Zealand Government Excellence Awards',
    organization: 'Education New Zealand',
    country: 'New Zealand',
    deadline: '2026-09-30',
    status: 'open',
    description: 'Fully funded scholarships for international PhD students in STEM fields at all NZ universities including Waikato.',
    link: 'https://www.studywithnewzealand.govt.nz/',
    tags: ['PhD', 'Fully Funded', 'NZ'],
    note: 'Strong fit for ML/AI applicants. I am happy to discuss research proposals.',
  },
  {
    category: 'phd',
    title: 'PhD Position in Explainable AI for Transportation',
    organization: 'University of Waikato',
    country: 'New Zealand',
    deadline: '2026-08-15',
    status: 'open',
    description: 'Research position investigating explainable ML for travel mode choice prediction. Building on recent Transportation Research Interdisciplinary Perspectives publication.',
    link: '',
    tags: ['PhD', 'XAI', 'Funded'],
    note: 'Reach out via the contact form before applying — I can connect you to the supervising team.',
  },
  {
    category: 'dataset',
    title: 'Thai Currency Recognition Dataset',
    organization: 'Personal — Assumption University',
    country: 'Thailand',
    status: 'open',
    description: 'Curated dataset of 20, 50, 100, 500, and 1000 baht banknotes used in our ICSPCS 2024 paper. Public for academic use.',
    link: 'https://github.com/databytelab',
    tags: ['Dataset', 'Computer Vision', 'Transfer Learning'],
    note: 'Cite the ICSPCS 2024 paper if you use this dataset.',
  },
  {
    category: 'tool',
    title: 'IBM Data Science Professional Certificate',
    organization: 'Coursera',
    status: 'open',
    description: 'The most comprehensive entry-level data science certification. I completed all 12 courses and strongly recommend it for ML beginners.',
    link: 'https://www.coursera.org/professional-certificates/ibm-data-science',
    tags: ['Learning', 'Certification', 'Beginner'],
    note: 'Financial aid available. Takes 3-6 months at part-time pace.',
  },
  {
    category: 'paper',
    title: 'Recommended Reading: Hidden Attractors in Dynamical Systems',
    organization: 'Leonov et al., 2015',
    status: 'open',
    description: 'Foundational survey paper on hidden attractors — essential reading for anyone starting research in nonlinear dynamics and chaos theory.',
    link: 'https://doi.org/10.1142/S0218127415300074',
    tags: ['Reading', 'Chaos Theory', 'Foundational'],
    note: '',
  },
  {
    category: 'postdoc',
    title: 'Example: Postdoc in ML for Energy Systems',
    organization: 'Various universities',
    country: 'International',
    deadline: '2026-12-31',
    status: 'open',
    description: 'Several postdoc positions available globally in ML applied to power systems and smart grids. Placeholder entry — replace with real opportunities you encounter.',
    link: '',
    tags: ['Postdoc', 'Energy', 'ML'],
    note: 'This is a placeholder — edit src/data/resources.js to add real positions.',
  },
]

export const resourceCategories = [
  { key: 'all', label: 'All', icon: 'Sparkles' },
  { key: 'scholarship', label: 'Scholarships', icon: 'Award' },
  { key: 'phd', label: 'PhD Positions', icon: 'GraduationCap' },
  { key: 'postdoc', label: 'Postdoc', icon: 'Microscope' },
  { key: 'faculty', label: 'Faculty Jobs', icon: 'Briefcase' },
  { key: 'dataset', label: 'Datasets', icon: 'Database' },
  { key: 'tool', label: 'Learning', icon: 'BookOpen' },
  { key: 'paper', label: 'Papers', icon: 'FileText' },
]
