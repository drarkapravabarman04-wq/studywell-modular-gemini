// Studywell modular source — keep this file loaded after its dependencies.

function handleAddExam(e) {
e.preventDefault();
const tag = document.getElementById('exam-tag-input').value;
const title = document.getElementById('exam-title-input').value;
const dateVal = document.getElementById('exam-date-input').value;
const goal = document.getElementById('exam-goal-input').value;
const newExam = {
id: Date.now().toString(),
tag,
title,
date: new Date(dateVal).toISOString(),
targetGoal: goal
};
state.exams.push(newExam);
closeModal('add-exam-modal');
document.getElementById('add-exam-form').reset();
renderExams();
}

function removeExam(id) {
state.exams = state.exams.filter(e => e.id !== id);
renderExams();
}

function renderExams() {
const container = document.getElementById('exams-container');
container.innerHTML = state.exams.map(exam => `
                <div class="card-dark rounded-3xl p-6 border border-slate-800 flex flex-col justify-between relative group">
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <span class="bg-rose-950/80 text-rose-300 border border-rose-800/50 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                                ${exam.tag}
                            </span>
                            <button onclick="removeExam('${exam.id}')" class="text-slate-600 hover:text-rose-400 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>

                        <h3 class="font-bold text-lg text-white leading-snug mb-3">${exam.title}</h3>
                        <div class="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
                            <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-500"></i> ${new Date(exam.date).toDateString()}
                        </div>

                        
                        <div class="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 grid grid-cols-4 gap-2 text-center my-4">
                            <div>
                                <div class="text-2xl font-black text-rose-400 countdown-days" data-date="${exam.date}">00</div>
                                <div class="text-[9px] font-bold text-slate-500 uppercase">DAYS</div>
                            </div>
                            <div>
                                <div class="text-2xl font-black text-white countdown-hours" data-date="${exam.date}">00</div>
                                <div class="text-[9px] font-bold text-slate-500 uppercase">HOURS</div>
                            </div>
                            <div>
                                <div class="text-2xl font-black text-white countdown-mins" data-date="${exam.date}">00</div>
                                <div class="text-[9px] font-bold text-slate-500 uppercase">MINS</div>
                            </div>
                            <div>
                                <div class="text-2xl font-black text-sky-400 countdown-secs" data-date="${exam.date}">00</div>
                                <div class="text-[9px] font-bold text-slate-500 uppercase">SECS</div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-2 pt-4 border-t border-slate-800/80 text-xs">
                        <div class="flex justify-between text-slate-400">
                            <span>Target Goal:</span>
                            <strong class="text-amber-300 font-bold">${exam.targetGoal}</strong>
                        </div>
                        <div class="flex justify-between text-slate-400">
                            <span>Required Velocity:</span>
                            <strong class="text-sky-400 font-bold">~0.4 topics/day</strong>
                        </div>
                    </div>
                </div>
            `).join('');
lucide.createIcons();
updateCountdowns();
}

function startExamCountdowns() {
updateCountdowns();
setInterval(updateCountdowns, 1000);
}

function updateCountdowns() {
const now = new Date().getTime();
if (state.exams.length > 0) {
const nextExam = state.exams[0];
const diff = new Date(nextExam.date).getTime() - now;
const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
document.getElementById('overview-days-countdown').innerText = days;
document.getElementById('overview-next-exam-title').innerText = nextExam.title;
}
document.querySelectorAll('.countdown-days').forEach(el => {
const target = new Date(el.getAttribute('data-date')).getTime();
const diff = target - now;
if (diff <= 0) {
el.innerText = '00';
return;
}
const d = Math.floor(diff / (1000 * 60 * 60 * 24));
el.innerText = d < 10 ? `0${d}` : d;
});
document.querySelectorAll('.countdown-hours').forEach(el => {
const target = new Date(el.getAttribute('data-date')).getTime();
const diff = target - now;
if (diff <= 0) { el.innerText = '00'; return; }
const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
el.innerText = h < 10 ? `0${h}` : h;
});
document.querySelectorAll('.countdown-mins').forEach(el => {
const target = new Date(el.getAttribute('data-date')).getTime();
const diff = target - now;
if (diff <= 0) { el.innerText = '00'; return; }
const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
el.innerText = m < 10 ? `0${m}` : m;
});
document.querySelectorAll('.countdown-secs').forEach(el => {
const target = new Date(el.getAttribute('data-date')).getTime();
const diff = target - now;
if (diff <= 0) { el.innerText = '00'; return; }
const s = Math.floor((diff % (1000 * 60)) / 1000);
el.innerText = s < 10 ? `0${s}` : s;
});
}
