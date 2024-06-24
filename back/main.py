from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, HTMLResponse
import shutil
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from BillExtractor import BillExtractor

be = BillExtractor()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()



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

    print(headers)
    return JSONResponse(content={"data": data, "headers": headers})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
