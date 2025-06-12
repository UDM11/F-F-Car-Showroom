import os
from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Set Chroma DB directory
CHROMA_DIR = "chroma_store"

# Set static PDF path
STATIC_PDF_PATH = "sample.pdf"
  # Make sure this file exists in your project root

# Load and split the PDF
def load_and_split_pdf(file_path: str) -> list[Document]:
    loader = PyPDFLoader(file_path)
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    split_docs = splitter.split_documents(docs)
    return split_docs

# Embed and store in Chroma
def embed_and_store(split_docs: list[Document]):
    os.makedirs(CHROMA_DIR, exist_ok=True)
    embeddings = OpenAIEmbeddings()
    vectordb = Chroma.from_documents(split_docs, embeddings, persist_directory=CHROMA_DIR)
    vectordb.persist()
    return vectordb

# Load + Embed everything ONCE at startup
split_docs = load_and_split_pdf(STATIC_PDF_PATH)
vectordb = embed_and_store(split_docs)

# Export for chatbot logic
def get_vectorstore():
    return vectordb
