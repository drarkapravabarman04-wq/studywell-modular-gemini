// Studywell modular source — keep this file loaded after its dependencies.

function renderAssessmentQuestions() {
const container = document.getElementById('assessment-questions-container');
const options = ["Never", "Sometimes", "Usually", "Almost always"];
let html = '';
assessmentData.forEach((cat, catIdx) => {
html += `
                    <div class="space-y-4 pt-2">
                        <div class="flex items-center gap-2 pb-2 border-b border-slate-800 text-sm font-bold text-teal-300">
                            <span>${cat.icon}</span> <span>${cat.category}</span>
                            <span class="text-[10px] text-slate-500 font-normal">(${cat.questions.length} questions)</span>
                        </div>
                `;
cat.questions.forEach((q, qIdx) => {
const fieldName = `q_${catIdx}_${qIdx}`;
html += `
                        <div class="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                            <p class="font-medium text-slate-200 text-xs">${qIdx + 1}. ${q}</p>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                                ${options.map((opt, optVal) => `
<label class="flex items-center gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800 hover:border-slate-700 cursor-pointer text-[11px] text-slate-300 transition">
<input type="radio" name="${fieldName}" value="${optVal + 1}" class="text-purple-500 focus:ring-purple-500 bg-slate-900 border-slate-700" ${optVal === 2 ? 'checked' : ''}>
<span>${opt}</span>
</label>
`).join('')}
                            </div>
                        </div>
                    `;
});
html += `</div>`;
});
container.innerHTML = html;
}

function submitAssessment() {
const categoryScores = {
'Deep processing': 0,
'Self-regulation': 0,
'Self-management': 0,
'Mindset': 0,
'Retrieval': 0
};
assessmentData.forEach((cat, catIdx) => {
let catSum = 0;
cat.questions.forEach((q, qIdx) => {
const selected = document.querySelector(`input[name="q_${catIdx}_${qIdx}"]:checked`);
const val = selected ? parseInt(selected.value) : 3;
catSum += val;
});
categoryScores[cat.category] = Math.round((catSum / cat.questions.length) * 10) / 10;
});
state.assessmentScores = categoryScores;
if (radarChartInstance) {
radarChartInstance.data.datasets[0].data = [
categoryScores['Deep processing'],
categoryScores['Self-regulation'],
categoryScores['Self-management'],
categoryScores['Mindset'],
categoryScores['Retrieval']
];
radarChartInstance.update();
}
const todayStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
document.getElementById('assessment-last-completed').innerText = `Last completed · ${todayStr}`;
closeModal('assessment-modal');
}
