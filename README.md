# Diabetes Detector AI
**Diabetes Detector AI** is a lightweight, intelligent web application that analyzes medical prescriptions and lab reports to detect signs of diabetes using OCR and AI. Users simply upload their report photo, and the system determines the likelihood of diabetes based on extracted data — categorized into RED, YELLOW, or GREEN status levels.
💡 Bonus: If the report lacks critical data (e.g., glucose levels), the AI will prompt the user to provide missing information.

📷 Upload your report → 🧠 AI reads and analyzes it → 🚦 Get a health status (RED / YELLOW / GREEN)

---


## Diagram


![diabetes-detector drawio](https://github.com/user-attachments/assets/9e7b05ad-3c58-4b78-ac51-4d14a9d35add)


---

## 🚀 Features

- ✅ Upload medical reports as images
- ✅ Automatically extracts text (OCR) using Tesseract.js
- ✅ Sends smart prompts to a free Hugging Face AI model for diagnosis
- ✅ Asks for missing information if needed
- ✅ Saves and fetches report history



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
