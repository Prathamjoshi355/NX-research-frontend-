import { PathDefinition, FormSection } from './types';

const COMMON_BASIC_DETAILS: FormSection = {
  id: 'basic-details',
  title: 'SECTION 1 – Basic Details',
  fields: [
    { id: 'fullName', label: 'Full Name', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'email', required: true },
    { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { id: 'city', label: 'City / Country', type: 'text', required: true },
    { 
      id: 'currentStatus', 
      label: 'Current Status', 
      type: 'select', 
      options: ['School Student', 'UG Student', 'PG / MTech', 'Working Professional', 'Other'],
      required: true 
    },
    { id: 'college', label: 'College / Organization', type: 'text' },
    { id: 'linkedin', label: 'LinkedIn Profile', type: 'url' },
    { id: 'portfolio', label: 'Portfolio / GitHub (optional)', type: 'url' },
  ]
};

export const PATHS: PathDefinition[] = [
  {
    id: 'learn',
    label: 'Learn',
    description: 'Master new skills and build projects',
    icon: 'BookOpen',
    sections: [
      COMMON_BASIC_DETAILS,
      {
        id: 'learning-goals',
        title: 'SECTION 2 — What You Want to Learn',
        fields: [
          { id: 'priorityArea', label: 'Priority learning area (Primary focus)', type: 'text', required: true },
          { 
            id: 'whyLearn', 
            label: 'Why do you want to learn this?', 
            type: 'radio', 
            options: ['Career', 'Research', 'Startup', 'Placement', 'Curiosity'] 
          },
          { id: 'goals3to6Months', label: 'What do you want to achieve in 3–6 months?', type: 'textarea' },
          { 
            id: 'learningStyle', 
            label: 'Preferred learning style', 
            type: 'radio', 
            options: ['Structured roadmap', 'Hands-on', 'Mentorship', 'Community'] 
          },
          { id: 'weeklyTime', label: 'Weekly time available', type: 'text' },
          { id: 'biggestChallenge', label: 'Biggest learning challenge', type: 'textarea' },
        ]
      },
      {
        id: 'current-skills',
        title: 'SECTION 3 — Your Current Skills',
        fields: [
          { id: 'languages', label: 'Programming languages you know', type: 'text' },
          { id: 'tools', label: 'Tools you use', type: 'text' },
          { 
            id: 'concepts', 
            label: 'Concepts you know', 
            type: 'multi-select', 
            options: ['Basics', 'Intermediate', 'Advanced'] 
          },
          { id: 'hasBuiltProjects', label: 'Have you built projects?', type: 'radio', options: ['Yes', 'No'] },
          { 
            id: 'projectLinks', 
            label: 'Project links', 
            type: 'text', 
            condition: (v) => v.hasBuiltProjects === 'Yes' 
          },
        ]
      },
      {
        id: 'experience',
        title: 'SECTION 4 — Experience & Exposure',
        fields: [
          { id: 'hasStartupExp', label: 'Have you previously worked with a startup?', type: 'radio', options: ['Yes', 'No'] },
          { id: 'hasResearchExp', label: 'Have you worked on research before?', type: 'radio', options: ['Yes', 'No'] },
        ]
      },
      {
        id: 'self-assessment',
        title: 'SECTION 5 — Quick Self Assessment',
        fields: [
          { id: 'overallLevel', label: 'Overall level', type: 'radio', options: ['Beginner', 'Intermediate', 'Advanced'] },
          { id: 'codingComfort', label: 'Coding comfort', type: 'radio', options: ['Low', 'Medium', 'High'] },
          { id: 'mathComfort', label: 'Math / logic comfort', type: 'radio', options: ['Low', 'Medium', 'High'] },
        ]
      },
      {
        id: 'final',
        title: 'FINAL SECTION',
        fields: [
          { id: 'openToProjects', label: 'Open to projects after learning?', type: 'radio', options: ['Yes', 'No'] },
          { id: 'consent', label: 'I agree to be contacted by the NX ecosystem', type: 'checkbox', required: true },
        ]
      }
    ]
  },
  {
    id: 'idea',
    label: 'Idea',
    description: 'Submit or collaborate on innovative ideas',
    icon: 'Lightbulb',
    sections: [
      COMMON_BASIC_DETAILS,
      {
        id: 'idea-path',
        title: 'SECTION 2 — Choose Idea Path',
        fields: [
          { 
            id: 'pathChoice', 
            label: 'Choose your path', 
            type: 'radio', 
            options: ['Work on a New Idea', 'Suggest a New Idea'],
            required: true
          }
        ]
      },
      {
        id: 'work-on-idea',
        title: 'PATH 1 — Work on a New Idea',
        fields: [
          { id: 'domains', label: 'Domains interested in', type: 'multi-select', options: ['AI', 'SaaS', 'HealthTech', 'EdTech', 'Research', 'Social', 'FinTech', 'Other'] },
          { id: 'skills', label: 'Skills you can contribute', type: 'text' },
          { id: 'whyWorkOnIdeas', label: 'Why do you want to work on ideas?', type: 'textarea' },
        ],
        condition: (v) => v.pathChoice === 'Work on a New Idea'
      },
      {
        id: 'suggest-idea',
        title: 'PATH 2 — Suggest a New Idea',
        fields: [
          { id: 'ideaTitle', label: 'Idea title', type: 'text', required: true },
          { id: 'problemStatement', label: 'Problem statement', type: 'textarea', required: true },
          { id: 'solution', label: 'Proposed solution', type: 'textarea', required: true },
          { id: 'stage', label: 'Current stage', type: 'select', options: ['Concept', 'Validation', 'Prototype'] },
        ],
        condition: (v) => v.pathChoice === 'Suggest a New Idea'
      }
    ]
  },
  {
    id: 'startup',
    label: 'Startup',
    description: 'Join the startup ecosystem',
    icon: 'Rocket',
    sections: [
      COMMON_BASIC_DETAILS,
      {
        id: 'startup-path',
        title: 'SECTION 2 — Choose Your Path',
        fields: [
          { 
            id: 'startupPathChoice', 
            label: 'Choose your path', 
            type: 'radio', 
            options: ['Join Founders Circle', 'Become a Founder', 'I Have a Startup & Need Support', 'Work With a Startup'],
            required: true
          }
        ]
      },
      {
        id: 'founders-circle',
        title: 'PATH 1 — Join Founders Circle',
        fields: [
          { id: 'whyJoinCircle', label: 'Why do you want to join Founders Circle?', type: 'textarea' },
          { id: 'interests', label: 'Your interests', type: 'multi-select', options: ['Startup', 'AI', 'Research', 'Tech', 'Business', 'Design', 'Funding', 'Other'] },
          { id: 'circleExpLevel', label: 'Experience Level', type: 'radio', options: ['Beginner', 'Intermediate', 'Experienced'] },
          { id: 'valueContribution', label: 'What value can you contribute?', type: 'textarea' },
        ],
        condition: (v) => v.startupPathChoice === 'Join Founders Circle'
      },
      {
        id: 'become-founder',
        title: 'PATH 2 — Become a Founder',
        fields: [
          { id: 'startupIdeaTitle', label: 'Startup Idea Title', type: 'text', required: true },
          { id: 'problemSolving', label: 'Problem you are solving', type: 'textarea' },
          { id: 'startupSolution', label: 'Your solution', type: 'textarea' },
          { id: 'targetAudience', label: 'Target audience', type: 'text' },
          { id: 'startupIndustry', label: 'Industry', type: 'select', options: ['EdTech', 'HealthTech', 'AI', 'SaaS', 'Social', 'Other'] },
          { id: 'startupStage', label: 'Current stage', type: 'select', options: ['Idea', 'Prototype', 'Validation'] },
          { id: 'hasTeam', label: 'Do you have a team?', type: 'radio', options: ['Yes', 'No'] },
          { id: 'supportNeeded', label: 'What support do you need?', type: 'multi-select', options: ['Mentorship', 'Tech', 'Funding', 'Validation', 'Networking'] },
        ],
        condition: (v) => v.startupPathChoice === 'Become a Founder'
      },
      {
        id: 'have-startup',
        title: 'PATH 3 — I Have a Startup & Need Support',
        fields: [
          { id: 'startupName', label: 'Startup Name', type: 'text', required: true },
          { id: 'startupWebsite', label: 'Website / App link', type: 'url' },
          { id: 'startupStageSupport', label: 'Stage', type: 'select', options: ['Early', 'MVP', 'Growth', 'Scaling'] },
          { id: 'traction', label: 'What traction do you have?', type: 'textarea' },
          { id: 'startupSupportNeeded', label: 'Support needed', type: 'multi-select', options: ['Funding', 'Tech', 'Hiring', 'Marketing', 'Research', 'Partnerships'] },
        ],
        condition: (v) => v.startupPathChoice === 'I Have a Startup & Need Support'
      },
      {
        id: 'work-with-startup',
        title: 'PATH 4 — Work With a Startup',
        fields: [
          { id: 'candidateSkills', label: 'Skills', type: 'multi-select', options: ['Frontend', 'Backend', 'AI', 'UI/UX', 'Marketing', 'Research', 'Business'] },
          { id: 'candidateExpLevel', label: 'Experience level', type: 'radio', options: ['Beginner', 'Intermediate', 'Advanced'] },
          { id: 'availability', label: 'Availability', type: 'select', options: ['Part-time', 'Full-time', 'Internship', 'Project based'] },
          { id: 'whyWorkWithStartups', label: 'Why do you want to work with startups?', type: 'textarea' },
        ],
        condition: (v) => v.startupPathChoice === 'Work With a Startup'
      }
    ]
  },
  {
    id: 'research',
    label: 'Research',
    description: 'Deep dive into scientific exploration',
    icon: 'Microscope',
    sections: [
      COMMON_BASIC_DETAILS,
      {
        id: 'research-path',
        title: 'SECTION 2 — Choose Your Research Path',
        fields: [
          { 
            id: 'researchPathChoice', 
            label: 'Choose your path', 
            type: 'radio', 
            options: ['Join Research Projects', 'Suggest a New Research Idea', 'Learn Research'],
            required: true
          }
        ]
      },
      {
        id: 'join-research',
        title: 'PATH 1 — Join Research Projects',
        fields: [
          { id: 'researchDomains', label: 'Research domains interested in', type: 'multi-select', options: ['AI', 'Quantum', 'HealthTech', 'Bioinformatics', 'Computer Vision', 'NLP', 'Systems', 'Other'] },
          { id: 'researchSkills', label: 'Skills (Python, ML, Math, etc.)', type: 'text' },
          { id: 'researchExpLevel', label: 'Experience level', type: 'radio', options: ['Beginner', 'Intermediate', 'Advanced'] },
          { id: 'hasWorkedOnResearch', label: 'Have you worked on research before?', type: 'radio', options: ['Yes', 'No'] },
          { id: 'researchLinks', label: 'Research links / papers', type: 'text', condition: (v) => v.hasWorkedOnResearch === 'Yes' },
          { id: 'preferredContribution', label: 'Preferred contribution', type: 'multi-select', options: ['Coding', 'Paper writing', 'Experiments', 'Dataset', 'UI', 'Literature review'] },
          { id: 'researchAvailability', label: 'Availability (hours/week)', type: 'text' },
          { id: 'whyJoinResearch', label: 'Why do you want to join research?', type: 'textarea' },
        ],
        condition: (v) => v.researchPathChoice === 'Join Research Projects'
      },
      {
        id: 'suggest-research',
        title: 'PATH 2 — Suggest a New Research Idea',
        fields: [
          { id: 'researchIdeaTitle', label: 'Research idea title', type: 'text', required: true },
          { id: 'researchProblem', label: 'Problem statement', type: 'textarea', required: true },
          { id: 'researchApproach', label: 'Proposed approach', type: 'textarea', required: true },
          { id: 'isInterdisciplinary', label: 'Is this interdisciplinary?', type: 'radio', options: ['Yes', 'No'] },
          { id: 'researchSupport', label: 'Support needed', type: 'multi-select', options: ['Mentors', 'Team', 'Compute', 'Dataset', 'Publication guidance'] },
        ],
        condition: (v) => v.researchPathChoice === 'Suggest a New Research Idea'
      },
      {
        id: 'learn-research',
        title: 'PATH 3 — Learn Research',
        fields: [
          { id: 'researchLevel', label: 'Current level', type: 'select', options: ['No idea', 'Basic ML', 'Coding', 'Already exploring research'] },
          { id: 'researchGoal', label: 'Goal', type: 'select', options: ['Publish paper', 'Projects', 'Career', 'Startup', 'Curiosity'] },
        ],
        condition: (v) => v.researchPathChoice === 'Learn Research'
      }
    ]
  },
  {
    id: 'idontknow',
    label: "I Don't Know",
    description: 'Get guidance on your career path',
    icon: 'HelpCircle',
    sections: [
      {
        id: 'basic-details-idk',
        title: 'SECTION 1 – Basic Details',
        fields: [
          { id: 'fullName', label: 'Full Name', type: 'text', required: true },
          { id: 'email', label: 'Email', type: 'email', required: true },
          { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
          { id: 'city', label: 'City', type: 'text', required: true },
          { 
            id: 'currentStatus', 
            label: 'Current Status', 
            type: 'select', 
            options: ['School Student', 'UG Student', 'PG / MTech', 'Working Professional', 'Other'],
            required: true 
          },
        ]
      },
      {
        id: 'current-situation',
        title: 'SECTION 2 – Current Situation',
        fields: [
          { id: 'currentDoing', label: 'What are you currently studying / doing?', type: 'text' },
          { id: 'currentYear', label: 'Which year / level are you in?', type: 'text' },
          { id: 'stream', label: 'What is your stream / domain?', type: 'text' },
        ]
      },
      {
        id: 'confusion-mapping',
        title: 'SECTION 3 – Confusion Mapping',
        fields: [
          { 
            id: 'confusions', 
            label: 'What confuses you the most right now?', 
            type: 'multi-select', 
            options: [
              'I don’t know which field to choose',
              'I don’t know how to start a startup',
              'I don’t have practical skills',
              'I want research exposure but don’t know how',
              'I feel lost about career direction',
              'I don’t have the right network',
              'I lack confidence',
              'Everything feels unclear'
            ] 
          },
          { 
            id: 'attraction', 
            label: 'When you think about your future, what attracts you more?', 
            type: 'radio', 
            options: ['Tech / Coding', 'Startup / Business', 'Research / Innovation', 'Job stability', 'I’m not sure'] 
          },
          { 
            id: 'missing', 
            label: 'What do you feel you are missing right now?', 
            type: 'multi-select', 
            options: ['Skills', 'Guidance', 'Mentorship', 'Team', 'Clarity', 'Exposure', 'Discipline'] 
          },
        ]
      },
      {
        id: 'intent-level',
        title: 'SECTION 4 – Intent Level',
        fields: [
          { id: 'seriousness', label: 'How serious are you?', type: 'radio', options: ['Just exploring', 'Somewhat serious', 'Fully committed to change'] },
          { id: 'hoursPerWeek', label: 'How many hours per week can you dedicate?', type: 'radio', options: ['2–4 hours', '5–8 hours', '10+ hours'] },
          { id: 'orientation', label: 'Are you willing to attend a structured orientation session?', type: 'radio', options: ['Yes', 'Maybe', 'Not sure'] },
        ]
      },
      {
        id: 'mindset',
        title: 'SECTION 5 – Mindset Filter',
        fields: [
          { id: 'whyJoin', label: 'Why do you want to join NX Research?', type: 'textarea' },
          { id: 'successMeaning', label: 'What does success mean to you?', type: 'textarea' },
        ]
      },
      {
        id: 'final-action',
        title: 'SECTION 6 – Final Action',
        fields: [
          { id: 'desiredAction', label: 'Would you like:', type: 'radio', options: ['1:1 clarity call', 'Join next orientation session', 'Just receive details'] },
        ]
      }
    ]
  }
];
