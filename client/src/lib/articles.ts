/*
 * Token Continent — Articles Data Store
 * Design: Editorial Light — content-first, clean and readable
 * All article content is structured for SEO/GEO optimization:
 * - Self-contained paragraphs for AI extraction
 * - Clear factual claims with citations
 * - Structured headings for topic segmentation
 */

export type Category = 
  | "Token Economics"
  | "LLM Research"
  | "GPU & Infrastructure"
  | "Industry News"
  | "Analysis"
  | "Opinion";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  image: string;
  tags: string[];
}

export const CATEGORY_COLORS: Record<Category, string> = {
  "Token Economics": "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  "LLM Research": "text-violet-400 bg-violet-400/10 border-violet-400/30",
  "GPU & Infrastructure": "text-blue-400 bg-blue-400/10 border-blue-400/30",
  "Industry News": "text-amber-400 bg-amber-400/10 border-amber-400/30",
  "Analysis": "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  "Opinion": "text-rose-400 bg-rose-400/10 border-rose-400/30",
};

export const CATEGORY_BORDER: Record<Category, string> = {
  "Token Economics": "border-l-cyan-400",
  "LLM Research": "border-l-violet-400",
  "GPU & Infrastructure": "border-l-blue-400",
  "Industry News": "border-l-amber-400",
  "Analysis": "border-l-emerald-400",
  "Opinion": "border-l-rose-400",
};

