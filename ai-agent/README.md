# AI Agent (RAG)

Express + Prisma (pgvector) + LangChain + Gemini

Upload PDF → extract text → chunk → embed (Gemini) → store in `chunk.vector` → similarity search → context to Gemini → answer

## Workflow vs Agent

- `POST /api/chat` (workflow): **we** decide the steps, always search → prompt → answer
- `POST /api/agent` (agent): **Gemini** decides, `search_documents` (RAG), `query_database` (writes its own read-only SQL) or no tool at all. Response `steps` shows what it chose

## Reference

1. LangChain Chat Model Integration: https://docs.langchain.com/oss/python/integrations/chat
2. LangChain Google GenAI: https://docs.langchain.com/oss/javascript/integrations/chat/google_generative_ai
3. pgvector: https://github.com/pgvector/pgvector
