# Page: llm-basics/intro
author: Narayan Verma
lastUpdated: March 24, 2026
---

# Introduction to LLMs

Large Language Models (LLMs) are the backbone of modern AI. At its core, an LLM is a "big AI brain" trained on massive amounts of text—books, articles, websites, and code. It learns the nuances of language, the relationships between words, and various writing styles.

![LLM Architecture](/docs/llm-basics/llm_architecture.png)

## What can LLMs do?

LLMs aren't just for chatting. They are capable of:
1. **Generating human-like text:** Writing emails, essays, and stories.
2. **Code Generation:** Writing and debugging software.
3. **Translation:** Converting between hundreds of languages.
4. **Summarization:** Condensing long documents into key points.

## Where LLMs fit in AI

It's helpful to understand the hierarchy:
**AI → Machine Learning → Deep Learning → NLP → LLMs → Generative AI**

LLMs use a specific type of deep learning called a **Transformer**. This architecture allows the model to process text in parallel and understand complex relationships between words, regardless of their distance in a sentence.



---

# Page: llm-basics/tokenization
author: Narayan Verma
lastUpdated: March 24, 2026
---

# Tokenization: How AI Reads

Before an LLM can process text, it needs to break it down into smaller units called **tokens**. Think of tokens as the "atoms" of language for the model.

![Tokenization Process](/docs/llm-basics/tokenization_process.png)

## Types of Tokenization

1. **Word-level:** Each token is a whole word. "Hello" is one token.
2. **Character-level:** Each token is a single letter. Extremely granular but inefficient for large texts.
3. **Subword-level (Popular):** The "sweet spot" used by most modern models like GPT-4. It breaks words into meaningful parts. 
   - *Example:* "Unbelievable" → `un` + `believ` + `able`.

## Byte Pair Encoding (BPE)
BPE is a popular hybrid method that starts with characters and progressively merges the most frequent pairs. This allows the model to handle rare words efficiently by breaking them down into familiar sub-parts.



---

# Page: llm-basics/embeddings
author: Narayan Verma
lastUpdated: March 24, 2026
---

# Embeddings: Turning Words into Numbers

Computers don't understand words; they understand math. **Embeddings** are the bridge between human language and machine calculation. They convert every token into a list of numbers, called a **vector**.

![Embeddings Vector Space](/docs/llm-basics/embeddings_vector_space.png)

## Semantic Meaning
The magic of embeddings is that **words with similar meanings get similar numbers**. In a high-dimensional mathematical space, "King" and "Queen" would be positioned very close to each other.

## How it's Learned
1. **Random Start:** Every word starts with random numbers.
2. **Prediction:** The model tries to predict the next word.
3. **Adjustment:** If it's wrong, it slightly adjusts the numbers to reduce the error.
4. **Repetition:** After millions of iterations, the numbers perfectly capture the relationships between words.



---

# Page: llm-basics/foundation-models
author: Narayan Verma
lastUpdated: March 24, 2026
---

# Foundation Models

A **Foundation Model (FM)** is a large AI model trained on massive, unlabeled data. It develops a broad, general understanding that can be adapted to many different tasks.

## The Swiss Army Knife Analogy
A Foundation Model is like a **Swiss Army knife**—it can do many things decently. An LLM is like a specialized woodworking kit—it's perfected for one specific job (language).

| Traditional AI | Foundation Models |
| :--- | :--- |
| Needed huge **labeled** datasets | Trained on **unlabeled** massive data |
| One model = one task only | One model = many tasks |
| Expert labelers required | Self-supervised learning |

## Scale Matters
Modern FMs have billions or even trillions of **parameters**. These parameters act like the "connections" in a brain, allowing the model to capture subtle patterns and logic.



---

# Page: llm-basics/rag
author: Narayan Verma
lastUpdated: March 24, 2026
---

# Retrieval-Augmented Generation (RAG)

LLMs have a "knowledge cutoff"—they only know what they were trained on. **RAG** is a technique that gives LLMs access to external, up-to-date information.

![RAG Pipeline](/docs/llm-basics/rag_pipeline.png)

## How RAG Works
1. **Retrieve:** When you ask a question, the system searches your documents for relevant facts.
2. **Augment:** Those facts are "stuffed" into the prompt along with your question.
3. **Generate:** The LLM uses the provided facts to generate a more accurate, up-to-date answer.

## Scalable RAG Architecture
For large-scale apps, you need a robust pipeline:
- **Vector Databases:** High-speed storage for embeddings.
- **Search Engines:** Like "Search engines that talk back", integrating real-time web results.
- **Verification:** LangSmith can be used to monitor and evaluate RAG performance.



---

# Page: llm-basics/gpu-and-ai-intro
author: Narayan Verma
lastUpdated: March 24, 2026
---

# Hardware & The Transformer Evolution

Deep learning requires massive compute power. This is where GPUs and specialized architectures come into play.

![GPU and AI Intro](/docs/llm-basics/gpu_ai_intro.png)

## GPU Power: Video Editing & Deep Learning
GPUs (Graphics Processing Units) are designed for parallel processing. While a CPU handles complex serial tasks, a GPU can process thousands of simple operations simultaneously—making them perfect for the matrix multiplications required in deep learning.

## Tick Rate & Efficiency
In multiplayer game servers, **Tick Rate** determines how often the server updates the game state. Similarly, in AI, efficiency matters. **Multiplayer game servers save millions** by optimizing these update cycles—a lesson applied to scaling AI training as well.

