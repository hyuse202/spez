# app/main.py

from fastapi import Depends, HTTPException, status, APIRouter, Query
from sqlalchemy.orm import Session
from typing import List
from .. import  schemas, crud
from ..database import  get_db
from ..auth import create_access_token, authenticate_user, get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from .. import auth, models
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

# -------------------- User Profile Endpoints --------------------
@router.post("/users/{user_id}/profile/", response_model=schemas.UserProfileOut)
def create_user_profile(user_id: int, profile: schemas.UserProfileCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_profile = models.UserProfile(**profile.dict(), user_id=user_id)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    
    return db_profile

@router.get("/users/{user_id}/profile/", response_model=schemas.UserProfileOut)
def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    db_profile = db.query(models.UserProfile).filter(models.UserProfile.user_id == user_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return db_profile

# -------------------- Post Endpoints --------------------

@router.post("/posts/", response_model=schemas.PostOut, status_code=status.HTTP_201_CREATED)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_user = crud.get_user_by_id(db, user_id=current_user.id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_post = crud.create_post(db, post, current_user.id)
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

# -------------------- Comment Endpoints --------------------

@router.post("/comments/", response_model=schemas.CommentOut, status_code=status.HTTP_201_CREATED)
def create_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # db_user = crud.get_user_by_id(db, user_id=current_user)
    # if not db_user:
    #     raise HTTPException(status_code=404, detail="User not found")
    # # Optionally, verify that post_id exists
    # db_post = crud.get_post(db)
    # if not db_post:
    #     raise HTTPException(status_code=404, detail="Post not found")
    # if comment.parent_id:
    #     db_parent = crud.get_comment(db, comment_id=comment.parent_id)
    #     if not db_parent:
    #         raise HTTPException(status_code=404, detail="Parent comment not found")
    db_comment = crud.create_comment(db, comment, current_user.id)
    return db_comment

@router.get("/comments/{comment_id}", response_model=schemas.CommentOut)
def read_comment(comment_id: int, db: Session = Depends(get_db)):
    db_comment = crud.get_comment(db, comment_id=comment_id)
    if not db_comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment
@router.get("/posts/cmt/{post_id}", response_model=List[schemas.CommentOut])
def read_comments(
    post_id: int, 
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(10, ge=1, le=100, description="Maximum number of records to return"), 
    db: Session = Depends(get_db)
):
    comments = crud.get_comments_by_post(db, post_id=post_id, skip=skip, limit=limit)
    # paginated_comments = schemas.PaginatedComments(total=total, skip=skip, limit=limit, comments=comments)
    return comments

@router.delete("/comments/{comment_id}", response_model=schemas.CommentOut)
def delete_comment(comment_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_item = crud.delete_comment(db=db, comment_id=comment_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_item
# # -------------------- Like Endpoints --------------------

@router.get("/likes/post/{post_id}")
def get_like_by_post(post_id: int, db: Session = Depends(get_db)):
    db_item = crud.get_like_by_post(db = db, post_id=post_id)
    return db_item


@router.post("/likes/", response_model=schemas.LikeOut, status_code=status.HTTP_201_CREATED)
def create_like(like: schemas.LikeCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Ensure that either post_id or comment_id is provided
    # if not like.post_id and not like.comment_id:
    #     raise HTTPException(status_code=400, detail="Either post_id or comment_id must be provided")
    
    # # Ensure the target exists
    # if like.post_id:
    #     db_post = crud.get_post(db, post_id=like.post_id)
    #     if not db_post:
    #         raise HTTPException(status_code=404, detail="Post not found")
    # if like.comment_id:
    #     db_comment = crud.get_comment(db, comment_id=like.comment_id)
    #     if not db_comment:
    #         raise HTTPException(status_code=404, detail="Comment not found")
    
    # # Check if the user has already liked the target
    # if like.post_id:
    #     existing_like = db.query(models.Like).filter(
    #         models.Like.user_id == user_id,
    #         models.Like.post_id == like.post_id
    #     ).first()
    # else:
    #     existing_like = db.query(models.Like).filter(
    #         models.Like.user_id == user_id,
    #         models.Like.comment_id == like.comment_id
    #     ).first()
    
    # if existing_like:
    #     raise HTTPException(status_code=400, detail="Like already exists")
    
    db_like = crud.create_like(db, like, current_user.id)
    return db_like
@router.delete("/likes/{like_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_like(like_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # db_like = db.query(models.Like).filter(models.Like.id == like_id).first()
    # if not db_like:
    #     raise HTTPException(status_code=404, detail="Like not found")
    crud.delete_like(db, like_id)
    return


# -------------------- Token Endpoints --------------------


@router.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Authenticate user and return a JWT token.
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)},  # Using user ID as the subject
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# -------------------- Protected Routes Example --------------------

@router.get("/users/me/", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user
