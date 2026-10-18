// Studywell modular source — keep this file loaded after its dependencies.

function handleAddTopic(e) {
e.preventDefault();
const subject = document.getElementById('topic-subject-select').value;
const chapter = document.getElementById('topic-chapter-input').value;
const name = document.getElementById('topic-name-input').value;
const mastery = document.getElementById('topic-mastery-select').value;
const now = new Date();
let initialDays = INITIAL_INTERVALS[mastery] || 3;
let nextReviewDate;
if (mastery === 'poor') {
nextReviewDate = new Date(now.getTime() + 4 * 3600000).toISOString();
initialDays = 1;
} else {
nextReviewDate = new Date(now.getTime() + initialDays * 86400000).toISOString();
}
const newTopic = {
id: Date.now().toString(),
subject,
chapter,
name,
state: mastery === 'perfect' ? 'mastered' : 'retention',
lastRating: mastery,
interval: initialDays,
nextReviewDate: nextReviewDate,
relearningSession: mastery === 'poor'
};
state.topics.push(newTopic);
closeModal('add-topic-modal');
document.getElementById('add-topic-form').reset();
renderTopics();
renderSubjects();
if (state.activeSubjectDetail) {
renderSubjectDetail(state.activeSubjectDetail);
}
}

function openSubjectDetail(subjectName) {
state.activeSubjectDetail = subjectName;
switchTab('curriculum');
document.getElementById('curriculum-main-view').classList.add('hidden');
document.getElementById('curriculum-subject-detail-view').classList.remove('hidden');
renderSubjectDetail(subjectName);
}

function closeSubjectDetail() {
state.activeSubjectDetail = null;
document.getElementById('curriculum-subject-detail-view').classList.add('hidden');
document.getElementById('curriculum-main-view').classList.remove('hidden');
}

function renderSubjectDetail(subjectName) {
document.getElementById('detail-subject-badge').innerText = subjectName;
document.getElementById('detail-subject-title').innerText = `${subjectName} Curriculum Breakdown`;
const container = document.getElementById('subject-chapters-container');
const subjectTopics = state.topics.filter(t => t.subject === subjectName);
if (subjectTopics.length === 0) {
container.innerHTML = `
                    <div class="card-dark rounded-2xl p-12 text-center text-slate-400 text-xs border border-dashed border-slate-800">
                        No chapters or topics added yet for ${subjectName}. Click "Add Topic to Subject" to add your first chapter and topic!
                    </div>
                `;
return;
}
const grouped = {};
subjectTopics.forEach(t => {
const chap = t.chapter || 'General / Uncategorized';
if (!grouped[chap]) grouped[chap] = [];
grouped[chap].push(t);
});
const now = new Date();
container.innerHTML = Object.keys(grouped).map(chapName => `
                <div class="card-dark rounded-2xl p-5 border border-slate-800 space-y-3">
                    <div class="flex justify-between items-center pb-2 border-b border-slate-800">
                        <div class="flex items-center gap-2">
                            <i data-lucide="book-open" class="w-4 h-4 text-teal-400"></i>
                            <h3 class="font-bold text-white text-sm">${chapName}</h3>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
                            ${grouped[chapName].length} Topics
                        </span>
                    </div>

                    <div class="space-y-2 pt-1">
                        ${grouped[chapName].map(t => {
                            const isDue = new Date(t.nextReviewDate) <= now;
                            return `
<div class="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
<div>
<div class="text-xs text-slate-200 font-bold">${t.name}</div>
<div class="text-[10px] text-slate-400 mt-0.5">
Interval: <strong class="text-white">${t.interval}d</strong> · Rating: <span class="uppercase font-semibold text-teal-400">${t.lastRating}</span> · Next review: <span class="${isDue ? 'text-rose-400 font-bold' : 'text-slate-300'}">${new Date(t.nextReviewDate).toLocaleDateString()}</span>
</div>
</div>
<div class="flex items-center gap-2">
<button onclick="openReviewModal('${t.id}')" class="bg-teal-300 hover:bg-teal-200 text-slate-950 text-[11px] font-bold px-3 py-1.5 rounded-lg transition">
${isDue ? 'Review Now' : 'Rate Recall'}
</button>
<button onclick="deleteTopic('${t.id}')" class="text-slate-500 hover:text-rose-400 p-1"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
</div>
</div>
`;
                        }).join('')}
                    </div>
                </div>
            `).join('');
lucide.createIcons();
}

