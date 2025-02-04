from dotenv import load_dotenv
import os

load_dotenv()
ai_key = os.getenv("GEMINI_API_KEY")

from langchain.chains.summarize import load_summarize_chain
from langchain.docstore.document import Document
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.text_splitter import CharacterTextSplitter

target_len = 500
chunk_size = 3000
chunk_overlap = 200

text_splitter = CharacterTextSplitter(
    chunk_size=chunk_size,
    chunk_overlap=chunk_overlap,
    length_function=len,
)

model = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.75,
    top_p=0.5,
    api_key=ai_key
)

prompt_template = """Act as a professional technical meeting minutes writer. 
Tone: formal
Format: Technical meeting summary
Length:  100 ~ 250
Tasks:
- highlight action items and owners
- highlight the agreements (if any)
- Use bullet points if needed
{text}
CONCISE SUMMARY IN ENGLISH:"""

prompt = PromptTemplate(
    template=prompt_template,
    input_variables=["text"]
)

refine_template = (
        "Your job is to produce a final summary\n"
        # "We have provided an existing summary up to a certain point: {existing_answer}\n"
        "We have the opportunity to make the summary"
        "with some more context below.\n"
        "------------\n"
        "{text}\n"
        "------------\n"
        f"Given the new context, produce a summary in English within {target_len} words: following the format"
        "Participants: <participants>"
        "Discussed: <Discussed-items>"
        "Follow-up actions (if any): <a-list-of-follow-up-actions-with-owner-names>"
        "Highlight agreements and follow-up actions and owners. (if any) and do not write in markdown format!"
    )

refine_prompt = PromptTemplate(
    input_variables=["text"],
    template=refine_template
)

chain = load_summarize_chain(
    model,
    chain_type="refine",
    return_intermediate_steps=True,
    question_prompt=prompt,
    refine_prompt=refine_prompt
)

def generate_MoM(record: str):
    texts =  text_splitter.split_text(record)
    docs = [Document(page_content=text) for text in texts[:]]
    response = chain({ "input_documents": docs }, return_only_outputs=True)

    return response["output_text"]

if __name__ == "__main__":
    import os

    with open(os.getcwd() + "/record.txt", "r") as file:
        meet_record = file.read()
    
    mOm = generate_MoM(meet_record)
    print(mOm)