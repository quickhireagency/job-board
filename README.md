[README_QuickHire_JobBoard_v8.0.0_Alpha_CLEAN.md](https://github.com/user-attachments/files/28161324/README_QuickHire_JobBoard_v8.0.0_Alpha_CLEAN.md)
# QuickHire™ Job Board v8.0.0 Alpha — Clean Performance Build

Last Updated: 2026-05-22T19:32:23Z UTC  
Developed by Cook Technology Services  
Copyright © 2025 Cook Services Company, LLC | All Rights Reserved.

## Files in this build

- `QuickHire_JOB_BOARD_BACKEND_v8.0.0_Alpha_CLEAN.gs`
- `index_v8.0.0_Alpha_CLEAN.html`

## What changed

This is a clean v8.0.0 Alpha build using the actual uploaded backend and the actual uploaded `index.html`.

This is not a bottom-only patch file. The backend file is the full Apps Script backend with the existing canonical functions preserved and the public job-board listing flow updated in place.

## Job board performance fix

The public job board no longer tries to send the full Job Board sheet to the browser.

The new flow is:

1. Initial page load requests 100 lightweight job cards.
2. The page quietly prefetches more jobs in the background until 500 are loaded.
3. The user can scroll or click Load More Jobs to fetch another 100 at a time.
4. Full job descriptions/details still load only through `get_job` when a user selects a job.

## Backend changes

The following existing functions were updated in place:

- `qhPublicGet_`
- `qhListJobs_`

The following helper functions were added cleanly once:

- `qhJobFacets_`
- `qhFacetAdd_`
- `qhJobIndexes_`
- `qhJobIsPublicLive_`
- `qhJobRowMatchesPublicFilters_`
- `qhJobSearchHaystack_`
- `qhJobSummaryFromRow_`

The backend still keeps the existing canonical Apps Script router pattern:

- `doGet`
- `doPost`
- `qhPublicGet_`
- `qhPublicPost_`
- existing admin, employer, candidate, application, Stripe, resume, EEO, and logging functions

No new Google Sheet tabs are required.

## Frontend changes

The homepage `index.html` now uses:

- 100-job first load
- automatic background prefetch up to 500 loaded jobs
- infinite scroll inside the job list panel
- Load More Jobs fallback button
- separate `job_facets` call for category/work-arrangement dropdowns
- full job detail loading remains separate through `get_job`

## Install

### Backend

1. Open the QuickHire Apps Script backend.
2. Replace the full existing backend file with `QuickHire_JOB_BOARD_BACKEND_v8.0.0_Alpha_CLEAN.gs`.
3. Save.
4. Deploy as a new web app version.
5. Keep the same web app URL if Apps Script allows it, or update `/config/config.js` if the URL changes.

### Frontend

1. Replace the job board homepage `index.html` with `index_v8.0.0_Alpha_CLEAN.html`.
2. Commit/push to the job board repo.
3. Hard refresh the site.
4. Confirm the first load shows jobs quickly and the Load More Jobs button appears when more jobs are available.

## Smoke tests

Use these after deployment:

- Open the job board homepage.
- Confirm only the first chunk loads immediately.
- Scroll the job list panel and confirm more jobs append.
- Click Load More Jobs and confirm another chunk loads.
- Search a keyword and confirm the list resets.
- Filter by state/city/category/work arrangement and confirm the list resets.
- Click a job and confirm the right detail panel still loads.
- Click Apply on an external job and confirm the external apply click still logs.
- Confirm `job_facets` populates category and work-arrangement filters.

## Notes

The location/radius filter remains a browser-side filter over currently loaded jobs. That preserves existing behavior without adding new schema or a geocoding backend table. A later production pass can move radius search fully server-side if latitude/longitude columns are added to the Job Board sheet.
