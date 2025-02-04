import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import BaseChatMessageHistory, InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain.schema import HumanMessage, AIMessage

load_dotenv()
ai_key = os.getenv("GEMINI_API_KEY")

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.63,
    top_p=0.62,
    api_key=ai_key
)

instruction = """Extract the meeting summary from the given transcript. Keep your tone formal.
    Each point should be a written as a separate sentence and do not use bullet points.
    The entire thing should be presented as a paragraph. Keep in mind this is supposed to be minutes of the meeting.
    """

instruction_prompt = ChatPromptTemplate.from_messages([
        ("system", instruction),
        MessagesPlaceholder(variable_name="messages")
])

chained_model = instruction_prompt | llm

# # a dictionary for storing the session ID
store = {}

# checks for the presence of already existing session ID
def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

with_message_history = RunnableWithMessageHistory(chained_model, get_session_history)
config = {"configurable": {"session_id": "trial2020"}}

def extract_meeting_info(text_corpus):
    prompt = "Transcript:\n" + text_corpus
    summary_response = with_message_history.invoke(
        [HumanMessage(content=prompt)],
        config=config
    ).content.split(".")
    meeting_summary = [word.strip() for word in summary_response]
    
    topic_prompt = """
    Based on the context of the meeting, extract the topic of the meeting.
    Return only the topic as a single string.
    """
    meeting_topic = with_message_history.invoke(
        [HumanMessage(content=topic_prompt)],
        config=config
    ).content.strip()
    
    return {
        "meeting_topic": meeting_topic,
        "meeting_summary": meeting_summary
    }

# Example usage
if __name__ == "__main__":
    with open("record.txt", "r") as file:
        text_corpus = file.read()

    output_dict = extract_meeting_info(text_corpus)
    
    print("Topic: ", output_dict['meeting_topic'])
    print("Summary: ", output_dict['meeting_summary'])