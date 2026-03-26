import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Prompt from './models/Prompt';
import Comment from './models/Comment';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

// ─── USERS ──────────────────────────────────────────────
const dummyUsers = [
    {
        username: 'aaryansahu',
        email: 'aaryan@promptopedia.dev',
        password: 'password123',
        bio: 'Creator of Promptopedia. Full-stack dev & AI enthusiast.',
        avatar: 'https://i.pravatar.cc/300?u=aaryansahu'
    },
    {
        username: 'sophiachen',
        email: 'sophia.chen@proton.me',
        password: 'password123',
        bio: 'UX Designer → Prompt Engineer. Making AI accessible.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop'
    },
    {
        username: 'marcusjdev',
        email: 'marcus.j@devmail.io',
        password: 'password123',
        bio: 'Backend engineer at a startup. TypeScript + Python.',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop'
    },
    {
        username: 'priya_creates',
        email: 'priya.k@outlook.com',
        password: 'password123',
        bio: 'Digital artist & Midjourney addict. DMs open for collabs!',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop'
    },
    {
        username: 'alexrwriter',
        email: 'alex.r.writer@gmail.com',
        password: 'password123',
        bio: 'Freelance copywriter. Using AI to 10x my workflow.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop'
    },
    {
        username: 'luna_ml',
        email: 'luna.ml.research@gmail.com',
        password: 'password123',
        bio: 'ML researcher at university. Exploring LLM capabilities.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop'
    },
    {
        username: 'devjordan',
        email: 'jordan.dev42@yahoo.com',
        password: 'password123',
        bio: 'React dev who discovered prompt engineering. No going back.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
    },
    {
        username: 'nikaart',
        email: 'nika.art.studio@gmail.com',
        password: 'password123',
        bio: 'Concept artist for games. Stable Diffusion is my second brain.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop'
    },
    {
        username: 'rahulcodes',
        email: 'rahul.codes.daily@gmail.com',
        password: 'password123',
        bio: 'CS student | Open source contributor | Prompt collector',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop'
    },
    {
        username: 'emmawriting',
        email: 'emma.writes.daily@outlook.com',
        password: 'password123',
        bio: 'Content strategist. Obsessed with Claude writing quality.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
    },
    {
        username: 'kai_pixels',
        email: 'kai.pixel.art@gmail.com',
        password: 'password123',
        bio: 'Pixel art + AI = magic. Retro game enthusiast.',
        avatar: 'https://i.pravatar.cc/300?u=kaipixels'
    },
    {
        username: 'sakura_dev',
        email: 'sakura.dev.tokyo@gmail.com',
        password: 'password123',
        bio: 'Full-stack dev from Tokyo. Building AI tools.',
        avatar: 'https://i.pravatar.cc/300?u=sakuradev'
    },
    {
        username: 'mikethemaker',
        email: 'mike.maker.lab@proton.me',
        password: 'password123',
        bio: 'Hardware + AI. Tinkering with everything.',
        avatar: 'https://i.pravatar.cc/300?u=mikemaker'
    },
    {
        username: 'artbyzoey',
        email: 'zoey.art.portfolio@gmail.com',
        password: 'password123',
        bio: 'Illustrator turned AI artist. Exploring new mediums.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop'
    },
    {
        username: 'omar_writes',
        email: 'omar.daily.writes@outlook.com',
        password: 'password123',
        bio: 'Fiction writer using AI for world-building and brainstorming.',
        avatar: 'https://i.pravatar.cc/300?u=omarwrites'
    }
];

