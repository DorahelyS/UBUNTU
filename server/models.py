from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
# independet model #1 
class User(db.Model, SerializerMixin):
    # table name
    __tablename__ = "users"
    
    # creating columns 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    email = db.Column(db.String)
    #password = db.Column(db.String)
    position = db.Column(db.String)
    age = db.Column(db.Integer)

    # creating ORM relationships - through the model aka class
    # user = db.relationship('User', back_populates='users_emotions')
    users_emotions = db.relationship('UserEmotion', back_populates='user')

    # user_like = db.relationship('User', back_populates='users_likes')
    users_likes = db.relationship('Like', back_populates='user_like')

    # user_journal = db.relationship('User', back_populates='journals')
    # journals = db.relationship('Journal', back_populates='user_journal')

    # serialization rules to stop recursion
    serialize_rules = ('-users_emotions.user', '-users_emotions.emotion', '-users_likes.emotion_like','-users_likes.user_like')


# independent model #2
class Emotion(db.Model, SerializerMixin):
    # table name
    __tablename__ = "emotions"

    # creating columns
    id = db.Column(db.Integer, primary_key=True)
    emotion = db.Column(db.String)
    #date_stamp = db.Column(db.DateTime, server_default=db.func.now())

    # creating ORM relationships - through the model aka class
    # emotion = db.relationship('Emotion' , back_populates='emotions_users')
    emotions_users = db.relationship('UserEmotion', back_populates='emotion')

    # emotion_like = db.relationship('Emotion' , back_populates='emotions_likes')
    emotions_likes = db.relationship('Like', back_populates='emotion_like')

    # serialization rules to stop recursion
    serialize_rules = ('-emotions_users.emotion', '-emotions_users.user','-emotions_likes.user_like','-emotions_likes.emotion_like')


# independent model #3
class UserEmotion(db.Model, SerializerMixin):
    # table name
    __tablename__ = "user_emotion"

    # creating columns
    id = db.Column(db.Integer, primary_key=True)

    # creating table relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    emotion_id = db.Column(db.Integer, db.ForeignKey('emotions.id'))
  
    # creating addittional columns
    color = db.Column(db.String)
    emotion_intensity = db.Column(db.Integer)
    date_stamp = db.Column(db.DateTime, server_default=db.func.now())

    # creating ORM relationships - through the model aka class
    user = db.relationship('User', back_populates='users_emotions')
    emotion = db.relationship('Emotion' , back_populates='emotions_users')

    # serialization rules to stop recursion
    serialize_rules = ('-user.users_emotions', '-emotion.emotions_users')



# independent model #4
class Like(db.Model, SerializerMixin):
    # table name
    __tablename__ = "likes"

    # creating columns
    id = db.Column(db.Integer, primary_key=True)

    # creating table relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    emotion_id = db.Column(db.Integer, db.ForeignKey('emotions.id'))

    # creating ORM relationships - through the model aka class
    user_like = db.relationship('User', back_populates='users_likes')
    emotion_like = db.relationship('Emotion' , back_populates='emotions_likes')

    # serialization rules to stop recursion
    serialize_rules = ('-user_like.users_likes', '-emotion_like.emotions_likes')

'''
# independent model #5 - STRETCH GOAL
class Journal(db.Model, SerializerMixin):
    #table name
    __tablename__ = "journals"

    #creating columns
    id = db.Column(db.Integer, primary_key=True)

    #creating table relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #creating ORM relationships - through the model aka class
    user_journal = db.relationship('User', back_populates='journals')
'''
