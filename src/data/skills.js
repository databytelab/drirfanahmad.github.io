/**
 * Skills displayed in the marquee on the homepage.
 * Add/remove freely. icon = lucide-react icon name (must exist in lucide-react).
 *
 * Browse all available icons at: https://lucide.dev/icons
 */
export const skills = [
  { name: 'Python', icon: 'Code2', color: '#3776AB' },
  { name: 'TensorFlow', icon: 'Brain', color: '#FF6F00' },
  { name: 'PyTorch', icon: 'Flame', color: '#EE4C2C' },
  { name: 'Keras', icon: 'Layers', color: '#D00000' },
  { name: 'Scikit-learn', icon: 'GitBranch', color: '#F7931E' },
  { name: 'HuggingFace', icon: 'Bot', color: '#FFD21E' },
  { name: 'Pandas', icon: 'Table', color: '#150458' },
  { name: 'NumPy', icon: 'Sigma', color: '#4D77CF' },
  { name: 'MATLAB', icon: 'Calculator', color: '#0076A8' },
  { name: 'R', icon: 'BarChart3', color: '#276DC3' },
  { name: 'Java', icon: 'Coffee', color: '#007396' },
  { name: 'C++', icon: 'Binary', color: '#00599C' },
  { name: 'SQL', icon: 'Database', color: '#003B57' },
  { name: 'Git', icon: 'GitMerge', color: '#F05032' },
  { name: 'Linux', icon: 'Terminal', color: '#FCC624' },
  { name: 'Docker', icon: 'Box', color: '#2496ED' },
  { name: 'AWS', icon: 'Cloud', color: '#FF9900' },
  { name: 'Tableau', icon: 'PieChart', color: '#E97627' },
  { name: 'OpenCV', icon: 'Eye', color: '#5C3EE8' },
  { name: 'LaTeX', icon: 'FileText', color: '#008080' },
  { name: 'Moodle', icon: 'GraduationCap', color: '#F98012' },
  { name: 'Claude Code', icon: 'Sparkles', color: '#D97757' },
]

/**
 * Focus areas — the 3 main research/teaching themes shown on homepage.
 */
export const focusAreas = [
  {
    icon: 'Brain',
    title: 'Machine Learning & Deep Learning',
    description: 'Building production-grade ML systems — fraud detection, computer vision, time-series forecasting, and explainable AI for high-stakes domains.',
    accent: 'amber',
  },
  {
    icon: 'Atom',
    title: 'Chaos Theory & Dynamical Systems',
    description: 'Discovering hidden and self-excited attractors in jerk, hyperjerk, and Chua-based circuits. Twelve Q1 publications in IJBC, IEEE Access, and Physica D.',
    accent: 'navy',
  },
  {
    icon: 'GraduationCap',
    title: 'Teaching & Curriculum Design',
    description: 'Eight years across four countries teaching CS — algorithms, data mining, software engineering, and ML. IBM Certified Data Scientist with active YouTube channel.',
    accent: 'navy-light',
  },
]

/**
 * Teaching philosophy — three pillars for the AI era.
 * Shown on homepage and Teaching page.
 */
export const philosophy = [
  {
    icon: 'Lightbulb',
    number: '01',
    title: 'Teach thinking, not answering',
    description: 'AI gives every student an instant answer. The work of a professor now is to teach them to ask better questions, spot wrong answers, and reason through the gap between what AI says and what is actually true.',
  },
  {
    icon: 'Target',
    number: '02',
    title: 'Assess understanding, not memory',
    description: 'Traditional exams test what AI does for free. I design open assessments — coding projects, critiques, debates, and live reasoning — that reveal whether a student truly understands, or is only quoting a model.',
  },
  {
    icon: 'Rocket',
    number: '03',
    title: 'Build with AI, push beyond it',
    description: 'I teach students to use AI as a daily co-worker — and then to extend it. The graduates who matter in this decade will not be the ones who use AI fastest; they will be the ones who improve it, criticise it, and build the next version.',
  },
]
