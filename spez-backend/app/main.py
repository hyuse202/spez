# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .router import route

# Create all tables in the database (if not already created)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Spez api",
    description="SPez app",
    version="0.2.0",
)
# origins = [
#     "https://spez.hungnq.online/*",
#     "http://localhost",
#     "http://localhost:3000",
#     "http://localhost:8000"
#     # Add your frontend domain here
# ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include the items router
app.include_router(route.router)