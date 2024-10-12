# app/main.py

from fastapi import FastAPI
from .database import engine, Base
from .router import route

# Create all tables in the database (if not already created)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Spez api",
    description="SPez app",
    version="0.2.0",
)

# Include the items router
app.include_router(route.router)