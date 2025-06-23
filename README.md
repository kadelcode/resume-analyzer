# AI-Powered Resume Analyzer

A web app that allows users to upload their resumes in PDF format and receive personalized, AI-generated feedback using large language models (LLMs).

Built with **Next.js**, **LangChain**, **Together.ai**, and **PDF.js**.

---

## Features

- Upload and parse PDF resumes
- Analyze content using Together.ai (Mixtral model)
- Bullet-point feedback on resume clarity, skills, formatting, and relevance
- Suggestions tailored to job-seeking best practices

---

## Tech Stack

| Layer           | Tech                             |
|-----------------|----------------------------------|
| Frontend        | Next.js App Router + TailwindCSS |
| File Parsing    | PDF.js (via `pdfjs-dist`)        |
| LLM             | LangChain + Together.ai          |
| Hosting         | Vercel (recommended)             |

---

## Getting Started

### 1. Clone the repo
```
git clone https://github.com/kadelcode/resume-analyzer.git
cd resume-analyzer
```

### 2. Install dependencies
```
npm install
```

### 3. Add your Together.ai API key
Create a ```.env.local``` file:
```
TOGETHER_API_KEY=your_together_api_key_here
```
You can get a free API key at [https://api.together.xyz](https://api.together.xyz)

### 4. Run the development server
```
npm run dev
```
Visit http://localhost:3000 to upload a resume and see feedback

---

## Project Structure
```
.
├── app
│   ├── api
│   │   └── analyze
│   │       └── route.ts
│   └── page.tsx
│   └── components/ 
├── lib
│   └── pdfParser.ts
├── public
├── styles
├── .env.local
├── package.json
└── README.md

```

---

## Example Prompt
You're a resume reviewer. Analyze the resume below and give personalized feedback as clear bullet points using “•” instead of “*”.

---

## To Do/Improvements
- Add DOCX support using ```mammoth.js```
- Match resume to uploaded Job Descriptions
- Export feedback to PDF
- User authentication + saved analysis history

---

## Free Tier Tips
- Together.ai gives you free dialy tokens
- All parsing and UI happend client-side for best performance

---

## License
MIT License - free to use and modify

---

## Acknowledgements
- [Together.ai](https://api.together.xyz/)
- [LangChain](https://www.langchain.com/)
- [PDF.js](https://mozilla.github.io/pdf.js/)