from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, HTMLResponse
import shutil
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from BillExtractor import BillExtractor
import sqlite3

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






@app.post("/add-db/")
async def add_to_db(data):
    print(data)
    
    return JSONResponse(content={"data": "added to DB"})





@app.get("/fetch-db/")
async def upload_pdf():
    
    return JSONResponse(content={"data": "data inside the db"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
