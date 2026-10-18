// Studywell modular source — keep this file loaded after its dependencies.

document.addEventListener('DOMContentLoaded', () => {
lucide.createIcons();
initRadarChart();
renderAssessmentQuestions();
renderExams();
renderSubjects();
renderTopics();
runIntervalSimulator();
update15RatioKPIs();
startExamCountdowns();
});

function switchTab(tabId) {
document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
document.getElementById(`tab-${tabId}`).classList.remove('hidden');
document.querySelectorAll('.nav-btn').forEach(btn => {
btn.className = "nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800/40";
});
const activeBtn = document.getElementById(`nav-${tabId}`);
if (activeBtn) {
activeBtn.className = "nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 bg-slate-800/80 text-white shadow-sm border border-slate-700/50";
}
}

function openModal(modalId) {
document.getElementById(modalId).classList.remove('hidden');
document.getElementById(modalId).classList.add('flex');
}

function closeModal(modalId) {
document.getElementById(modalId).classList.add('hidden');
document.getElementById(modalId).classList.remove('flex');
}

function initRadarChart() {
const ctx = document.getElementById('radarChart').getContext('2d');
radarChartInstance = new Chart(ctx, {
type: 'radar',
data: {
labels: ['Deep processing', 'Self regulation', 'Self-management', 'Mindset', 'Retrieval'],
datasets: [{
label: 'Skill Profile',
data: [
state.assessmentScores['Deep processing'],
state.assessmentScores['Self-regulation'],
state.assessmentScores['Self-management'],
state.assessmentScores['Mindset'],
state.assessmentScores['Retrieval']
],
backgroundColor: 'rgba(236, 72, 153, 0.25)',
borderColor: '#ec4899',
borderWidth: 2,
pointBackgroundColor: '#f472b6',
pointBorderColor: '#fff',
pointHoverBackgroundColor: '#fff',
pointHoverBorderColor: '#ec4899'
}]
},
options: {
responsive: true,
maintainAspectRatio: false,
scales: {
r: {
min: 0,
max: 4,
ticks: { display: false, stepSize: 1 },
grid: { color: 'rgba(255, 255, 255, 0.1)' },
angleLines: { color: 'rgba(255, 255, 255, 0.15)' },
pointLabels: {
color: '#94a3b8',
font: { size: 9, family: 'Plus Jakarta Sans' }
}
}
},
plugins: { legend: { display: false } }
}
});
}

function openModalWithSubject() {
if (state.activeSubjectDetail) {
document.getElementById('topic-subject-select').value = state.activeSubjectDetail;
}
openModal('add-topic-modal');
}
