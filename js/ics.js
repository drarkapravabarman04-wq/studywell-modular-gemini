// Studywell modular source — keep this file loaded after its dependencies.

function logQuickTime(moduleKey, type) {
const inputId = moduleKey === 'SIR' ? 'sir-input-mins' : moduleKey === 'Interleaving' ? 'interleaving-input-mins' : 'marginal-input-mins';
const val = parseFloat(document.getElementById(inputId).value);
if (isNaN(val) || val <= 0) return;
const hours = val / 60;
state.icsData[moduleKey][type] += hours;
document.getElementById(inputId).value = '';
state.history.unshift({
title: moduleKey === 'SIR' ? 'S-I-R Framework (Spaced Repetition, Interleaving, Retrieval)' : moduleKey,
tag: moduleKey,
type: type === 'theory' ? 'Theory' : 'Practice',
date: 'Oct 18',
mins: Math.round(val)
});
update15RatioKPIs();
}

function handleLogSession(e) {
e.preventDefault();
const mod = document.getElementById('session-module-select').value;
const type = document.getElementById('session-type-select').value;
const mins = parseFloat(document.getElementById('session-mins-input').value);
if (isNaN(mins) || mins <= 0) return;
state.icsData[mod][type] += (mins / 60);
state.history.unshift({
title: mod === 'SIR' ? 'S-I-R Framework (Spaced Repetition, Interleaving, Retrieval)' : mod,
tag: mod,
type: type === 'theory' ? 'Theory' : 'Practice',
date: 'Oct 18',
mins: Math.round(mins)
});
closeModal('log-session-modal');
update15RatioKPIs();
}

function update15RatioKPIs() {
let totalTheory = 0;
let totalPractice = 0;
Object.keys(state.icsData).forEach(key => {
totalTheory += state.icsData[key].theory;
totalPractice += state.icsData[key].practice;
});
['SIR', 'Interleaving', 'Marginal Gains'].forEach(key => {
const domKey = key === 'SIR' ? 'sir' : key === 'Interleaving' ? 'interleaving' : 'marginal';
const t = state.icsData[key].theory;
const p = state.icsData[key].practice;
document.getElementById(`${domKey}-theory-time`).innerText = `${t.toFixed(1)}h`;
document.getElementById(`${domKey}-practice-time`).innerText = `${p.toFixed(1)}h`;
const ratio = t > 0 ? (p / t).toFixed(1) : '0.0';
document.getElementById(`${domKey}-ratio`).innerText = `1:${ratio}`;
const badge = document.getElementById(`badge-${domKey}`);
const tot = t + p;
if (tot >= 10) badge.innerText = `Advanced (${tot.toFixed(1)}h)`;
else if (tot >= 3) badge.innerText = `Competent (${tot.toFixed(1)}h)`;
else badge.innerText = `Novice (${tot.toFixed(1)}h)`;
});
document.getElementById('kpi-theory-hours').innerText = totalTheory.toFixed(1);
document.getElementById('kpi-practice-hours').innerText = totalPractice.toFixed(1);
document.getElementById('stat-ics-logged').innerText = `${(totalTheory + totalPractice).toFixed(1)}h`;
const currentRatio = totalTheory > 0 ? (totalPractice / totalTheory).toFixed(1) : '0';
document.getElementById('kpi-ratio').innerText = `1 : ${currentRatio}`;
const ratioPct = Math.min(100, Math.round(((totalPractice / (totalTheory * 5 || 1))) * 100));
document.getElementById('kpi-ratio-progress').style.width = `${ratioPct}%`;
document.getElementById('kpi-ratio-percent').innerText = `${ratioPct}% of target ratio reached`;
const targetPracticeNeeded = totalTheory * 5;
document.getElementById('kpi-target-practice').innerText = `${targetPracticeNeeded.toFixed(1)} hrs`;
const debt = totalPractice - targetPracticeNeeded;
const debtElem = document.getElementById('kpi-debt');
if (debt < 0) {
const debtMins = Math.abs(Math.round(debt * 60));
const debtH = Math.floor(debtMins / 60);
const debtM = debtMins % 60;
debtElem.innerText = `${debt.toFixed(1)} hrs`;
debtElem.className = "text-3xl font-black text-amber-400";
document.getElementById('kpi-debt-desc').innerText = `${debtH}h ${debtM}m practice needed to restore 1:5 ratio`;
} else {
debtElem.innerText = `+${debt.toFixed(1)} hrs`;
debtElem.className = "text-3xl font-black text-emerald-400";
document.getElementById('kpi-debt-desc').innerText = `1:5 ratio achieved! Excellent active application.`;
}
const historyContainer = document.getElementById('session-history-container');
historyContainer.innerHTML = state.history.map(h => `
                <div class="card-dark rounded-2xl p-4 flex items-center justify-between border border-slate-800">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl ${h.type === 'Theory' ? 'bg-amber-200/10 text-amber-300' : 'bg-sky-200/10 text-sky-300'} flex items-center justify-center font-bold text-lg">
                            ${h.type === 'Theory' ? '📖' : '⚡'}
                        </div>
                        <div>
                            <h4 class="text-sm font-bold text-white">${h.title}</h4>
                            <div class="text-[11px] text-slate-400 mt-0.5">${h.tag} · ${h.type} · ${h.date}</div>
                        </div>
                    </div>
                    <span class="text-xs font-bold text-slate-200 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">${h.mins} min</span>
                </div>
            `).join('');
}
