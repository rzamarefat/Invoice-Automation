from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import JSONResponse, HTMLResponse
import shutil
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from BillExtractor import BillExtractor
import sqlite3
from typing import List, Optional
from pydantic import BaseModel

be = BillExtractor()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()

conn = sqlite3.connect('bills.db')
cursor = conn.cursor()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to store uploaded files
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    print(file)
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDFs are allowed.")
    
    file_location = UPLOAD_DIR / file.filename
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    data = be._extract_data(file_location)

    headers = list(data.keys())

    
    return JSONResponse(content={"data": data, "headers": headers})





class Address(BaseModel):
    name: str
    address: str
    city: str
    state: str
    zipCode: str
    telephoneNo: str

class Item(BaseModel):
    billId: str
    billTo: Address
    shipTo: Address
    comments: Optional[str]
    quantity: List[int]
    description: List[str]
    unitPrice: List[float]
    total: List[float]
    subtotal: float
    salesTax: float
    shipping: float
    totalDue: float






@app.post("/add-db/")
async def add_to_db(items: List[Item]):
    for item in items:
        cursor.execute('''
        INSERT INTO users (billId,billTo,shipTo,comments,quantity,description,unitPrice,total,subtotal,salesTax,shipping,totalDue)
        VALUES (?, ?)
        ''', (item.billId,item.billTo,item.shipTo,item.comments,item.quantity,item.description,item.unitPrice,item.total,item.subtotal,item.salesTax,item.shipping,item.totalDue))
        conn.commit()
    
    return JSONResponse(content={"data": "added to DB"})





@app.get("/fetch-db/")
async def fetch_db():
    
    return JSONResponse(content={"data": "data inside the db"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
