from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

class InputData(BaseModel):
    input: str
    email: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/no-memory")
async def no_memory(data: InputData):
    return {"response": f"No Memory: {data.input}", "email": data.email}

@app.post("/short-term")
async def short_term(data: InputData):
    return {"response": f"Short-Term: {data.input}", "email": data.email}

@app.post("/long-term")
async def long_term(data: InputData):
    return {"response": f"Long-Term: {data.input}", "email": data.email}

@app.post("/short-long-term")
async def short_long_term(data: InputData):
    return {"response": f"Short-Term + Long-Term: {data.input}", "email": data.email}