// ─── PROMPTS ────────────────────────────────────────────
const dummyPrompts = [
    // ─── IMAGE PROMPTS (Midjourney / DALL-E 3 / Stable Diffusion) ───
    {
        title: 'Cyberpunk Ramen Shop at Night',
        modelUsed: 'Midjourney',
        promptText: 'A tiny ramen shop tucked under neon signs in a rainy cyberpunk alley, warm light spilling from the entrance, steam rising from bowls, customers sitting on stools, puddles reflecting pink and blue neon, Blade Runner atmosphere, ultra detailed, cinematic composition, 8k --ar 16:9 --v 6',
        tags: ['cyberpunk', 'neon', 'food', 'nightlife'],
        outputImage: 'https://images.unsplash.com/photo-1569025743873-ea3a9ber44f8?w=800',
    },
    {
        title: 'Floating Island Fantasy World',
        modelUsed: 'Midjourney',
        promptText: 'Massive floating islands connected by rope bridges in a sunset sky, waterfalls pouring off the edges into clouds below, lush green vegetation, tiny villages with glowing lanterns, birds flying between islands, Studio Ghibli inspired, matte painting style --ar 16:9 --v 6',
        tags: ['fantasy', 'landscape', 'ghibli', 'islands'],
        outputImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
    },
    {
        title: 'Cozy Autumn Reading Nook',
        modelUsed: 'DALL-E 3',
        promptText: 'A cozy window reading nook during autumn, soft blankets and pillows piled up, a steaming cup of tea on the windowsill, rain outside with golden and red leaves falling, warm ambient lighting from a string of fairy lights, bookshelves lining the walls, photorealistic, warm tones',
        tags: ['cozy', 'autumn', 'interior', 'aesthetic'],
        outputImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    },
    {
        title: 'Underwater Ancient Temple',
        modelUsed: 'Stable Diffusion',
        promptText: 'An ancient Greek temple submerged deep underwater, rays of sunlight piercing through the ocean surface, coral and sea plants growing on marble columns, schools of tropical fish swimming around, a sea turtle gliding past, volumetric lighting, ethereal mood, 4k cinematic',
        tags: ['underwater', 'ancient', 'ocean', 'fantasy'],
        outputImage: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800',
    },
    {
        title: 'Samurai in Cherry Blossom Storm',
        modelUsed: 'Midjourney',
        promptText: 'A lone samurai standing on a hilltop during a cherry blossom storm, petals swirling around like a blizzard, katana drawn, dramatic wind effect on clothes and hair, Mount Fuji faintly visible in background fog, Japanese woodblock print aesthetic meets photorealism --ar 16:9 --s 750',
        tags: ['samurai', 'japan', 'cherry-blossom', 'dramatic'],
        outputImage: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800',
    },
    {
        title: 'Retro Synthwave Car Dashboard',
        modelUsed: 'DALL-E 3',
        promptText: 'POV from inside a retro 1980s sports car driving on a neon-lit highway at night, the dashboard glowing with purple and magenta lights, a palm tree lined road stretching to infinity, the sky filled with stars and a massive moon, synthwave aesthetic, vibrant gradients',
        tags: ['synthwave', 'retro', 'vaporwave', 'car'],
        outputImage: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800',
    },
    {
        title: 'Mystical Forest Portal',
        modelUsed: 'Stable Diffusion',
        promptText: 'A glowing magical portal made of intertwining tree roots and branches in a misty ancient forest, bioluminescent mushrooms around the base, fireflies dancing in the air, a figure in a hooded cloak approaching from the path, fantasy concept art, volumetric fog, dramatic lighting',
        tags: ['fantasy', 'forest', 'magic', 'portal'],
        outputImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    },
    {
        title: 'Astronaut in a Field of Flowers',
        modelUsed: 'Midjourney',
        promptText: 'An astronaut in a white spacesuit sitting alone in an endless field of wildflowers under a pastel sky, helmet visor reflecting the flowers and a distant planet, surreal and dreamlike, soft diffused sunlight, tilt-shift effect --ar 16:9 --v 6',
        tags: ['space', 'surreal', 'astronaut', 'flowers'],
        outputImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
    },
    {
        title: 'Steampunk Clockwork Dragon',
        modelUsed: 'Stable Diffusion',
        promptText: 'A massive mechanical dragon made of brass gears, copper pipes, and clockwork mechanisms, breathing steam instead of fire, hovering over a Victorian-era city, dramatic clouds in background, steampunk aesthetic, hyper-detailed, 8k render',
        tags: ['steampunk', 'dragon', 'mechanical', 'fantasy'],
        outputImage: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800',
    },
    {
        title: 'Northern Lights Cabin',
        modelUsed: 'DALL-E 3',
        promptText: 'A small wooden cabin in snowy Norwegian mountains with the Aurora Borealis filling the entire sky in greens and purples, smoke coming from the chimney, a frozen lake reflecting the lights, a dog sitting by the door, cozy warm light from windows, photorealistic landscape',
        tags: ['aurora', 'cabin', 'norway', 'landscape'],
        outputImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    },

    // ─── TEXT PROMPTS (GPT-4 / Claude 3 / Llama 3) ───
    {
        title: 'Build a REST API Error Handler',
        modelUsed: 'GPT-4',
        promptText: 'Write a production-ready Express.js error handling middleware in TypeScript that catches async errors, formats them consistently, handles Mongoose validation errors, duplicate key errors, and JWT errors separately, logs to console in dev mode, and returns clean JSON responses in production.',
        tags: ['coding', 'typescript', 'express', 'backend'],
        outputText: `import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

export const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === 'ValidationError' && err.errors) {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = 'A record with that value already exists';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('[ERROR]', err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};`
    },
    {
        title: 'LinkedIn Bio Generator for Developers',
        modelUsed: 'GPT-4',
        promptText: 'You are a personal branding expert. Generate 3 different LinkedIn headline + summary combos for a full-stack developer with 2 years of experience who knows React, Node.js, and Python. Make them sound confident but not arrogant. One should be casual, one professional, and one creative.',
        tags: ['career', 'linkedin', 'branding', 'writing'],
        outputText: `**Option 1 — Casual & Approachable:**
Headline: Full-Stack Dev | React + Node.js | Building stuff that works
Summary: Hey! I'm a developer who loves turning ideas into products. Over the past 2 years, I've gone from "what's a div?" to shipping production apps used by thousands. I work across the stack — React on the front, Node.js on the back, and Python when data gets involved. Always learning, always shipping.

**Option 2 — Professional & Clean:**
Headline: Full-Stack Software Engineer | React, Node.js, Python | Product-Focused Builder
Summary: Software engineer with 2+ years of hands-on experience building web applications end-to-end. Proficient in React, Node.js, Express, and Python with a focus on clean architecture and user-facing impact. Passionate about writing maintainable code and collaborating cross-functionally to deliver real value.

**Option 3 — Creative & Bold:**
Headline: I turn coffee into full-stack applications ☕→💻
Summary: Two years ago I wrote my first line of code. Today I architect systems that handle real traffic and real users. My toolkit? React for interfaces people enjoy, Node.js for APIs that scale, and Python for everything data. I believe great software is invisible — you just feel it working.`
    },
    {
        title: 'React Custom Hook for Debounce',
        modelUsed: 'Claude 3',
        promptText: 'Write a clean, reusable custom React hook called useDebounce that takes a value and delay as parameters. Include TypeScript generics, proper cleanup, and a usage example with a search input component.',
        tags: ['react', 'hooks', 'typescript', 'frontend'],
        outputText: `import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage example:
function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      fetch(\`/api/search?q=\${debouncedQuery}\`)
        .then(res => res.json())
        .then(data => console.log(data));
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`
    },
    {
        title: 'Email Subject Line A/B Tester',
        modelUsed: 'GPT-4',
        promptText: 'I\'m launching an online course about prompt engineering. Generate 10 email subject lines I can A/B test for the launch announcement. Mix urgency, curiosity, and value-based approaches. Keep them under 60 characters.',
        tags: ['marketing', 'email', 'copywriting', 'launch'],
        outputText: `1. "Prompt engineering just got a masterclass" (curiosity)
2. "You're writing prompts wrong. Let me fix that." (bold)
3. "The AI skill nobody teaches — until now" (value gap)
4. "Early access: Prompt Engineering Course 🚀" (exclusivity)
5. "Write better prompts in 7 days — here's how" (specific outcome)
6. "Doors close Friday: Learn prompt engineering" (urgency)
7. "From zero to prompt pro — new course inside" (transformation)
8. "Stop guessing. Start engineering your prompts." (pain point)
9. "I spent 500hrs studying prompts. Here's everything." (credibility)
10. "Your prompts are leaving 80% of value on the table" (FOMO)`
    },
    {
        title: 'SQL Query: Monthly Active Users',
        modelUsed: 'GPT-4',
        promptText: 'Write a PostgreSQL query to calculate Monthly Active Users (MAU) for the last 12 months from a user_events table with columns: user_id, event_type, created_at. Include the month name, MAU count, and month-over-month growth percentage.',
        tags: ['sql', 'analytics', 'database', 'backend'],
        outputText: `WITH monthly_users AS (
  SELECT
    DATE_TRUNC('month', created_at) AS month,
    COUNT(DISTINCT user_id) AS mau
  FROM user_events
  WHERE created_at >= NOW() - INTERVAL '12 months'
  GROUP BY DATE_TRUNC('month', created_at)
)
SELECT
  TO_CHAR(month, 'Mon YYYY') AS month_name,
  mau,
  ROUND(
    (mau - LAG(mau) OVER (ORDER BY month))::numeric /
    NULLIF(LAG(mau) OVER (ORDER BY month), 0) * 100, 1
  ) AS mom_growth_pct
FROM monthly_users
ORDER BY month DESC;`
    },
    {
        title: 'Explain Kubernetes to a 10 Year Old',
        modelUsed: 'Claude 3',
        promptText: 'Explain Kubernetes to a 10-year-old using a pizza restaurant analogy. Cover pods, nodes, services, deployments, and auto-scaling. Make it fun and memorable, use emojis.',
        tags: ['devops', 'kubernetes', 'beginner', 'analogy'],
        outputText: `🍕 Imagine you own a HUGE pizza restaurant chain!

**Pods** 🫛 = Each pod is like one pizza chef. They know how to make one type of pizza — that's their job.

**Nodes** 🏪 = Each node is a kitchen. One kitchen might have 3-4 chefs (pods) working inside it.

**Cluster** 🌆 = Your whole restaurant chain — all the kitchens combined!

**Deployment** 📋 = This is your recipe book + hiring plan. It says "I need 5 pepperoni chefs at all times." If one chef calls in sick, it automatically hires a replacement!

**Service** 🚪 = The front door + cashier. Customers don't pick which chef makes their pizza. The service says "I'll route your order to whichever chef is free."

**Auto-scaling** 📈 = It's Friday night and orders are FLOODING in! Kubernetes looks at the line and says "We need 3 more chefs, NOW!" And poof — 3 new chefs appear. When it's quiet at 2am? "Okay, 2 chefs can go home." 

That's basically it! Kubernetes is the super-smart restaurant manager who makes sure there are always enough chefs, no kitchen is overloaded, and every pizza gets delivered. 🎯`
    },
    {
        title: 'Git Commit Message Formatter',
        modelUsed: 'Claude 3',
        promptText: 'Create a system prompt that turns messy git commit descriptions into clean conventional commit messages. It should detect the type (feat/fix/chore/docs/style/refactor), keep the subject under 72 chars, and add a body when the change is complex.',
        tags: ['git', 'productivity', 'devtools', 'automation'],
        outputText: `System Prompt:
You are a Git Commit Message Formatter. When the user describes a code change, transform it into a clean conventional commit message.

Rules:
1. Detect the commit type: feat | fix | chore | docs | style | refactor | test | perf
2. Subject line: imperative mood, lowercase after colon, max 72 chars
3. If the change affects a specific scope, include it: feat(auth): add JWT refresh
4. Add a body (separated by blank line) ONLY if the change is non-trivial
5. Never use periods at the end of the subject line

Example input: "I fixed the bug where users couldn't log in because the JWT token was expiring too fast, changed it from 1h to 7d and also added a refresh token mechanism"

Example output:
fix(auth): extend JWT expiration and add refresh token flow

- Changed access token expiry from 1h to 7d
- Implemented refresh token rotation for seamless re-authentication
- Added /auth/refresh endpoint to issue new token pairs`
    },
    {
        title: 'Product Description for Wireless Earbuds',
        modelUsed: 'GPT-4',
        promptText: 'Write a compelling product description for premium wireless earbuds called "SoundPulse Pro" priced at $129. Features: 40dB ANC, 36hr battery, spatial audio, IPX5 waterproof. Target audience: young professionals. Tone: modern, confident, not too techy.',
        tags: ['copywriting', 'product', 'marketing', 'ecommerce'],
        outputText: `**SoundPulse Pro** — Your world. Your rules.

Block out the noise. Literally. With 40dB active noise cancellation, SoundPulse Pro creates a bubble of focus wherever you are — busy commute, open office, crowded café. Gone.

🎵 **Spatial Audio** that puts you center stage. Movies, music, podcasts — everything sounds like it's happening around you, not just in your ears.

⚡ **36 hours of battery**. That's a full work week of commutes without touching a charger. Low-power anxiety? Don't know her.

💧 **IPX5 waterproof**. Sweat through your workout, get caught in the rain, spill your coffee — SoundPulse doesn't flinch.

Designed for people who move fast and expect their tech to keep up.

**$129. No compromises.**`
    },
    {
        title: 'Python Data Pipeline with Error Recovery',
        modelUsed: 'Llama 3',
        promptText: 'Write a Python data pipeline class that processes CSV files in batches, includes retry logic with exponential backoff, logs progress, and saves checkpoint state so it can resume after failures.',
        tags: ['python', 'data-engineering', 'pipeline', 'automation'],
        outputText: `import csv, json, time, logging
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DataPipeline:
    def __init__(self, input_file: str, batch_size: int = 100):
        self.input_file = input_file
        self.batch_size = batch_size
        self.checkpoint_file = f"{input_file}.checkpoint"
        self.processed = self._load_checkpoint()

    def _load_checkpoint(self) -> int:
        try:
            with open(self.checkpoint_file) as f:
                return json.load(f)["last_row"]
        except FileNotFoundError:
            return 0

    def _save_checkpoint(self, row_num: int):
        with open(self.checkpoint_file, "w") as f:
            json.dump({"last_row": row_num}, f)

    def _process_with_retry(self, batch, max_retries=3):
        for attempt in range(max_retries):
            try:
                # Your processing logic here
                return [self._transform(row) for row in batch]
            except Exception as e:
                wait = 2 ** attempt
                logger.warning(f"Attempt {attempt+1} failed: {e}. Retrying in {wait}s")
                time.sleep(wait)
        raise RuntimeError(f"Failed after {max_retries} retries")

    def _transform(self, row: dict) -> dict:
        return {k.strip(): v.strip() for k, v in row.items()}

    def run(self):
        with open(self.input_file) as f:
            reader = list(csv.DictReader(f))

        total = len(reader)
        logger.info(f"Starting pipeline: {total} rows, resuming from {self.processed}")

        for i in range(self.processed, total, self.batch_size):
            batch = reader[i:i + self.batch_size]
            results = self._process_with_retry(batch)
            self._save_checkpoint(i + len(batch))
            logger.info(f"Processed {min(i + self.batch_size, total)}/{total}")

        logger.info("Pipeline complete!")
        Path(self.checkpoint_file).unlink(missing_ok=True)`
    },
    {
        title: 'Startup Pitch Deck Outline',
        modelUsed: 'Claude 3',
        promptText: 'Create a 10-slide pitch deck outline for a B2B SaaS startup that automates employee onboarding. Include the slide title, 2-3 bullet points per slide, and suggest what visual/chart to include on each slide.',
        tags: ['startup', 'business', 'pitch', 'saas'],
        outputText: `**Slide 1 — Title**
• Company name + one-line value prop
• "Onboard new hires in days, not weeks"
• Visual: Clean logo + tagline

**Slide 2 — The Problem**
• 58% of companies have no structured onboarding
• HR teams spend 15+ hrs/week on repetitive onboarding tasks
• New hires take 90 days to reach full productivity
• Visual: Pain statistics infographic

**Slide 3 — The Solution**
• Automated onboarding workflows triggered on day one
• Smart document collection, training assignments, and check-ins
• Visual: Product screenshot or 30-sec demo GIF

**Slide 4 — How It Works**
• Step 1: HR creates onboarding template once
• Step 2: System auto-assigns tasks to new hire
• Step 3: Dashboard tracks completion in real-time
• Visual: 3-step flow diagram

**Slide 5 — Market Size**
• $9.2B HR tech market growing 12% CAGR
• 250K companies hire 50+ people annually in US alone
• Visual: TAM/SAM/SOM concentric circles

**Slide 6 — Traction**
• 47 paying customers, $18K MRR
• 92% retention rate over 6 months
• 3 enterprise pilots in progress
• Visual: MRR growth chart

**Slide 7 — Business Model**
• SaaS subscription: $15/employee/month
• Avg contract: $3,600/year
• Expansion revenue from integrations
• Visual: Pricing tier comparison

**Slide 8 — Competition**
• BambooHR, Rippling lack automation depth
• Our edge: AI-powered task sequencing + integrations
• Visual: Feature comparison matrix

**Slide 9 — Team**
• CEO: 8 years in HR tech
• CTO: Ex-AWS engineer
• Head of Sales: Built SDR team at previous startup to $2M ARR
• Visual: Team headshots + credentials

**Slide 10 — The Ask**
• Raising $1.5M seed round
• 18-month runway to 200 customers and $80K MRR
• Funds: 60% engineering, 25% sales, 15% ops
• Visual: Use of funds pie chart`
    },
    {
        title: 'Japanese Garden Zen Pond',
        modelUsed: 'DALL-E 3',
        promptText: 'A serene Japanese zen garden with a still koi pond, perfectly raked white gravel, moss-covered rocks, a small red wooden bridge, maple trees with autumn colors, soft morning mist, golden hour lighting, photorealistic',
        tags: ['japan', 'zen', 'garden', 'peaceful'],
        outputImage: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
    },
    {
        title: 'Abandoned Space Station Interior',
        modelUsed: 'Midjourney',
        promptText: 'Interior of an abandoned space station, overgrown with alien plants and vines, broken monitors still flickering with data, sunlight pouring through cracked hull panels, floating debris in zero gravity, eerie but beautiful atmosphere, sci-fi concept art --ar 16:9 --v 6',
        tags: ['scifi', 'space', 'abandoned', 'concept-art'],
        outputImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    },
    {
        title: 'Tiny Dragon in a Teacup',
        modelUsed: 'DALL-E 3',
        promptText: 'An adorable tiny baby dragon curled up sleeping inside a porcelain teacup, wisps of steam and tiny flames coming from its nostrils, the cup sitting on a saucer on a kitchen windowsill with morning light, photorealistic detail, whimsical and cozy',
        tags: ['dragon', 'cute', 'fantasy', 'whimsical'],
        outputImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800',
    },
    {
        title: 'Neon Tokyo Street Photography',
        modelUsed: 'Stable Diffusion',
        promptText: 'Street-level photography of a busy Tokyo intersection at night during rain, neon signs in Japanese reflecting on wet pavement, motion blur on walking pedestrians with umbrellas, long exposure light trails from cars, cinematic color grading with teals and magentas',
        tags: ['tokyo', 'photography', 'neon', 'rain'],
        outputImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    },
    {
        title: 'Cover Letter for Junior Dev Position',
        modelUsed: 'GPT-4',
        promptText: 'Write a cover letter for a junior frontend developer applying to a mid-size tech company. I know React, TypeScript, and Tailwind CSS. I have one internship and two personal projects. Make it genuine and not robotic. Keep it under 250 words.',
        tags: ['career', 'cover-letter', 'job', 'frontend'],
        outputText: `Dear Hiring Team,

I'm writing to apply for the Junior Frontend Developer position. After building projects with React and TypeScript over the past year — and really enjoying it — I'm excited about the opportunity to do this work professionally on your team.

During my internship at a local startup, I rebuilt their customer-facing dashboard using React and Tailwind CSS, which reduced page load times by 40% and got positive feedback from both the team and users. Outside of that, I've built two projects I'm proud of: a real-time chat app with Socket.io and a prompt-sharing platform with full auth, following system, and responsive design.

What draws me to your company specifically is your focus on developer experience. I've used your open-source tools, and the attention to detail in both the code and documentation tells me this is a team that cares about craft.

I'm at a point where I write clean, readable code, I'm comfortable with Git workflows and code reviews, and I actively seek feedback. What I'm looking for is a team that will challenge me to grow from good to great.

I'd love the chance to chat about how I can contribute. Thanks for reading this far!

Best,
[Your Name]`
    },
    {
        title: 'Vintage Film Camera on Desk',
        modelUsed: 'Stable Diffusion',
        promptText: 'A vintage Leica film camera sitting on a weathered wooden desk next to a cup of black coffee, scattered film negatives and prints, warm afternoon light from a nearby window casting long shadows, shallow depth of field, analog photography aesthetic, grain texture',
        tags: ['photography', 'vintage', 'aesthetic', 'analog'],
        outputImage: 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=800',
    },
    {
        title: 'Regex Cheat Sheet Generator',
        modelUsed: 'Claude 3',
        promptText: 'Create a practical regex cheat sheet focused on the 20 most commonly needed patterns in web development. Include: pattern, explanation, and a real-world example for each. Organize by category.',
        tags: ['regex', 'cheatsheet', 'webdev', 'reference'],
        outputText: `📋 REGEX CHEAT SHEET — Web Dev Edition

═══ VALIDATION ═══
Email:     /^[\\w.-]+@[\\w.-]+\\.\\w{2,}$/
Password:  /^(?=.*[A-Z])(?=.*\\d)(?=.*[@#$]).{8,}$/   (1 upper, 1 digit, 1 special, 8+ chars)
URL:       /^https?:\\/\\/[\\w.-]+\\.\\w{2,}(\\/\\S*)?$/
Phone:     /^\\+?\\d{1,3}[-.\\s]?\\d{3}[-.\\s]?\\d{3,4}[-.\\s]?\\d{4}$/

═══ EXTRACTION ═══
HTML tags:      /<(\\w+)[^>]*>(.*?)<\\/\\1>/g
Numbers:        /\\d+\\.?\\d*/g
Hashtags:       /#[\\w]+/g
@mentions:      /@[\\w]+/g
Query params:   /[?&](\\w+)=(\\w+)/g

═══ CLEANING ═══
Extra spaces:   /\\s{2,}/g  →  replace with ' '
Leading zeros:  /^0+(?=\\d)/
HTML entities:  /&\\w+;/g
Line breaks:    /\\r?\\n/g

═══ FORMATTING ═══
Credit card:    /(\\d{4})(?=\\d)/g  →  replace with '$1-'
Date (US→ISO):  /(\\d{2})\\/(\\d{2})\\/(\\d{4})/  →  '$3-$1-$2'
Slug:           /[^\\w]+/g  →  replace with '-', lowercase`
    },
    {
        title: 'Sci-Fi Planet Landscape',
        modelUsed: 'Midjourney',
        promptText: 'An alien planet landscape with twin suns setting behind crystalline mountain formations, a river of liquid mercury flowing through a valley of bioluminescent plants, a lone explorer in a futuristic suit standing on a cliff looking out, epic cinematic wide shot --ar 21:9 --v 6',
        tags: ['scifi', 'alien', 'landscape', 'exploration'],
        outputImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
    },
    {
        title: 'Weekly Meal Prep Plan Generator',
        modelUsed: 'GPT-4',
        promptText: 'Create a 5-day meal prep plan for someone who wants high-protein meals (150g/day), cooks on Sunday only, has a $60 budget, and dislikes seafood. Include a grocery list and approximate macros per meal.',
        tags: ['health', 'meal-prep', 'nutrition', 'planning'],
        outputText: `🍽️ WEEKLY MEAL PREP — High Protein, $60 Budget

GROCERY LIST ($57.40):
□ Chicken breast 3lbs — $12
□ Ground turkey 2lbs — $8
□ Eggs 18ct — $4
□ Greek yogurt 32oz — $5
□ Rice 2lbs — $3
□ Black beans 3 cans — $3
□ Sweet potatoes 3lbs — $4
□ Broccoli 2 bags — $5
□ Spinach 1 bag — $3
□ Tortillas 10ct — $3
□ Cheese shredded — $4
□ Salsa jar — $3.40

DAY 1-5 ROTATION:
Breakfast (35g protein): Egg scramble (3 eggs + spinach + cheese) + Greek yogurt
Lunch (45g protein): Chicken rice bowl (6oz chicken + rice + black beans + salsa)
Dinner (40g protein): Turkey sweet potato skillet (5oz turkey + sweet potato + broccoli)
Snack (30g protein): Greek yogurt + hard boiled eggs

DAILY TOTAL: ~150g protein | ~1,800 cal | ~65g fat | ~180g carbs

PREP ORDER (Sunday, ~2.5 hours):
1. Start rice cooker (30m)
2. Bake chicken breasts 400°F (25m)
3. Roast sweet potatoes (30m)
4. Brown ground turkey with seasoning (15m)
5. Steam broccoli (10m)
6. Hard boil 10 eggs (12m)
7. Portion into 15 containers`
    },
    {
        title: 'Magical Library Interior',
        modelUsed: 'DALL-E 3',
        promptText: 'An impossibly tall magical library with floating books, spiral staircases that defy gravity, warm candlelight from floating candles, a wizard reading at a desk surrounded by glowing orbs, dark academia aesthetic, rich warm colors, detailed painting style',
        tags: ['library', 'magic', 'dark-academia', 'books'],
        outputImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
    },
    {
        title: 'Convert Figma Design to React Components',
        modelUsed: 'Claude 3',
        promptText: 'I have a Figma design for a pricing card with 3 tiers. Write the React component with CSS modules. The card should have: plan name, price, feature list with checkmarks, a CTA button, and a "Popular" badge on the middle tier. Make it responsive.',
        tags: ['react', 'css', 'components', 'frontend'],
        outputText: `// PricingCard.jsx
import styles from './PricingCard.module.css';

const plans = [
  { name: 'Starter', price: 9, features: ['5 projects', '10GB storage', 'Email support'], cta: 'Get Started' },
  { name: 'Pro', price: 29, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access', 'Custom domain'], cta: 'Go Pro', popular: true },
  { name: 'Enterprise', price: 79, features: ['Everything in Pro', '1TB storage', 'Dedicated account manager', 'SSO', 'SLA guarantee'], cta: 'Contact Sales' }
];

export default function PricingCards() {
  return (
    <div className={styles.grid}>
      {plans.map(plan => (
        <div key={plan.name} className={\`\${styles.card} \${plan.popular ? styles.popular : ''}\`}>
          {plan.popular && <span className={styles.badge}>Most Popular</span>}
          <h3>{plan.name}</h3>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>{plan.price}</span>
            <span className={styles.period}>/mo</span>
          </div>
          <ul className={styles.features}>
            {plan.features.map(f => <li key={f}>✓ {f}</li>)}
          </ul>
          <button className={styles.cta}>{plan.cta}</button>
        </div>
      ))}
    </div>
  );
}`
    },
];

