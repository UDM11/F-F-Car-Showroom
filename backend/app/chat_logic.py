import os
from dotenv import load_dotenv

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableMap
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OpenAIEmbeddings

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Set Chroma DB directory
CHROMA_DIR = "chroma_store"

# Get static vector database
def get_vectordb():
    embeddings = OpenAIEmbeddings()
    vectordb = Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)
    return vectordb

# Get retriever
def get_retriever():
    vectordb = get_vectordb()
    retriever = vectordb.as_retriever(search_kwargs={"k": 2})
    return retriever

# Format documents into plain text
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# Build the chain
def get_chat_chain():
    retriever = get_retriever()

    prompt = ChatPromptTemplate.from_template("""
You are a highly intelligent and accurate assistant. Use only the provided context from the PDF document to answer the question. 
If the answer is not present in the context, reply with "I could not find the answer in the document."

----------------
Context: 
{context}
----------------

Question: {question}

Answer in a clear, concise, and professional tone.
""")

    llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
    output_parser = StrOutputParser()

    def retrieve_docs(x):
        docs = retriever.get_relevant_documents(x["question"])
        return format_docs(docs)

    chain = (
        RunnableMap({
            "context": retrieve_docs,
            "question": lambda x: x["question"]
        })
        | prompt
        | llm
        | output_parser
    )

    return chain
