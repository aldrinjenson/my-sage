from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
# from ingest import ingest_docs

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:8000",
    # Add more allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/status")
async def get_status():
    return {"message": "Server active"}


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    file_path = f"src/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(contents)
    return {"filename": file.filename, "status": "uploaded"}


@app.post("/train")
async def train_model(body: dict):
    print(body)
    return {"message": "JSON body printed successfully"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