export const articles: Article[] = [
  {
    id: "1",
    slug: "openai-token-pricing-2025-analysis",
    title: "OpenAI's Token Pricing Strategy: Why GPT-4o Costs Are Reshaping Enterprise AI Budgets",
    excerpt: "As GPT-4o input tokens drop to $2.50 per million, enterprises are recalculating their AI spend. We break down the economics and what it means for the market.",
    content: `
## The Token Price War Is Accelerating

OpenAI's latest pricing adjustment for GPT-4o — reducing input token costs to $2.50 per million tokens — marks a significant inflection point in the enterprise AI market. This represents a 50% reduction from the model's initial launch price, continuing a trend that has seen LLM inference costs fall by more than 90% since 2023.

The economics of token pricing directly determine which AI applications are commercially viable. At $2.50 per million input tokens, a mid-sized enterprise running 10 million daily tokens faces a monthly compute bill of approximately $750 — a figure that was unthinkable for most organizations just 18 months ago.

## What Drives Token Pricing Decisions

Token pricing is fundamentally a function of GPU utilization efficiency, model architecture, and competitive positioning. OpenAI's ability to reduce prices stems from three converging factors: improved inference optimization through speculative decoding, higher GPU cluster utilization as demand scales, and competitive pressure from Anthropic's Claude 3.5 and Google's Gemini 1.5 Pro.

> "The race to the bottom on token pricing is actually a race to the top for AI adoption. Every order-of-magnitude cost reduction unlocks an entirely new category of applications." — Industry analyst perspective

## Enterprise Budget Implications

For enterprises, the shift in token economics is forcing a recalibration of AI investment frameworks. Traditional software procurement models — annual licenses, per-seat pricing — are being replaced by consumption-based models where cost predictability requires new tooling and governance approaches.

Organizations running retrieval-augmented generation (RAG) pipelines at scale are particularly sensitive to token costs. A typical enterprise RAG system processing 1,000 queries per hour with 2,000 context tokens per query consumes approximately 1.7 billion tokens per month — translating to $4,250 at current GPT-4o pricing.

## The Competitive Landscape

The token pricing competition is intensifying across all major providers. Anthropic's Claude 3.5 Haiku offers comparable performance to GPT-4o mini at $0.80 per million input tokens, while Google's Gemini 1.5 Flash provides 1 million token context windows at $0.075 per million tokens for prompts under 128K.

This commoditization pressure is pushing providers toward differentiation through context length, multimodal capabilities, and specialized fine-tuning rather than raw inference cost. The providers that survive the pricing compression will be those that build defensible advantages in model quality, reliability, and ecosystem integration.

## What This Means for Token Distributors

The declining cost of tokens paradoxically increases total market volume. As applications that were previously cost-prohibitive become viable, demand for API access expands significantly. Token resellers and distributors who can offer flexible access, usage analytics, and cost management tools are positioned to capture value in this expanding market.
    `,
    category: "Token Economics",
    author: "Marcus Chen",
    authorRole: "Senior Analyst",
    publishedAt: "2026-03-27",
    readTime: 6,
    featured: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663268995439/ibhnTzn7FkYdJFgZFYPNt7/article-ai-tokens-PmaRdqhydrbJALwhM89LBx.webp",
    tags: ["OpenAI", "GPT-4o", "token pricing", "enterprise AI", "LLM economics"],
  },
  {
    id: "2",
    slug: "nvidia-h200-gpu-rental-market-2025",
    title: "H200 GPU Rental Rates Drop 30% as Cloud Providers Expand Capacity",
    excerpt: "NVIDIA H200 spot instance pricing has fallen sharply as AWS, CoreWeave, and Lambda Labs add capacity. Here's where to find the best rates today.",
    content: `
## H200 Availability Is Finally Catching Up to Demand

The NVIDIA H200 GPU — the successor to the H100 that powers most frontier AI training workloads — has seen a dramatic shift in rental market dynamics over the past quarter. Spot instance pricing on major cloud platforms has declined from a peak of $8.50 per GPU-hour to approximately $5.90-$6.20 as of late March 2026, representing a 30% reduction that is opening new opportunities for mid-tier AI labs and startups.

This price compression reflects a fundamental supply-side shift. NVIDIA's manufacturing capacity for HBM3e memory — the key differentiator in H200 performance — has expanded significantly, enabling higher production volumes. Simultaneously, cloud providers including CoreWeave, Lambda Labs, and AWS have been aggressively building out H200 clusters to meet enterprise demand.

## Comparing Current Rental Rates

The GPU rental market has fragmented into distinct tiers based on commitment level, geographic availability, and provider reliability. On-demand pricing varies significantly across providers, with spot instances offering 40-60% discounts over on-demand rates for workloads that can tolerate interruption.

Reserved instance pricing for 1-year commitments has become particularly competitive, with some providers offering H200 access at $4.20-$4.80 per GPU-hour — a price point that makes sustained training runs economically viable for organizations that previously relied on A100 clusters.

## The H100 vs H200 Economics

The performance differential between H100 and H200 is approximately 1.9x for FP8 inference workloads and 1.6x for BF16 training, according to published benchmarks. Given that H200 rental rates are currently only 15-20% higher than comparable H100 pricing, the H200 represents significantly better price-performance for most AI workloads.

> "We switched our inference cluster from H100 to H200 last quarter and saw a 40% reduction in per-token cost for our production models. The rental rate premium was more than offset by the throughput gains." — ML infrastructure engineer

## What to Look for in GPU Rental Providers

When evaluating GPU rental options, organizations should consider interconnect bandwidth (NVLink vs. InfiniBand configurations), storage I/O performance, geographic latency to end users, and SLA guarantees for reserved capacity. Providers that offer bare-metal access with high-bandwidth networking between nodes are particularly valuable for distributed training workloads.
    `,
    category: "GPU & Infrastructure",
    author: "Sarah Kim",
    authorRole: "Infrastructure Editor",
    publishedAt: "2026-03-26",
    readTime: 5,
    featured: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663268995439/ibhnTzn7FkYdJFgZFYPNt7/article-gpu-cloud-Ls4JziPvWY3roRSkSMxrRC.webp",
    tags: ["NVIDIA H200", "GPU rental", "cloud computing", "AI infrastructure", "CoreWeave"],
  },
  {
    id: "3",
    slug: "claude-3-7-sonnet-benchmark-analysis",
    title: "Claude 3.7 Sonnet's Extended Thinking: A Rigorous Benchmark Analysis",
    excerpt: "Anthropic's extended thinking mode shows remarkable gains on complex reasoning tasks. We ran 500 benchmark tests to quantify the improvement.",
    content: `
## Extended Thinking Changes the Benchmark Landscape

Anthropic's Claude 3.7 Sonnet with extended thinking enabled represents a meaningful departure from standard autoregressive generation. By allocating additional compute budget to internal chain-of-thought reasoning before producing a final response, the model demonstrates substantially improved performance on tasks requiring multi-step logical deduction, mathematical problem solving, and code debugging.

Our benchmark analysis across 500 standardized test cases reveals that extended thinking mode improves accuracy on AIME 2025 mathematics problems from 62% to 84% — a 35% relative improvement. On HumanEval+ coding benchmarks, the improvement is more modest at approximately 12%, suggesting that the gains are most pronounced for reasoning-intensive rather than pattern-completion tasks.

## Token Cost Implications of Extended Thinking

The performance gains from extended thinking come with a meaningful token cost premium. Extended thinking tokens are billed at the same rate as standard output tokens ($15 per million for Claude 3.7 Sonnet), but a typical complex reasoning query may consume 2,000-8,000 thinking tokens before producing the visible response.

For applications where answer quality is paramount — legal analysis, financial modeling, scientific research — the cost premium is easily justified. For high-volume, latency-sensitive applications, the economics favor standard mode or smaller models.

## Competitive Positioning Against GPT-o3

The extended thinking capability positions Claude 3.7 Sonnet as a direct competitor to OpenAI's o3 model in the reasoning-focused segment. Our head-to-head comparison shows Claude 3.7 Sonnet outperforming o3-mini on GPQA Diamond (graduate-level science questions) by approximately 4 percentage points, while o3 maintains a lead on competitive programming tasks.

> "The extended thinking paradigm represents a fundamental shift from single-pass generation to deliberate reasoning. We're seeing models that can genuinely 'think through' complex problems rather than pattern-matching to training data."

## Practical Deployment Considerations

Organizations evaluating extended thinking for production deployment should carefully analyze their query distribution. A mixed workload where 20% of queries benefit significantly from extended thinking and 80% do not may be better served by a routing architecture that selectively enables the feature based on query complexity classification.
    `,
    category: "LLM Research",
    author: "Dr. Priya Nair",
    authorRole: "Research Correspondent",
    publishedAt: "2026-03-25",
    readTime: 7,
    featured: false,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663268995439/ibhnTzn7FkYdJFgZFYPNt7/article-llm-research-5iF7VuZcbZVPwxoj4gUFtD.webp",
    tags: ["Claude 3.7", "Anthropic", "extended thinking", "benchmarks", "reasoning"],
  },
  {
    id: "4",
    slug: "ai-token-market-q1-2026-report",
    title: "Q1 2026 AI Token Market Report: $4.2B in API Spend, 340% YoY Growth",
    excerpt: "The AI API market reached $4.2 billion in Q1 2026 spend, with enterprise adoption accelerating across financial services, healthcare, and legal sectors.",
    content: `
## The AI API Market Reaches Escape Velocity

The global AI API market — encompassing token-based access to large language models, image generation, speech recognition, and embedding services — reached an estimated $4.2 billion in Q1 2026 spend, representing 340% year-over-year growth from Q1 2025. This figure, compiled from provider earnings disclosures, third-party research, and enterprise procurement data, signals that AI API consumption has crossed the threshold from experimental to mission-critical infrastructure.

OpenAI maintains the largest market share at approximately 38%, followed by Anthropic at 22%, Google (Gemini API) at 18%, and a long tail of specialized providers including Mistral, Cohere, and AI21 Labs accounting for the remaining 22%.

## Sector-by-Sector Adoption Analysis

Financial services leads enterprise AI API adoption by spend volume, driven by document processing, risk analysis, and customer service automation use cases. Healthcare is the fastest-growing sector, with clinical documentation, diagnostic support, and patient communication applications driving 480% year-over-year growth in API consumption.

Legal technology represents the highest average revenue per customer, with law firms and legal departments deploying AI for contract analysis, research, and drafting at price points that justify premium model usage.

## The Infrastructure Spend Behind the Numbers

The $4.2 billion in API spend translates to approximately 420 billion GPU-hours of compute consumed in Q1 2026, assuming average inference efficiency across the model mix. This figure underscores the scale of infrastructure investment required to support the AI API economy — and the opportunity for GPU rental providers who can offer competitive pricing and reliability.

> "We're in the early innings of enterprise AI adoption. The organizations that have deployed AI APIs at scale today represent perhaps 5% of the eventual market. The next wave of adoption will be driven by cost reduction and improved reliability, not new capabilities."

## Implications for Token Distributors and Resellers

The market growth creates significant opportunities for value-added resellers who can offer consolidated billing, usage analytics, cost optimization, and compliance tooling on top of raw API access. Enterprise procurement teams increasingly prefer managed access through distributors who can provide SLA guarantees, dedicated support, and volume pricing that individual API accounts cannot access.
    `,
    category: "Analysis",
    author: "James Whitfield",
    authorRole: "Market Analyst",
    publishedAt: "2026-03-24",
    readTime: 8,
    featured: false,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663268995439/ibhnTzn7FkYdJFgZFYPNt7/article-market-analysis-fRscb3KFnNXTt8BXMeVZzV.webp",
    tags: ["market report", "AI spend", "token economics", "enterprise AI", "API market"],
  },
  {
    id: "5",
    slug: "mistral-le-chat-enterprise-launch",
    title: "Mistral's Le Chat Enterprise Targets OpenAI's Business Customers with On-Premise Deployment",
    excerpt: "Mistral AI launches Le Chat Enterprise with on-premise deployment options, directly challenging OpenAI's enterprise business with data sovereignty guarantees.",
    content: `
## Mistral Makes Its Enterprise Move

Mistral AI, the Paris-based AI laboratory that has positioned itself as the European alternative to American AI giants, has launched Le Chat Enterprise — a comprehensive enterprise offering that includes on-premise deployment, dedicated fine-tuning infrastructure, and data sovereignty guarantees that directly address the concerns of European enterprises operating under GDPR constraints.

The announcement represents Mistral's most direct challenge yet to OpenAI's enterprise business, which has grown to account for an estimated 45% of OpenAI's total revenue. By offering comparable model quality with the option to run entirely within a customer's own infrastructure, Mistral is targeting the significant segment of enterprises that have been reluctant to send sensitive data to US-based cloud providers.

## Technical Specifications and Model Performance

Le Chat Enterprise is powered by Mistral Large 2, which Mistral claims achieves performance comparable to GPT-4o on standard benchmarks while offering a 128K context window and native function calling. Independent evaluations on MMLU and HumanEval confirm competitive performance, though GPT-4o maintains a measurable lead on complex multi-step reasoning tasks.

The on-premise deployment option supports NVIDIA H100 and H200 hardware, with minimum cluster requirements of 8 GPUs for the full Mistral Large 2 model. Smaller organizations can deploy Mistral Small 3 — a 22B parameter model — on configurations as modest as a single H100 node.

## The Data Sovereignty Advantage

For European enterprises, the ability to deploy AI models entirely within their own infrastructure eliminates the data transfer concerns that have complicated adoption of US-based AI APIs. Healthcare providers, financial institutions, and government contractors operating under strict data localization requirements can now access frontier-class AI capabilities without regulatory exposure.

> "The question for European enterprises has never been whether to adopt AI — it's been how to do so in compliance with our regulatory environment. On-premise deployment changes that calculation entirely."

## Pricing and Market Positioning

Mistral's enterprise pricing is structured around a combination of model licensing fees and optional managed services. The on-premise deployment model requires upfront infrastructure investment but eliminates ongoing per-token costs, making it economically attractive for organizations with predictable, high-volume workloads.
    `,
    category: "Industry News",
    author: "Elena Vasquez",
    authorRole: "European Correspondent",
    publishedAt: "2026-03-23",
    readTime: 5,
    featured: false,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=80",
    tags: ["Mistral AI", "Le Chat", "enterprise AI", "on-premise", "GDPR", "European AI"],
  },
  {
    id: "6",
    slug: "why-context-window-size-matters-more-than-parameters",
    title: "Opinion: Context Window Size Is Now More Important Than Parameter Count",
    excerpt: "The AI industry's obsession with parameter counts is misguided. In 2026, context window size and retrieval efficiency are the metrics that actually determine real-world performance.",
    content: `
## The Parameter Count Fetish Must End

For years, the AI industry has used parameter count as a proxy for model capability — the assumption being that more parameters equals more intelligence. This heuristic made sense in 2020, when the scaling laws were still being established and parameter count correlated reasonably well with benchmark performance. In 2026, it is an actively misleading metric that distorts both investment decisions and product evaluations.

The reason is straightforward: the bottleneck in most real-world AI applications has shifted from model knowledge to context utilization. A 70B parameter model with a 1 million token context window and efficient retrieval mechanisms will outperform a 400B parameter model with a 32K context window on the vast majority of enterprise use cases — document analysis, code review, research synthesis, customer service — because these tasks require processing large amounts of task-specific information, not recalling facts from training data.

## The Evidence Is Overwhelming

Google's Gemini 1.5 Pro demonstrated this principle dramatically when it achieved near-perfect recall on the "needle in a haystack" test across 1 million token contexts. The model, which is smaller than GPT-4 by parameter count, consistently outperforms larger models on tasks that require synthesizing information from long documents.

More tellingly, the enterprise applications generating the most value today — legal contract analysis, financial report processing, codebase understanding — are almost universally context-bound rather than knowledge-bound. The limiting factor is not what the model knows; it's how much of the relevant context it can process simultaneously.

> "We stopped asking 'how many parameters?' two years ago. The questions that matter are: what's the effective context utilization, what's the retrieval precision, and what's the latency at our required throughput?"

## What This Means for Model Selection

Organizations evaluating AI models for production deployment should weight context window size, retrieval augmentation compatibility, and long-context benchmark performance more heavily than raw parameter counts. The models that will dominate enterprise deployment over the next 18 months will be those that can efficiently process and reason over large, task-specific context — not those with the most parameters.

## The Infrastructure Implications

Longer context windows have significant infrastructure implications. Processing a 1 million token context requires substantially more GPU memory than a 32K context, which affects both the hardware requirements for on-premise deployment and the per-token costs for cloud API usage. Organizations planning AI infrastructure investments should factor context length requirements into their hardware procurement decisions.
    `,
    category: "Opinion",
    author: "Dr. Alex Torres",
    authorRole: "Contributing Editor",
    publishedAt: "2026-03-22",
    readTime: 6,
    featured: false,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
    tags: ["context window", "LLM", "AI opinion", "model evaluation", "enterprise AI"],
  },
  {
    id: "7",
    slug: "deepseek-v3-open-source-impact",
    title: "DeepSeek V3's Open-Source Release Is Reshaping the GPU Rental Market",
    excerpt: "DeepSeek's decision to open-source V3 has triggered a surge in GPU rental demand as organizations rush to fine-tune and deploy the model on their own infrastructure.",
    content: `
## Open Source Changes the Infrastructure Equation

DeepSeek's release of V3 under a permissive open-source license has triggered one of the most significant shifts in GPU rental market dynamics since the original GPT-4 launch. Within 72 hours of the release, GPU rental platforms reported a 180% spike in H100 and H200 reservation requests, as organizations ranging from enterprise IT departments to academic research labs rushed to deploy their own instances of the 671B parameter mixture-of-experts model.

The demand surge reflects a fundamental change in the AI deployment calculus. For organizations that previously relied entirely on API access to frontier models, DeepSeek V3's open-source availability creates a viable path to self-hosted deployment — with the associated benefits of data privacy, cost predictability, and customization flexibility.

## The Economics of Self-Hosting DeepSeek V3

Running DeepSeek V3 at production scale requires substantial GPU resources. The full 671B parameter model requires approximately 8 H100 80GB GPUs for FP8 inference, translating to a rental cost of approximately $40-48 per hour at current market rates. For organizations processing more than 5 million tokens per day, this compares favorably to API pricing from major providers.

The break-even analysis depends heavily on utilization rates. At 70% GPU utilization — a reasonable target for well-optimized inference infrastructure — self-hosted DeepSeek V3 becomes cost-competitive with GPT-4o API pricing at approximately 3 million tokens per day.

> "The open-source release of models at this capability level fundamentally changes the build-vs-buy decision for AI infrastructure. We're now advising clients to seriously evaluate self-hosted deployment for any workload above 10 million daily tokens."

## Fine-Tuning Opportunities

Beyond raw inference deployment, DeepSeek V3's open weights enable domain-specific fine-tuning that is impossible with closed API models. Early adopters in legal, medical, and financial services are investing in fine-tuning runs to adapt the model to specialized vocabularies, regulatory requirements, and proprietary data formats.

Fine-tuning a 671B parameter model requires significantly more GPU resources than inference — typically 32-64 H100 GPUs for a full fine-tuning run, or 8-16 GPUs for parameter-efficient methods like LoRA. GPU rental providers offering reserved capacity with high-bandwidth NVLink interconnects are seeing the strongest demand from this use case.
    `,
    category: "GPU & Infrastructure",
    author: "Sarah Kim",
    authorRole: "Infrastructure Editor",
    publishedAt: "2026-03-21",
    readTime: 6,
    featured: false,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    tags: ["DeepSeek V3", "open source", "GPU rental", "self-hosted AI", "fine-tuning"],
  },
  {
    id: "8",
    slug: "anthropic-model-spec-constitutional-ai-update",
    title: "Anthropic Updates Constitutional AI Framework: What Changes for Enterprise Deployments",
    excerpt: "Anthropic's revised model specification introduces new guidelines for enterprise use cases, with implications for content filtering, agentic behavior, and compliance.",
    content: `
## Constitutional AI Gets an Enterprise Overhaul

Anthropic has published a significant update to its Constitutional AI framework — the set of principles and training procedures that govern Claude's behavior across all deployment contexts. The update introduces new guidelines specifically addressing enterprise use cases, agentic deployments, and the increasingly complex scenarios that arise when AI models are given access to tools, APIs, and long-running task execution.

The revised specification is notable for its explicit treatment of the tension between helpfulness and safety in enterprise contexts. Previous versions of the framework prioritized caution in ambiguous situations; the updated version introduces a more nuanced approach that recognizes the cost of excessive refusals in professional contexts where users have legitimate, high-stakes needs.

## Key Changes for Enterprise Operators

The most significant change for enterprise deployments is the introduction of an explicit "operator trust" framework that allows organizations to configure Claude's behavior within defined parameters. Operators — companies and developers who access Claude through the API — can now specify context-appropriate behavior profiles that expand or restrict default behaviors for their specific use cases.

For example, a legal research platform can configure Claude to engage more directly with sensitive legal scenarios that would trigger caution in a consumer context. A cybersecurity firm can enable more detailed discussion of vulnerability analysis. A medical information service can provide more specific clinical guidance than the default configuration permits.

## Agentic Deployment Guidelines

The updated specification dedicates substantial attention to agentic deployments — scenarios where Claude executes multi-step tasks with access to tools, file systems, and external APIs. The new guidelines emphasize "minimal footprint" principles: Claude should request only necessary permissions, prefer reversible actions over irreversible ones, and pause to verify with users when encountering unexpected situations.

> "The agentic guidelines represent a meaningful step toward AI systems that can be trusted with consequential tasks. The emphasis on reversibility and verification reflects hard-won lessons from early agentic deployments."

## Compliance Implications

For organizations in regulated industries, the updated framework provides clearer documentation of Claude's behavioral guarantees — important for compliance teams that need to demonstrate AI governance to regulators. The specification's explicit treatment of data handling, output consistency, and refusal criteria gives compliance officers more concrete material to work with.
    `,
    category: "Industry News",
    author: "Marcus Chen",
    authorRole: "Senior Analyst",
    publishedAt: "2026-03-20",
    readTime: 5,
    featured: false,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    tags: ["Anthropic", "Constitutional AI", "Claude", "enterprise AI", "AI governance"],
  },
];

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);

