// Studywell modular source — keep this file loaded after its dependencies.

const state = {
activeSubjectDetail: null,
activeReviewTopicId: null,
subjects: [
{ id: 'anatomy', name: 'Anatomy', color: 'bg-rose-400', icon: 'crosshair', topicsCount: 0, units: 0, due: 0 },
{ id: 'physiology', name: 'Physiology', color: 'bg-emerald-400', icon: 'activity', topicsCount: 0, units: 0, due: 0 },
{ id: 'biochemistry', name: 'Biochemistry', color: 'bg-purple-400', icon: 'diamond', topicsCount: 0, units: 0, due: 0 }
],
topics: [
{
id: '1',
subject: 'Anatomy',
chapter: 'Upper Limb',
name: 'Brachial Plexus & Branches',
state: 'retention',
lastRating: 'good',
interval: 3,
nextReviewDate: new Date(Date.now() - 86400000).toISOString(),
relearningSession: false
},
{
id: '2',
subject: 'Physiology',
chapter: 'Cardiovascular',
name: 'Cardiac Cycle & Pressure Curves',
state: 'mastered',
lastRating: 'perfect',
interval: 8,
nextReviewDate: new Date(Date.now() + 2 * 86400000).toISOString(),
relearningSession: false
}
],
icsData: {
SIR: { theory: 0.5, practice: 0 },
Interleaving: { theory: 0, practice: 0 },
'Marginal Gains': { theory: 0, practice: 0 }
},
assessmentScores: {
'Deep processing': 3,
'Self-regulation': 2,
'Self-management': 2,
'Mindset': 3,
'Retrieval': 2
},
history: [
{
title: 'S-I-R Framework (Spaced Repetition, Interleaving, Retrieval)',
tag: 'SIR',
type: 'Theory',
date: 'Oct 18',
mins: 30
}
],
exams: [
{
id: '1',
tag: 'ALL 3 SUBJECTS (MBBS 1ST PROF)',
title: '1st Professional University Examinations (Theory & Practical)',
date: '2027-02-11T00:00:00',
targetGoal: 'Distinction (>75%)'
},
{
id: '2',
tag: 'HUMAN ANATOMY',
title: 'Anatomy 1st Internal Assessment (Upper Limb, Thorax & General Histology)',
date: '2026-11-03T00:00:00',
targetGoal: '>70%'
},
{
id: '3',
tag: 'MEDICAL PHYSIOLOGY',
title: 'Physiology & Biochemistry Mid-Term Terminal Exam',
date: '2026-11-17T00:00:00',
targetGoal: '>75%'
}
]
};

const assessmentData = [
{
category: 'Deep processing',
icon: '⤨',
questions: [
"When you learn a new idea, how often do you explain it in your own words without looking at the source?",
"How often do you ask yourself why a process works, rather than memorizing only its steps?",
"How often do you connect a new concept to something you already learned in another topic?",
"How often do you compare similar concepts and identify what makes them different?",
"How often do you create your own example, diagram, or explanation to make an idea clearer?",
"How often do you try to apply a concept to an unfamiliar question or clinical-style scenario?"
]
},
{
category: 'Self-regulation',
icon: '◉',
questions: [
"Before a study session, how often do you set a specific learning goal for it?",
"During study, how often do you pause to check whether you can explain the material from memory?",
"How often do you notice when you are only recognizing familiar notes instead of truly recalling the idea?",
"When a study approach is not working, how often do you deliberately switch to another strategy?",
"After a quiz or study session, how often do you review what your mistakes reveal about your understanding?",
"How often do you use feedback, answers, or explanations to decide what to study next?"
]
},
{
category: 'Self-management',
icon: '◷',
questions: [
"How often do you choose your most important study task before easier, less important tasks?",
"How often do you break a large topic into smaller tasks that fit into available study sessions?",
"How often do you estimate how long a task will take and compare that estimate with the actual time?",
"How often do you protect a study period from phone, social media, or other interruptions?",
"When urgent work appears, how often do you make a realistic plan to return to important long-term work?",
"Across the week, how often do you make time to practise techniques you have already learned?"
]
},
{
category: 'Mindset',
icon: '♧',
questions: [
"When a topic is difficult, how often do you treat difficulty as information about what to practise next?",
"After making a mistake, how often do you look for a specific lesson you can use on the next attempt?",
"How often do you believe your ability in a subject can improve through effective practice and feedback?",
"When your first approach fails, how often do you try a different approach instead of deciding you cannot learn it?",
"How often do you ask for help or clarification when you have worked on a problem and remain stuck?",
"How often do you judge progress by your own improvement and process, rather than only by comparison with others?"
]
},
{
category: 'Retrieval',
icon: '↻',
questions: [
"Before reopening notes, how often do you try to recall what you learned in a previous session?",
"How often do you use closed-book questions, flashcards, blank-page recall, or oral explanation to test yourself?",
"How often do you revisit a topic after a delay instead of relying on one long study session?",
"When you practise recall, how often do you attempt an answer before checking the correct answer?",
"How often do you mix questions from different topics so you must decide which idea or method applies?",
"After checking an answer, how often do you retry the missed idea from memory rather than just rereading it?"
]
}
];
