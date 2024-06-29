from langchain_community.llms import OpenAI
from pypdf import PdfReader
import pandas as pd
import re
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain.agents.agent_types import AgentType
import ast
import openai
import os
from dotenv import find_dotenv, load_dotenv


load_dotenv(find_dotenv())
openai.api_key = os.getenv("OPENAI_API_KEY")


class BillExtractor:
    def __init__(self):
        self._chat = ChatOpenAI(temperature=0.4, model="gtp-3.5-turbo")
        self._llm = OpenAI(temperature=0.3, max_tokens=1500)

    def _get_pdf_text(self, pdf_doc):
        pdf_reader = PdfReader(pdf_doc)
        text = "".join([page.extract_text() for page in pdf_reader.pages])

        return text
    
    def _extract_data(self, pdf):
        pages_data = self._get_pdf_text(pdf)
        
        template = """
            Extract all the following values: BILL ID, BILL TO, Name, Address, Telephone No., SHIP TO, Name, Address, Telephone No., Comments, QUANTITY, DESCRIPTION, UNIT PRICE, TOTAL, SUBTOTAL, SALES TAX, SHIPPING, TOTAL DUE from {pages}.
            Format the above data into a Python dictionary. Ensure the dictionary keys are descriptive and all of them are written in small case and the values are correctly assigned based on the extracted data.
            Please make sure that there is no space in keys name. instead of space use camelCase format.
            Formatted Python Dictionary:
        """

        prompt_template = PromptTemplate(input_variables=["pages"], template=template)
        full_response = self._llm(prompt_template.format(pages=pages_data))

        full_response = ast.literal_eval(full_response)
        
        for k,v in full_response.items():
            if k in ["description", "quantity", "total", "unitPrice"] and not(isinstance(v, list)):
                full_response[k] = [v]
        print("==================")
        print(full_response)
        print("==================")
        
        return full_response

# if __name__ == "__main__":
#     be = BillExtractor()
#     be._extract_data()

