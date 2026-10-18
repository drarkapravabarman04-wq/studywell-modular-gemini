# Studywell — modular version

This version separates the original single-file dashboard into smaller files without intentionally changing its behavior.

## Files
- `index.html` — page structure and script loading order
- `css/styles.css` — custom styling
- `js/state.js` — initial app data and the 30-question, five-pillar assessment question bank
- `js/assessment.js` — assessment rendering, scoring, and radar chart score updates
- `js/core.js` — spaced-repetition calculation, simulator, review handling, shared chart variable
- `js/curriculum.js` — topic and subject management/rendering
- `js/ics.js` — learning-technique theory/practice session logging and ratio KPIs
- `js/exams.js` — exam target management and countdowns
- `js/app.js` — navigation, modal helpers, radar chart initialization, and startup

## Run it
Open `index.html` in a browser. The app still uses the same external CDN dependencies (Tailwind, Lucide, Chart.js, and Google Fonts) as the original, so an internet connection is needed for those libraries.

## Important note
The current app data is in-memory JavaScript state; this refactor does not add database storage or login/persistence.