## Evolution: RNNs to Transformers
1. **RNNs (Recurrent Neural Networks):** Sequential processing (slow, long-range memory issues).
2. **Transformers ('Attention Is All You Need'):** Parallel processing with the Attention Mechanism. It allows the model to "look" at all parts of a sentence simultaneously.
3. **The Illusion of Thinking:** Apple recently exposed that AI doesn't always "reason" like humans; it often provides a sophisticated "illusion of thinking" via pattern matching.



---

# Page: llm-basics/llm-crash-course
author: Narayan Verma
lastUpdated: March 24, 2026
---

# LLM Crash Course: From Prompts to Parameters

A deep dive into the mechanics and interaction patterns of Large Language Models.

![LLM Crash Course](/docs/llm-basics/llm_crash_course.png)

## Chapter 1: Getting Started
Understanding the basics of model architectures and how they generate text token-by-token.

## Chapter 2: Embeddings & Parameters
- **Embeddings:** High-dimensional vectors representing semantic meaning.
- **Parameters:** The "knowledge" stored in the model's weights.

## Chapter 3: Prompt Engineering Patterns
- **Zero-Shot:** Direct query.
- **Few-Shot:** Providing examples.
- **Chain of Thought (CoT):** Encouraging step-by-step reasoning.
- **Wait, Context Beats Prompts!** Giving the model relevant context (via RAG or long windows) is often more powerful than just a sophisticated prompt.



---

# Page: llm-basics/ai-agents
author: Narayan Verma
lastUpdated: March 24, 2026
---

# AI Agents: AI That Acts

Agents are a step beyond assistants; they aren't just for chatting—they are built to **do**.

![AI Agents in Action](/docs/llm-basics/ai_agents.png)

## AI Assistant vs AI Agent
- **Assistant:** Static conversation partner (e.g., standard ChatGPT).
- **Agent:** Autonomous system that uses tools (terminal, browser, APIs) to achieve a goal.

## Large Action Models (LAM)
LAMs are specialized for **Actions, Not Just Talks**. They understand UI and API structures to navigate and execute complex tasks across software platforms.

## Agentic AI in Practice
- **Personal Finance App (MetaGPT/MGX):** Building complex apps with a single high-level prompt.
- **Autonomous Agents & Microsoft Copilot:** AI that works alongside you in your OS and apps.
- **Production Debugging:** How an AI agent debugged a production incident in 80 seconds for just 60 cents.

## Risks & The Edge
- **The "Broken" Agent:** Why AI coding agents keep breaking on your laptop (resource constraints & context loss).
- **OpenClaw (Dangerous AI):** The risks of unrestricted autonomous projects and how companies like NVIDIA intervene.



---

# Page: llm-basics/mcp
author: Narayan Verma
lastUpdated: March 24, 2026
---

# Model Context Protocol (MCP)

MCP is the "USB-C" for AI systems—a standard protocol for connecting AI to tools and data.

![MCP Connector](/docs/llm-basics/mcp_protocol.png)

## Why it's a Game-Changer
MCP allows tools like Claude, GPT, and specialized agents to talk to:
- **Local Files & Codebases**
- **SaaS APIs (GitHub, Postman, etc.)**
- **Databases**

## MCP Architecture
- **MCP Client:** The AI interface.
- **MCP Server:** The bridge to the tool/data.
- **REST vs WebSockets vs MCP:** MCP provides a more structured, AI-first way to handle context than traditional APIs.

## Tooling: Postman MCP Agent Generator
Postman's new generator makes it incredibly easy to expose existing APIs as MCP servers, allowing agents to "browse" and use your APIs instantly.

## Security: Identity & RBAC
The security problem with MCP involves identity management and Role-Based Access Control. Using protocols like **MCP vs Google's A2A** determines how securely your data is shared with AI.



---

# Page: llm-basics/sql-and-security
author: Narayan Verma
lastUpdated: March 24, 2026
---

# SQL Fundamentals & AI Security

As we build apps with AI, database fundamentals and security are more critical than ever.

![SQL Security Shield](/docs/llm-basics/sql_security.png)

## SQL Joins: The Truth
- **Joins in 30s vs 60s:** Understanding the match logic between tables.
- **Venn Diagram Illusion:** Don't be misled; joins are about Cartesian products and matching, not simple circle overlaps.

## Security: SQL Injection (SQLi)
- **Classic SQLi:** Bypassing login screens with simple string manipulation.
- **Blind SQLi:** Inferring data through true/false responses (with real examples).
- **JavaScript SQLi:** Vulnerabilities in modern Node.js/JS stacks.
- **Prepared Statements:** The #1 way to stop injections by separating logic from data.

## AI Security: Prompt Injection
- **AI Browsers:** How prompt injections can steal your data by hijacking the AI's internal instructions.
- **SaaS Case Study:** "I built a SaaS with GPT... and got hacked." A lesson on the security risks of AI-generated code.



---

# Page: llm-basics/future-of-ai
author: Narayan Verma
lastUpdated: March 24, 2026
---

# The Future of AI Development

New frameworks, tools, and paradigms are shaping the next decade of software.

![Future AI Trends](/docs/llm-basics/future_ai_trends.png)

## The Full AI Agent Stack
Stop confusing the pieces; here's the breakdown:
1. **LangChain:** The framework for building LLM apps.
2. **LangGraph:** Building complex, stateful multi-agent systems.
3. **LangSmith:** Monitoring and debugging production AI.

## Future Tools
- **GitHub Models:** A game-changing update for testing models directly in GitHub.
- **Amazon Q Developer CLI:** AI that codes directly in your terminal.
- **ChatLLM Teams:** Reviewing the "One tool to rule them all".

## Trusting the Tech
- **Why Developers Should Trust AI Code:** Transitioning from skepticism to collaborative productivity.
- **Tailwind's Unexpected AI Problem:** How AI struggles with certain CSS patterns and the future of styling.


