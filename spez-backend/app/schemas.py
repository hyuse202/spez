from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True
class PostBase(BaseModel):
    title: str = Field(..., max_length=255)
    content: str
class PostCreate(BaseModel):
    title: str
    content: str

class PostOut(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: Optional[datetime]
    author: UserOut

    class Config:
        orm_mode = True

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    post_id: int
    # parent_id: Optional[int] = None  # For nested comments

class CommentUpdate(BaseModel):
    content: Optional[str] = None

class CommentOut(CommentBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    author: UserOut
    post_id: int
    # parent_id: Optional[int]
    # replies: List['CommentOut'] = []  # Recursive relationship
    likes_count: int

    class Config:
        orm_mode = True

# To resolve forward references
CommentOut.update_forward_refs()

# -------------------- Like Schemas --------------------

# class LikeBase(BaseModel):
#     user_id: int
 

class LikeCreate(BaseModel):
    # user_id: int
    post_id: Optional[int]
    comment_id: Optional[int] 
    @classmethod
    def validate_like(cls, **data):
        if not data.get('post_id') and not data.get('comment_id'):
            raise ValueError("Either post_id or comment_id must be provided")
        return cls(**data)

class LikeOut(BaseModel):
    id: int
    user_id: int
    post_id: Optional[int]
    comment_id: Optional[int]
    created_at: datetime

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None

class UserLogin(BaseModel):
    username: str
    password: str