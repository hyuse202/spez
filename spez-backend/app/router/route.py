# app/main.py

from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from typing import List
from .. import  schemas, crud
from ..database import  get_db

router = APIRouter(
    responses={404: {"description": "Not found"}},
)
# -------------------- User Endpoints --------------------

@router.post("/users/", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_user = crud.create_user(db, user)
    return db_user

@router.get("/users/{user_id}", response_model=schemas.UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# -------------------- Post Endpoints --------------------

@router.post("/posts/", response_model=schemas.PostOut, status_code=status.HTTP_201_CREATED)
def create_post(post: schemas.PostCreate, user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_post = crud.create_post(db, post, user_id)
    return db_post

@router.get("/posts/", response_model=List[schemas.PostOut])
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    posts = crud.get_posts(db, skip=skip, limit=limit)
    return posts

@router.get("/posts/{post_id}", response_model=schemas.PostOut)
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud.get_post(db, post_id=post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

# # -------------------- Comment Endpoints --------------------

# @router.post("/comments/", response_model=schemas.CommentOut, status_code=status.HTTP_201_CREATED)
# def create_comment(comment: schemas.CommentCreate, user_id: int, db: Session = Depends(get_db)):
#     db_user = crud.get_user_by_id(db, user_id=user_id)
#     if not db_user:
#         raise HTTPException(status_code=404, detail="User not found")
#     # Optionally, verify that post_id exists
#     db_post = crud.get_post(db, post_id=comment.post_id)
#     if not db_post:
#         raise HTTPException(status_code=404, detail="Post not found")
#     if comment.parent_id:
#         db_parent = crud.get_comment(db, comment_id=comment.parent_id)
#         if not db_parent:
#             raise HTTPException(status_code=404, detail="Parent comment not found")
#     db_comment = crud.create_comment(db, comment, user_id)
#     return db_comment

# @router.get("/comments/{comment_id}", response_model=schemas.CommentOut)
# def read_comment(comment_id: int, db: Session = Depends(get_db)):
#     db_comment = crud.get_comment(db, comment_id=comment_id)
#     if not db_comment:
#         raise HTTPException(status_code=404, detail="Comment not found")
#     return db_comment

# # -------------------- Like Endpoints --------------------

# @router.post("/likes/", response_model=schemas.LikeOut, status_code=status.HTTP_201_CREATED)
# def create_like(like: schemas.LikeCreate, user_id: int, db: Session = Depends(get_db)):
#     # Ensure that either post_id or comment_id is provided
#     if not like.post_id and not like.comment_id:
#         raise HTTPException(status_code=400, detail="Either post_id or comment_id must be provided")
    
#     # Ensure the target exists
#     if like.post_id:
#         db_post = crud.get_post(db, post_id=like.post_id)
#         if not db_post:
#             raise HTTPException(status_code=404, detail="Post not found")
#     if like.comment_id:
#         db_comment = crud.get_comment(db, comment_id=like.comment_id)
#         if not db_comment:
#             raise HTTPException(status_code=404, detail="Comment not found")
    
#     # Check if the user has already liked the target
#     if like.post_id:
#         existing_like = db.query(models.Like).filter(
#             models.Like.user_id == user_id,
#             models.Like.post_id == like.post_id
#         ).first()
#     else:
#         existing_like = db.query(models.Like).filter(
#             models.Like.user_id == user_id,
#             models.Like.comment_id == like.comment_id
#         ).first()
    
#     if existing_like:
#         raise HTTPException(status_code=400, detail="Like already exists")
    
#     db_like = crud.create_like(db, like, user_id)
#     return db_like

# -------------------- Additional Endpoints --------------------

# Implement endpoints for updating and deleting posts, comments, likes, etc.
