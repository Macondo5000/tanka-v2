export interface OrgMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  isOnline: boolean;
  email: string;
  tags: string[];
  mutualGroups: number;
  about: string;
  traits: string[];
  responsibilities: string[];
  achievements: string[];
}

const TAGS_POOL = [
  'Tanka', 'Shanghai Office', 'Beijing Office', 'Remote', 'Core Team',
  'New Hire', 'Mentor', 'Tech Lead', 'On-call', 'Part-time',
];

const TRAITS_POOL = [
  'Systems Thinker', 'Detail-Oriented', 'Cross-Functional', 'AI-Native',
  'Data-Driven', 'Creative Problem Solver', 'Team Player', 'Fast Learner',
  'Strategic Planner', 'Execution-Focused', 'Customer-Centric', 'Technical Expert',
];

const ABOUT_TEMPLATES = [
  (name: string, role: string, dept: string) => `${name} is a ${role} in the ${dept} team, focused on driving quality and innovation across projects.`,
  (name: string, role: string, dept: string) => `As ${role} at Tanka, ${name} brings deep expertise in ${dept.toLowerCase()} to deliver impactful results.`,
  (name: string, role: string, dept: string) => `${name} works as ${role} in ${dept}, passionate about building scalable solutions and mentoring teammates.`,
  (name: string, role: string, dept: string) => `${name} leads key initiatives in the ${dept} department, combining strategic thinking with hands-on ${role.toLowerCase()} experience.`,
];

const RESPONSIBILITY_POOL = [
  'Define and maintain team OKRs, ensuring alignment with company-wide strategic goals.',
  'Lead cross-functional projects from planning through delivery and post-launch review.',
  'Establish review processes and quality standards for team deliverables.',
  'Mentor junior team members and conduct regular knowledge-sharing sessions.',
  'Coordinate with stakeholders to align priorities and manage expectations.',
  'Drive continuous improvement through data analysis and retrospectives.',
  'Own technical architecture decisions and ensure system reliability.',
  'Develop and maintain documentation for key processes and workflows.',
  'Collaborate with product and design teams to define feature requirements.',
  'Monitor industry trends and evaluate new tools and technologies.',
];

const ACHIEVEMENT_POOL = [
  'Successfully launched a major product feature that improved user engagement by 35%.',
  'Led the migration of core infrastructure, reducing operational costs by 20%.',
  'Established a new onboarding process that reduced ramp-up time from 4 weeks to 2 weeks.',
  'Spearheaded cross-team collaboration initiative that unblocked 3 critical projects.',
  'Received company-wide recognition award for outstanding contribution to Q3 goals.',
  'Designed and implemented automated testing pipeline, cutting release cycles by 40%.',
  'Built a shared component library adopted by 4 product teams across the organization.',
  'Drove customer satisfaction score from 7.2 to 8.8 through targeted UX improvements.',
];

function pick<T>(pool: T[], hash: number, count: number, offset = 0): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) result.push(pool[(hash + i * 7 + offset) % pool.length]);
  return [...new Set(result)];
}

function member(id: string, name: string, role: string, department: string, online = false): OrgMember {
  const firstName = name.split(' ')[0].toLowerCase();
  const lastName = name.split(' ').slice(-1)[0].toLowerCase();
  // Deterministic pseudo-random from id
  const hash = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const tagCount = (hash % 3) + 1;
  const tags: string[] = [];
  tags.push('Tanka'); // everyone has Tanka
  for (let i = 1; i < tagCount; i++) tags.push(TAGS_POOL[(hash + i * 3) % TAGS_POOL.length]);
  return {
    id, name, avatar: `https://i.pravatar.cc/40?u=${id}`, role, department, isOnline: online,
    email: `${firstName}.${lastName}@tanka.io`,
    tags: [...new Set(tags)],
    mutualGroups: (hash % 18) + 1,
    about: ABOUT_TEMPLATES[hash % ABOUT_TEMPLATES.length](name, role, department),
    traits: pick(TRAITS_POOL, hash, (hash % 3) + 3),
    responsibilities: pick(RESPONSIBILITY_POOL, hash, (hash % 3) + 3, 2),
    achievements: pick(ACHIEVEMENT_POOL, hash, (hash % 2) + 2, 4),
  };
}