// ─── COMMENTS ───────────────────────────────────────────
const commentPool = [
    "This is exactly what I was looking for, thanks for sharing!",
    "Saved this for my next project 🔥",
    "The output quality is insane. What settings did you use?",
    "I tried modifying the prompt slightly and got even better results",
    "Clean and well-structured. Bookmarked!",
    "How long did it take to iterate on this prompt?",
    "I used this at work today and my manager was impressed lol",
    "Underrated prompt. More people need to see this.",
    "Would love to see a v2 of this with more detail",
    "The cyberpunk vibes are immaculate 🌃",
    "Finally a prompt that actually produces usable code",
    "This is going straight into my prompt library",
    "Tried this on Claude instead and it worked great too",
    "The level of detail in this output is chef's kiss 🤌",
    "Can you share the negative prompt too?",
    "Been looking for something like this for weeks",
    "Great for beginners. Clear and easy to understand.",
    "The mood and atmosphere here is perfect",
    "I remixed this with a different art style — turned out amazing",
    "You should do a whole series of these!",
    "Really helpful for my portfolio project",
    "This prompt taught me more than a 2-hour tutorial",
    "Solid work. Following for more content like this.",
    "What resolution did you generate this at?",
    "Super practical. I use variations of this daily.",
    "The aesthetic is so good, made it my wallpaper 😂",
    "Shared this with my team, everyone loved it",
    "Your prompts are consistently the best on here",
    "I'd pay for a collection of prompts like this tbh",
    "Nice! I adapted this for my use case and it works perfectly",
];

