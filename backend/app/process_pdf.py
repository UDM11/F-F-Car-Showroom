from app.rag_logic import load_and_split_pdf, embed_and_store

pdf_path = "sample.pdf"  # adjust if needed

split_docs = load_and_split_pdf(pdf_path)
embed_and_store(split_docs)

print("PDF processed and embedded successfully.")
