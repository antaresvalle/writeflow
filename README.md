# Project Title

WriteFlow

## Overview

**WriteFlow** is an app created to help writers monitor and improve their writing habits by tracking word count, setting daily or weekly writing goals, and providing data on their progress.

### Problem Space

Being a writer myself and knowing several other writers, I came to the conclusion that many writers would like to have a tool that lets them know if they are achieving their writing goals.
There are already other tools that offer word counting, but they are expensive and complex, and they lack a visual representation to quickly assess the writing process.

With **WriteFlow** I'm looking to create a tool that is free, simple, and can generate value and useful information to writers in a more streamlined way. **WriteFlow** is a tool designed to be integrated into the writer's workflow, not the other way around.

### User Profile

- Writers, authors, journalists, and content creators who use Google Docs for their writing and need a simple way to track progress.

### Features

- **Google Docs Integration:** Secure, easy to set up and use.
- **Word Count:** Word count for a specific document to monitor daily/weekly output.
- **Goal Setting:** Users can set daily or weekly word count goals and track their progress.
- **Analytics and Progress Visualization:** Visual representation of progress to track word count over time.
- **Reminders:** Browser notifications to help users stay on track.

## Implementation

### Tech Stack

- **Frontend:**
  - React.js
  - Chakra UI
  - Chart.js
- **Backend:**
  - Node.js with Express for handling server-side logic and API requests.
- **APIs:**
  - **Google OAuth 2.0** for authentication.
  - **Google Drive API** to retrieve documents and word count from Google Docs.

### APIs

- **Google Drive API:** Fetches list of Google Docs and their metadata.
- **Google Docs API:** Retrieves the content of Google Docs, used to calculate word count.
