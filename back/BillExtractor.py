from langchain_community.llms import OpenAI
from pypdf import PdfReader
import pandas as pd
import re
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain.agents.agent_types import AgentType

import openai
import os
from dotenv import find_dotenv, load_dotenv
load_dotenv(find_dotenv())
openai.api_key = os.getenv("OPENAI_API_KEY")


class BillExtractor:
    def __init__(self):
        self._chat = ChatOpenAI(temperature=0.4, model="gtp-3.5-turbo")
        self._llm = OpenAI(temparature=0.3)

    def _get_pdf_text(self, pdf_doc):
        pdf_reader = PdfReader(pdf_doc)
        text = "".join([page.extract_text() for page in pdf_reader.pages])

        return text
    
    def _extract_data(self):
        pages_data = self._get_pdf_text(r"C:\Users\ASUS\Desktop\github_projects\Invoice_Automation\dummy_data\Invoice_1.pdf")
        template = """
            Extract all the following values: BILL ID, BILL TO, Name, Address, Telephone No., SHIP TO, Name, Address, Telephone No., Comments, QUANTITY, DESCRIPTION, UNIT PRICE, TOTAL, SUBTOTAL, SALES TAX, SHIPPING, TOTAL DUE from {pages}.
            The expected output format: {"BILL ID": "998a32b", "BILL TO": {{"Name": "John Smith", "Addresse": "210 Stars Avenue, Berkeley, CA, 78785", "Telephone No.": "(123) 456-7891"},"SHIP TO": {"Name": "John Smith", "Addresse": "210 Stars Avenue, Berkeley, CA, 78785", "Telephone No.": "(123) 456-7891"}, "Comments":"Shipment contains fragile goods", "Product": [{"QUANTITY":20, "DESCRIPTION":"Product #1", "UNIT PRICE":"20.00", "TOTAL":"400.00"},{"QUANTITY":30, "DESCRIPTION":"Product #2", "UNIT PRICE":"20.00", "TOTAL":"400.00"}], "SUBTOTAL": "400.00", "SALES_TAX":12.00, "SHIPPING":"24.99", "TOTAL DUE":"436.99"}}}
        """

        prompt_template = PromptTemplate(input_variables=["pages"], template=template)
        full_response = self._llm(prompt_template.format(pages=pages_data))

        print(full_response)
            



if __name__ == "__main__":
    be = BillExtractor()
    be._extract_data()

