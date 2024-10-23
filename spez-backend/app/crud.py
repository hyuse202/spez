# app/crud.py

from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas
from typing import List, Optional
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------- User CRUD --------------------

def get_user_by_id(db: Session, user_id: int) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# -------------------- Post CRUD --------------------

def get_post(db: Session, post_id: int) -> Optional[models.Post]:
    return db.query(models.Post).filter(models.Post.id == post_id).first()

def get_posts(db: Session, skip: int = 0, limit: int = 10) -> List[models.Post]:
    return db.query(models.Post).offset(skip).limit(limit).all()

def create_post(db: Session, post: schemas.PostCreate, user_id: int) -> models.Post:
    db_post = models.Post(**post.dict(), author_id=user_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

# -------------------- Comment CRUD --------------------

def get_comment(db: Session, comment_id: int) -> Optional[models.Comment]:
    return db.query(models.Comment).filter(models.Comment.id == comment_id).first()

def get_comments_by_post(db: Session, post_id: int, skip: int = 0, limit: int = 10) -> List[models.Comment]:
     return db.query(models.Comment).filter(models.Comment.post_id == post_id).offset(skip).limit(limit).all()
    

def create_comment(db: Session, comment: schemas.CommentCreate, user_id: int) -> models.Comment:
    db_comment = models.Comment(
        content=comment.content,
        post_id=comment.post_id,
        # parent_id=comment.parent_id,
        author_id=user_id
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def update_comment(db: Session, db_comment: models.Comment, updates: schemas.CommentUpdate) -> models.Comment:
    if updates.content is not None:
        db_comment.content = updates.content
    db.commit()
    db.refresh(db_comment)
    return db_comment

def delete_comment(db: Session, comment_id: int):
    db_comment = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if not db_comment:
        return None
    db.delete(db_comment)
    db.commit()

# -------------------- Like CRUD --------------------

def create_like(db: Session, post_id, cmt_id, user_id: int) -> models.Like:
    db_like = models.Like(
        user_id=user_id,
        post_id=post_id,
        comment_id=cmt_id
    )
    db.add(db_like)
    db.commit()
    db.refresh(db_like)
    return db_like

def delete_like(db: Session, like_id: int):
    db_like = db.query(models.Like).filter(models.Like.id == like_id).first()
    if not db_like: 
        return None
    db.delete(db_like)
    db.commit()

def get_like_by_post(db: Session, post_id: int) -> Optional[models.Like]:
    return db.query(models.Like).filter(models.Like.post_id == post_id).count()
    