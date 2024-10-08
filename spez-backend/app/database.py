
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')
# Create the SQLAlchemy engine
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set.")
print('ss')
engine = create_engine( DATABASE_URL,  
                        pool_size=20,          
                        max_overflow=0,       
                        pool_timeout=30,      
                        pool_recycle=1800, )

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class for models
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