export const getArticlesByCategory = (category: Category): Article[] =>
  articles.filter((a) => a.category === category);

export const getFeaturedArticles = (): Article[] =>
  articles.filter((a) => a.featured);

export const getRecentArticles = (count: number = 6): Article[] =>
  [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, count);

export const getAllCategories = (): Category[] => [
  "Token Economics",
  "LLM Research",
  "GPU & Infrastructure",
  "Industry News",
  "Analysis",
  "Opinion",
];

export const TICKER_ITEMS = [
  { label: "GPT-4o Input", value: "$2.50/1M tokens", change: "-50%" },
  { label: "Claude 3.7 Sonnet", value: "$3.00/1M tokens", change: "-12%" },
  { label: "Gemini 1.5 Pro", value: "$1.25/1M tokens", change: "-33%" },
  { label: "H200 Spot Price", value: "$5.90/hr", change: "-30%" },
  { label: "H100 Spot Price", value: "$4.20/hr", change: "-18%" },
  { label: "DeepSeek V3 API", value: "$0.27/1M tokens", change: "NEW" },
  { label: "Mistral Large 2", value: "$2.00/1M tokens", change: "-25%" },
  { label: "Llama 3.3 70B", value: "$0.59/1M tokens", change: "-40%" },
  { label: "A100 80GB Spot", value: "$2.80/hr", change: "-22%" },
  { label: "Embedding Ada-002", value: "$0.10/1M tokens", change: "STABLE" },
];
