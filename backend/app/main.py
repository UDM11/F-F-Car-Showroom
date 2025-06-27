from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.rag_logic import load_and_split_pdf, embed_and_store
from app.chat_logic import get_chat_chain

app = FastAPI(title="Static PDF RAG Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load and embed static PDF at startup
STATIC_PDF_PATH = "sample.pdf"
docs = load_and_split_pdf(STATIC_PDF_PATH)
embed_and_store(docs)

# Initialize the chat chain
chat_chain = get_chat_chain()

class ChatRequest(BaseModel):
    question: str

@app.get("/")
def root():
    return {"message": "Static PDF Chatbot is running."}

@app.post("/chat")
async def chat_with_bot(request: ChatRequest):
    try:
        response = chat_chain.invoke({"question": request.question})
        answer = response.get("answer") if isinstance(response, dict) else response
        return {"answer": answer}
    except Exception as e:
        return {"error": str(e)}