function renderSubjects() {
const counts = { Anatomy: 0, Physiology: 0, Biochemistry: 0 };
const dueCounts = { Anatomy: 0, Physiology: 0, Biochemistry: 0 };
const now = new Date();
state.topics.forEach(t => {
if (counts[t.subject] !== undefined) counts[t.subject]++;
if (new Date(t.nextReviewDate) <= now && dueCounts[t.subject] !== undefined) {
dueCounts[t.subject]++;
}
});
const overviewContainer = document.getElementById('overview-subjects-grid');
const curriculumContainer = document.getElementById('curriculum-subjects-grid');
const html = [
{ name: 'Anatomy', color: 'bg-rose-500', icon: '●' },
{ name: 'Physiology', color: 'bg-emerald-500', icon: '○' },
{ name: 'Biochemistry', color: 'bg-purple-500', icon: '◇' }
].map(sub => `
                <div class="card-dark card-dark-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full ${sub.color}"></span> ${counts[sub.name]} TOPICS</span>
                            ${dueCounts[sub.name] > 0 ? `<span class="bg-rose-950 text-rose-300 border border-rose-800/60 px-2 py-0.5 rounded-full">${dueCounts[sub.name]} DUE</span>` : ''}
                        </div>
                        <h3 class="font-bold text-lg text-white flex items-center gap-2">
                            <span>${sub.icon}</span> ${sub.name}
                        </h3>
                        <div class="text-xs text-slate-400 mt-1">${dueCounts[sub.name]} due for review today</div>
                    </div>
                    <button onclick="openSubjectDetail('${sub.name}')" class="text-xs font-semibold text-teal-400 hover:underline mt-6 flex items-center gap-1 self-start">
                        Open subject →
                    </button>
                </div>
            `).join('');
overviewContainer.innerHTML = html;
curriculumContainer.innerHTML = html;
}

