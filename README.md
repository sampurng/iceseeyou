## ICEseeyou
**Project Overview:**

ICEseeyou is a real-time, crowdsourced web application that allows users to track and report ICE (Immigration and Customs Enforcement) activity. The platform integrates user-submitted reports, AI-driven credibility scoring, and a heatmap to visualize ICE activity trends. It also includes a legal chatbot to assist users with immigration-related inquiries. This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Tech Stack
Our project is built using the following technologies:
| **Category**     | **Technology** |
|-----------------|---------------|
| **Frontend**   | [Next.js](https://nextjs.org) (React-based framework) |
| **Backend**    | [Supabase](https://supabase.com) (PostgreSQL & authentication) |
| **AI & Data Processing** | OpenAI API (Gen AI for credibility scoring) |
| **Mapping & Visualization** | Heatmap.js & Leaflet.js |
| **Deployment** | [Vercel](https://vercel.com) |

## Getting Started
**Prequisites**

Make sure you have Node.js installed. If not, install it from here.


**Installation**

Clone the repository: 
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/ICEseeyou.git
cd ICEseeyou
```


**Run the development server:**

Start the app in development mode:

```bash
npm install  # Install dependencies
npm run dev  # Start development server
```
or

```bash
yarn install
yarn dev
```
Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


**Environment Variables**

Create a ```.env.local ``` file and add the following environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
Note: Replace values with your actual credentials.
```

Note: Replace values with your actual credentials.


**Why Vercel? 🚀**

We use Vercel to deploy our Next.js app because it offers:

✅ Fast & automatic deployments

✅ Optimized for Next.js (with built-in SSR & caching)

To deploy, simply run:
```bash
vercel
```


## Application Workflow
![Application Workflow](https://github.com/user-attachments/assets/7ff0c565-2475-4b2b-a637-b4517f41140b)

Every contribution strengthens the map.

🔥 Share data, support your community! 🚀

