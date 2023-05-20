from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ingest import ingest_docs
import time

app = FastAPI()
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

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
    file_path = f"${UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(contents)
    return {"filename": file.filename, "status": "uploaded"}


@app.post("/train")
async def train_model(body: dict):
    print(body)
    filename = body['filename']
    urls = body['urls']
    userId = body['userId']
    botName = body['botName']
    botInitialDescription = body['botInitialDescription']

    print(urls, filename, userId)
    file_path = f"{UPLOAD_DIR}/{filename}"
    ingest_docs(urls, file_path, userId)

    return {"message": "JSON body printed successfully"}


@app.post('/chat')
async def chat(body: dict):
    print(body)
    time.sleep(2)
    return {'response': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint a perspiciatis voluptas delectus doloribus ipsum culpa eligendi temporibus. Reiciendis, sed. Possimus eius unde et, laudantium officia ratione sint cupiditate voluptas!'}


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