// ─── SEED FUNCTION ──────────────────────────────────────
const seedDatabase = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }

        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Comment.deleteMany({});
        await Prompt.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data.');

        // Create users
        const createdUsers = [];
        for (const userData of dummyUsers) {
            const user = await User.create(userData);
            createdUsers.push(user);
        }
        console.log(`Created ${createdUsers.length} users.`);

        // Create follow relationships (makes the app feel alive)
        for (let i = 0; i < createdUsers.length; i++) {
            const user = createdUsers[i];
            // Each user follows 3-7 random other users
            const followCount = 3 + Math.floor(Math.random() * 5);
            const candidates = createdUsers.filter(u => u._id.toString() !== user._id.toString());
            const shuffled = candidates.sort(() => 0.5 - Math.random());
            const toFollow = shuffled.slice(0, followCount);

            for (const target of toFollow) {
                await User.findByIdAndUpdate(user._id, { $addToSet: { following: target._id } });
                await User.findByIdAndUpdate(target._id, { $addToSet: { followers: user._id } });
            }
        }
        console.log('Created follow relationships.');

        // Create prompts and assign to random users
        const createdPrompts = [];
        for (let i = 0; i < dummyPrompts.length; i++) {
            const promptData = dummyPrompts[i];
            // Distribute prompts across users, but give user[0] (aaryansahu) more
            const authorIndex = i < 5 ? 0 : i % createdUsers.length;
            const author = createdUsers[authorIndex];

            const prompt = await Prompt.create({
                ...promptData,
                author: author._id,
                likes: [],
                comments: [],
            });
            createdPrompts.push(prompt);
        }
        console.log(`Created ${createdPrompts.length} prompts.`);

        // Add random likes to prompts
        for (const prompt of createdPrompts) {
            const likeCount = 2 + Math.floor(Math.random() * 10);
            const shuffled = [...createdUsers].sort(() => 0.5 - Math.random());
            const likers = shuffled.slice(0, likeCount);

            await Prompt.findByIdAndUpdate(prompt._id, {
                $set: { likes: likers.map(u => u._id) }
            });
        }
        console.log('Added likes to prompts.');

        // Add comments to prompts
        let commentCount = 0;
        for (const prompt of createdPrompts) {
            const numComments = Math.floor(Math.random() * 5); // 0-4 comments per prompt
            for (let c = 0; c < numComments; c++) {
                const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
                const randomComment = commentPool[Math.floor(Math.random() * commentPool.length)];

                const comment = await Comment.create({
                    user: randomUser._id,
                    prompt: prompt._id,
                    text: randomComment,
                });

                await Prompt.findByIdAndUpdate(prompt._id, {
                    $push: { comments: comment._id }
                });
                commentCount++;
            }
        }
        console.log(`Added ${commentCount} comments.`);

        // Add some saved prompts for users
        for (const user of createdUsers) {
            const saveCount = 2 + Math.floor(Math.random() * 6);
            const shuffled = [...createdPrompts].sort(() => 0.5 - Math.random());
            const toSave = shuffled.slice(0, saveCount);

            await User.findByIdAndUpdate(user._id, {
                $set: { savedPrompts: toSave.map(p => p._id) }
            });
        }
        console.log('Added saved prompts for users.');

        console.log('\n✅ Seeding complete!');
        console.log(`   ${createdUsers.length} users`);
        console.log(`   ${createdPrompts.length} prompts`);
        console.log(`   ${commentCount} comments`);
        console.log(`   + follows, likes, saved prompts\n`);

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
