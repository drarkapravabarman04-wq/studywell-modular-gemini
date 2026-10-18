// Studywell modular source — keep this file loaded after its dependencies.

const MULTIPLIERS = {
poor: 0.4,
average: 0.7,
good: 1.7,
perfect: 2.5,
skip: 1.0
};

const INITIAL_INTERVALS = {
poor: 0,
average: 1,
good: 3,
perfect: 4
};

function calculateNextInterval(currentInterval, rating) {
if (rating === 'skip') return currentInterval;
const mult = MULTIPLIERS[rating] || 1.7;
const rawNext = currentInterval * mult;
const clamped = Math.min(180, Math.max(1, Math.round(rawNext)));
return clamped;
}

function runIntervalSimulator() {
const currentInt = parseFloat(document.getElementById('sim-current-interval').value) || 3;
const ratingRadio = document.querySelector('input[name="sim-rating"]:checked');
const rating = ratingRadio ? ratingRadio.value : 'good';
const nextInt = calculateNextInterval(currentInt, rating);
const mult = MULTIPLIERS[rating];
document.getElementById('sim-next-interval').innerText = rating === 'poor' && currentInt <= 1 ? 'Later today' : `${nextInt} ${nextInt === 1 ? 'day' : 'days'}`;
let exp = '';
if (rating === 'skip') {
exp = 'Skip action selected: <strong class="text-white">Preserves current interval (' + currentInt + ' days)</strong> and rating. Topic rescheduled for next session.';
} else {
const raw = (currentInt * mult).toFixed(1);
exp = `Multiplier applied: <strong class="text-white">×${mult}</strong>. Calculated raw: <span class="text-slate-300">${raw}</span> days, rounded to nearest whole day (clamped 1–180 days).`;
}
document.getElementById('sim-formula-explanation').innerHTML = exp;
}

function openReviewModal(topicId) {
const topic = state.topics.find(t => t.id === topicId);
if (!topic) return;
state.activeReviewTopicId = topicId;
document.getElementById('modal-review-subject').innerText = topic.subject;
document.getElementById('modal-review-topic-name').innerText = topic.name;
document.getElementById('modal-review-current-interval').innerText = `${topic.interval} days`;
openModal('review-topic-modal');
}

function submitReview(rating) {
if (!state.activeReviewTopicId) return;
const topic = state.topics.find(t => t.id === state.activeReviewTopicId);
if (!topic) return;
const now = new Date();
if (rating === 'skip') {
const tomorrow = new Date(now.getTime() + 86400000);
topic.nextReviewDate = tomorrow.toISOString();
} else {
topic.lastRating = rating;
if (rating === 'poor') {
topic.interval = 1;
topic.relearningSession = true;
const laterToday = new Date(now.getTime() + 4 * 3600000);
topic.nextReviewDate = laterToday.toISOString();
topic.state = 'retention';
} else {
const nextInterval = calculateNextInterval(topic.interval, rating);
topic.interval = nextInterval;
topic.relearningSession = false;
const baseDate = new Date(topic.nextReviewDate) < now ? now : new Date(topic.nextReviewDate);
const nextDate = new Date(baseDate.getTime() + nextInterval * 86400000);
topic.nextReviewDate = nextDate.toISOString();
if (rating === 'perfect' && nextInterval >= 14) {
topic.state = 'mastered';
} else {
topic.state = 'retention';
}
}
}
closeModal('review-topic-modal');
state.activeReviewTopicId = null;
renderTopics();
renderSubjects();
if (state.activeSubjectDetail) {
renderSubjectDetail(state.activeSubjectDetail);
}
}

let radarChartInstance = null;
