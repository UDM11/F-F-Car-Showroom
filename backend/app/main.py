from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.rag_logic import load_and_split_pdf, embed_and_store
from app.chat_logic import get_chat_chain

app = FastAPI(title="Static PDF RAG Chatbot")

# Enable CORS to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace '*' with your frontend URL(s)
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

# Request model
class ChatRequest(BaseModel):
    question: str

@app.get("/")
def root():
    return {"message": "Static PDF Chatbot is running."}

@app.post("/chat")
async def chat_with_bot(request: ChatRequest):
    try:
        response = chat_chain.invoke({"question": request.question})
        # If response is a dict or object with 'answer' key, extract it, else return full response
        answer = response.get("answer") if isinstance(response, dict) else response
        return {"answer": answer}
    except Exception as e:
        return {"error": str(e)}
