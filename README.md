# Blueprint — System Design Roadmap

<img width="1902" height="901" alt="Screenshot 2026-11-01 231716" src="https://github.com/user-attachments/assets/6589e906-5ebd-4564-af4c-aa2691331c5a" />


Blueprint is a small Go web app for learning system design. It organizes the journey from networking and databases through distributed systems, reliability, architecture patterns, and practical design exercises. Each roadmap topic links to a curated learning resource, and completed topics are saved in the browser.

## Run locally

```bash
go run main.go
```

Open [http://localhost:8080](http://localhost:8080) for the home page or [http://localhost:8080/courses](http://localhost:8080/courses) for the full roadmap.

## Project structure

- `main.go` serves the pages and static assets using Go's standard `net/http` package.
- `static/` contains the website pages, styles, and roadmap progress/search behavior.
