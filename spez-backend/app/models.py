# app/models.py

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
    Enum,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    posts = relationship('Post', back_populates='author', cascade="all, delete-orphan")
    # comments = relationship('Comment', back_populates='author', cascade="all, delete-orphan")
    # likes = relationship('Like', back_populates='user', cascade="all, delete-orphan")


class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    author_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    author = relationship('User', back_populates='posts')
    # comments = relationship('Comment', back_populates='post', cascade="all, delete-orphan")
    # likes = relationship('Like', back_populates='post', cascade="all, delete-orphan")


# class Comment(Base):
#     __tablename__ = 'comments'

#     id = Column(Integer, primary_key=True, index=True)
#     content = Column(Text, nullable=False)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
#     updated_at = Column(DateTime(timezone=True), onupdate=func.now())
#     author_id = Column(Integer, ForeignKey('users.id'), nullable=False)
#     post_id = Column(Integer, ForeignKey('posts.id'), nullable=False)
#     parent_id = Column(Integer, ForeignKey('comments.id'), nullable=True)

#     author = relationship('User', back_populates='comments')
#     post = relationship('Post', back_populates='comments')
#     replies = relationship('Comment', backref='parent', cascade="all, delete-orphan")
#     likes = relationship('Like', back_populates='comment', cascade="all, delete-orphan")


# class LikeType(enum.Enum):
#     post = "post"
#     comment = "comment"


# class Like(Base):
#     __tablename__ = 'likes'

#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
#     post_id = Column(Integer, ForeignKey('posts.id'), nullable=True)
#     comment_id = Column(Integer, ForeignKey('comments.id'), nullable=True)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())

#     user = relationship('User', back_populates='likes')
#     post = relationship('Post', back_populates='likes')
#     comment = relationship('Comment', back_populates='likes')

#     __table_args__ = (
#         UniqueConstraint('user_id', 'post_id', name='unique_user_post_like'),
#         UniqueConstraint('user_id', 'comment_id', name='unique_user_comment_like'),
#     )
