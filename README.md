# GitHub User Activity CLI

A simple command-line application that fetches
the recent public activity of a GitHub user.

## Usage

```bash
node app.js <username>
```

Example:

```bash
node app.js subagja87
```

## Features
- Handle invalid usernames
- Handle users with no recent activity
- Handle GitHub API errors
- Fetch GitHub user activity
- Display activity in terminal

## API
GitHub Events API:
https://api.github.com/users/<username>/events

## Project URL
https://roadmap.sh/projects/github-user-activity