function renderTopics() {
const container = document.getElementById('topics-container');
const overviewQueueContainer = document.getElementById('overview-review-queue');
document.getElementById('total-topics-count').innerText = `${state.topics.length} total`;
document.getElementById('readiness-total-topics').innerText = `Total MBBS 1st Year Topics: ${state.topics.length}`;
const now = new Date();
const dueTopics = state.topics.filter(t => new Date(t.nextReviewDate) <= now);
document.getElementById('stat-topics-review').innerText = dueTopics.length;
document.getElementById('due-count-badge').innerText = `${dueTopics.length} due today`;
document.getElementById('stat-topics-plan').innerText = state.topics.length;
let mastered = 0, retention = 0, unlearned = 0;
state.topics.forEach(t => {
if (t.state === 'mastered') mastered++;
else if (t.state === 'retention') retention++;
else unlearned++;
});
document.getElementById('count-mastered').innerText = mastered;
document.getElementById('count-retention').innerText = retention;
document.getElementById('count-unlearned').innerText = unlearned;
const total = state.topics.length || 1;
const pctM = Math.round((mastered / total) * 100);
const pctR = Math.round((retention / total) * 100);
const pctU = Math.round((unlearned / total) * 100);
document.getElementById('pct-mastered').innerText = pctM;
document.getElementById('pct-retention').innerText = pctR;
document.getElementById('pct-unlearned').innerText = pctU;
document.getElementById('bar-mastered').style.width = `${pctM}%`;
document.getElementById('bar-retention').style.width = `${pctR}%`;
document.getElementById('bar-unlearned').style.width = `${pctU}%`;
if (state.topics.length === 0) {
overviewQueueContainer.innerHTML = `
                    <div class="card-dark rounded-2xl p-8 border border-slate-800/80 text-center text-slate-400 text-xs">
                        Your upcoming reviews will show here. Add your first topic to begin adaptive spaced repetition!
                    </div>
                `;
} else {
const sortedTopics = [...state.topics].sort((a, b) => new Date(a.nextReviewDate) - new Date(b.nextReviewDate));
overviewQueueContainer.innerHTML = sortedTopics.slice(0, 5).map(t => {
const isDue = new Date(t.nextReviewDate) <= now;
return `
                        <div class="card-dark rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border border-slate-800/80 ${isDue ? 'border-l-4 border-l-rose-500' : ''}">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl ${isDue ? 'bg-rose-500/10 text-rose-400' : 'bg-teal-500/10 text-teal-400'} flex items-center justify-center font-bold text-sm shrink-0">
                                    <i data-lucide="${isDue ? 'alert-circle' : 'clock'}" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t.subject}</span>
                                        <span class="text-slate-600 text-[10px]">•</span>
                                        <span class="text-[10px] font-semibold text-teal-400">${t.chapter || 'General'}</span>
                                    </div>
                                    <h4 class="text-sm font-bold text-white mt-0.5">${t.name}</h4>
                                    <div class="text-[10px] text-slate-400 mt-0.5">
                                        Interval: <strong class="text-slate-200">${t.interval}d</strong> · Rating: <span class="uppercase text-teal-300 font-semibold">${t.lastRating || 'New'}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center gap-3 self-end md:self-auto">
                                <div class="text-right hidden sm:block">
                                    <div class="text-xs font-bold ${isDue ? 'text-rose-400' : 'text-slate-300'}">
                                        ${isDue ? 'DUE NOW' : new Date(t.nextReviewDate).toLocaleDateString()}
                                    </div>
                                    <div class="text-[10px] text-slate-500">Next adaptive review</div>
                                </div>
                                <button onclick="openReviewModal('${t.id}')" class="bg-teal-300 hover:bg-teal-200 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm">
                                    Review / Rate Recall
                                </button>
                            </div>
                        </div>
                    `;
}).join('');
}
if (state.topics.length === 0) {
container.innerHTML = `
                    <div class="card-dark rounded-2xl p-12 text-center text-slate-400 text-xs border border-dashed border-slate-800">
                        No topics yet. Add a unit, chapter or topic you want to study.
                    </div>
                `;
return;
}
container.innerHTML = state.topics.map(t => {
const isDue = new Date(t.nextReviewDate) <= now;
return `
                    <div class="card-dark rounded-xl p-4 flex items-center justify-between border border-slate-800/80">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">${t.subject}</span>
                                <span class="text-slate-600 text-[10px]">•</span>
                                <span class="text-[10px] font-semibold text-teal-400">${t.chapter || 'General'}</span>
                            </div>
                            <h4 class="text-sm font-bold text-white mt-0.5">${t.name}</h4>
                            <div class="text-[10px] text-slate-400 mt-1">
                                Interval: <strong class="text-slate-200">${t.interval} days</strong> · Next Review: <span class="${isDue ? 'text-rose-400 font-bold' : 'text-slate-300'}">${new Date(t.nextReviewDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <button onclick="openReviewModal('${t.id}')" class="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition">
                                Rate Recall
                            </button>
                            <span class="text-xs px-2.5 py-1 rounded-full font-semibold border ${
                                t.state === 'mastered' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                                t.state === 'retention' ? 'bg-sky-950 text-sky-300 border-sky-800' :
                                'bg-slate-800 text-slate-400 border-slate-700'
                            }">
                                ${t.state.toUpperCase()}
                            </span>
                            <button onclick="deleteTopic('${t.id}')" class="text-slate-500 hover:text-rose-400"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </div>
                `;
}).join('');
lucide.createIcons();
}

function deleteTopic(id) {
state.topics = state.topics.filter(t => t.id !== id);
renderTopics();
renderSubjects();
if (state.activeSubjectDetail) {
renderSubjectDetail(state.activeSubjectDetail);
}
}