export const ORG_MEMBERS: OrgMember[] = [
  // ── Leadership (5) ──
  member('ceo-01', 'James Chen', 'CEO', 'Leadership', true),
  member('cto-01', 'Emily Zhang', 'CTO', 'Leadership', true),
  member('cpo-01', 'David Liu', 'CPO', 'Leadership', true),
  member('cfo-01', 'Michelle Wu', 'CFO', 'Leadership'),
  member('coo-01', 'Robert Yang', 'COO', 'Leadership'),

  // ── Product (10) ──
  member('prod-01', 'Sarah Lin', 'VP of Product', 'Product', true),
  member('prod-02', 'Li Ming', 'Senior PM', 'Product', true),
  member('prod-03', 'Kevin Zhao', 'PM — AI Features', 'Product', true),
  member('prod-04', 'Anna He', 'PM — Platform', 'Product'),
  member('prod-05', 'Tommy Xu', 'PM — Growth', 'Product'),
  member('prod-06', 'Yuki Tanaka', 'PM — Enterprise', 'Product', true),
  member('prod-07', 'Grace Huang', 'Product Analyst', 'Product'),
  member('prod-08', 'Leo Qian', 'Product Analyst', 'Product'),
  member('prod-09', 'Nina Zhou', 'Product Operations', 'Product'),
  member('prod-10', 'Ryan Feng', 'Technical PM', 'Product', true),

  // ── Engineering (25) ──
  member('eng-01', 'Chen Lei', 'Engineering Lead', 'Engineering', true),
  member('eng-02', 'Wei Zhang', 'Staff Engineer', 'Engineering', true),
  member('eng-03', 'Jack Ma', 'Senior Frontend', 'Engineering', true),
  member('eng-04', 'Sophie Ren', 'Senior Frontend', 'Engineering'),
  member('eng-05', 'Tim Wang', 'Senior Backend', 'Engineering', true),
  member('eng-06', 'Lily Guo', 'Senior Backend', 'Engineering'),
  member('eng-07', 'Eric Sun', 'Full Stack', 'Engineering', true),
  member('eng-08', 'Diana Li', 'Full Stack', 'Engineering'),
  member('eng-09', 'Frank Jiang', 'iOS Engineer', 'Engineering', true),
  member('eng-10', 'Claire Hu', 'iOS Engineer', 'Engineering'),
  member('eng-11', 'Gary Pan', 'Android Engineer', 'Engineering'),
  member('eng-12', 'Iris Ye', 'Android Engineer', 'Engineering', true),
  member('eng-13', 'Oscar Luo', 'ML Engineer', 'Engineering', true),
  member('eng-14', 'Zoe Deng', 'ML Engineer', 'Engineering'),
  member('eng-15', 'Victor Cao', 'Data Engineer', 'Engineering'),
  member('eng-16', 'Hannah Shen', 'Data Engineer', 'Engineering', true),
  member('eng-17', 'Dylan Xia', 'DevOps', 'Engineering', true),
  member('eng-18', 'Mia Zhong', 'DevOps', 'Engineering'),
  member('eng-19', 'Noah Bai', 'QA Lead', 'Engineering'),
  member('eng-20', 'Ella Fang', 'QA Engineer', 'Engineering', true),
  member('eng-21', 'Liam Peng', 'QA Engineer', 'Engineering'),
  member('eng-22', 'Chloe Tao', 'Frontend', 'Engineering'),
  member('eng-23', 'Jason Yin', 'Backend', 'Engineering', true),
  member('eng-24', 'Amy Gu', 'Frontend Intern', 'Engineering'),
  member('eng-25', 'Bryan Kong', 'Backend Intern', 'Engineering'),

  // ── Design (12) ──
  member('des-01', 'Ling Lv', 'Design VP', 'Design', true),
  member('des-02', 'Zhanghua', 'Senior Designer', 'Design'),
  member('des-03', 'Wang Fang', 'Senior Designer', 'Design'),
  member('des-04', 'Koko Shi', 'Product Designer', 'Design', true),
  member('des-05', 'Mika Xu', 'Product Designer', 'Design', true),
  member('des-06', 'Haru Nakamura', 'UX Researcher', 'Design'),
  member('des-07', 'Jess Tan', 'UX Researcher', 'Design', true),
  member('des-08', 'Felix Liang', 'Visual Designer', 'Design'),
  member('des-09', 'Cindy Cheng', 'Visual Designer', 'Design'),
  member('des-10', 'Derek Ho', 'Motion Designer', 'Design', true),
  member('des-11', 'Rosa Liu', 'Design Ops', 'Design'),
  member('des-12', 'Sam Gao', 'Design Intern', 'Design'),

  // ── Marketing (12) ──
  member('mkt-01', 'Lisa Wang', 'VP of Marketing', 'Marketing', true),
  member('mkt-02', 'Tony Ren', 'Growth Lead', 'Marketing', true),
  member('mkt-03', 'Julia Xie', 'Content Lead', 'Marketing'),
  member('mkt-04', 'Mark Zhou', 'SEO Specialist', 'Marketing', true),
  member('mkt-05', 'Wendy Qi', 'Social Media Manager', 'Marketing'),
  member('mkt-06', 'Chris Yao', 'Performance Marketing', 'Marketing', true),
  member('mkt-07', 'Daisy Lü', 'Brand Designer', 'Marketing'),
  member('mkt-08', 'Patrick Cui', 'Community Manager', 'Marketing', true),
  member('mkt-09', 'Serena Ma', 'PR Manager', 'Marketing'),
  member('mkt-10', 'Ivan Lu', 'Event Coordinator', 'Marketing'),
  member('mkt-11', 'Tina Han', 'Marketing Analyst', 'Marketing'),
  member('mkt-12', 'Alex Ruan', 'Marketing Intern', 'Marketing'),

  // ── Sales (15) ──
  member('sal-01', 'Jack Wu', 'Sales Director', 'Sales', true),
  member('sal-02', 'Rachel Lin', 'Enterprise AE', 'Sales', true),
  member('sal-03', 'Mike Zhu', 'Enterprise AE', 'Sales'),
  member('sal-04', 'Nancy He', 'Mid-Market AE', 'Sales', true),
  member('sal-05', 'Peter Song', 'Mid-Market AE', 'Sales'),
  member('sal-06', 'Olivia Wan', 'SMB AE', 'Sales', true),
  member('sal-07', 'George Yuan', 'SMB AE', 'Sales'),
  member('sal-08', 'Kelly Xiao', 'SDR Lead', 'Sales', true),
  member('sal-09', 'Brian Dong', 'SDR', 'Sales'),
  member('sal-10', 'Stella Qin', 'SDR', 'Sales', true),
  member('sal-11', 'Howard Fan', 'Solutions Engineer', 'Sales'),
  member('sal-12', 'Vivian Tang', 'Solutions Engineer', 'Sales', true),
  member('sal-13', 'Ray Chu', 'Revenue Ops', 'Sales'),
  member('sal-14', 'Sandy Ji', 'Sales Enablement', 'Sales'),
  member('sal-15', 'Ben Liao', 'Sales Intern', 'Sales'),

  // ── Customer Success (8) ──
  member('cs-01', 'Maggie Wen', 'CS Lead', 'Customer Success', true),
  member('cs-02', 'Steven Dai', 'Senior CSM', 'Customer Success', true),
  member('cs-03', 'Linda Ou', 'CSM', 'Customer Success'),
  member('cs-04', 'Edward Mao', 'CSM', 'Customer Success', true),
  member('cs-05', 'Fiona Xu', 'Support Lead', 'Customer Success'),
  member('cs-06', 'Andy Ke', 'Support Engineer', 'Customer Success', true),
  member('cs-07', 'Nana Ye', 'Support Engineer', 'Customer Success'),
  member('cs-08', 'Carl Ding', 'Onboarding Specialist', 'Customer Success'),

  // ── Finance & HR (8) ──
  member('fin-01', 'Helen Zou', 'Finance Director', 'Finance & HR'),
  member('fin-02', 'Alan Qiu', 'Senior Accountant', 'Finance & HR', true),
  member('fin-03', 'Betty Shi', 'Accountant', 'Finance & HR'),
  member('fin-04', 'Roger Yan', 'FP&A Analyst', 'Finance & HR'),
  member('hr-01', 'Catherine Pang', 'HR Director', 'Finance & HR', true),
  member('hr-02', 'Danny Lv', 'HR Business Partner', 'Finance & HR'),
  member('hr-03', 'Eva Jin', 'Recruiter', 'Finance & HR', true),
  member('hr-04', 'Larry Weng', 'Recruiter', 'Finance & HR'),

  // ── Legal & Compliance (5) ──
  member('leg-01', 'Wang Zong', 'General Counsel', 'Legal', false),
  member('leg-02', 'Ivy Chang', 'Legal Counsel', 'Legal'),
  member('leg-03', 'Philip Nie', 'Compliance Officer', 'Legal', true),
  member('leg-04', 'Tiffany Meng', 'Privacy Counsel', 'Legal'),
  member('leg-05', 'Arthur Xiong', 'Contract Manager', 'Legal'),
];

export const DEPARTMENTS = [
  'Leadership',
  'Product',
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Customer Success',
  'Finance & HR',
  'Legal',
] as const;
