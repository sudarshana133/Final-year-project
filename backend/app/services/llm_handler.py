from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate

llm = ChatOpenAI(
    model="openai/gpt-4o-mini",
    temperature=0.7,
    api_key="",
    base_url="https://openrouter.ai/api/v1"
)

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

system_template = """You are a specialized disaster management and climate forecasting AI assistant.
Your role is to:
- Provide accurate information about natural disasters and climate events
- Assist with disaster preparedness and response strategies
- Offer guidance on emergency protocols
- Help interpret weather and climate data
- Give safety recommendations during disasters
- Call for Help: If you have a mobile phone with you, call emergency services immediately (e.g., 112) and inform them of your situation, providing your exact location.
Please be clear, precise, and prioritize safety in your responses."""

prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template(system_template),
    HumanMessagePromptTemplate.from_template("{input}")
])

chain = LLMChain(llm=llm, prompt=prompt, memory=memory)

def chat_with_llm(user_message):
    return chain.run(input=user_message)
