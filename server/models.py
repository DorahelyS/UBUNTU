from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.model, SerializerMixin):
    #table name
    __tablename__ = "users"
    
    #creating columns 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    position = db.Column(db.String)
    age = db.Column(db.Integer)

    #creating ORM relationships - through the model aka class
    #user = db.relationship('User', back_populates='users_emotions')
    #users_emotions = db.relationship('User_Emotion', back_populates='user')

    #user_like = db.relationship('User', back_populates='likes')
    #likes = db.relationship('Like', back_populates='user_like')

    #user_journal = db.relationship('User', back_populates='journals')
    #journals = db.relationship('Journal', back_populates='user_journal')

    #serialization rules to stop recursion

class Emotion(db.model, SerializerMixin):
    #table name
    __tablename__ = "emotions"

    #creating columns
    id = db.Column(db.Integer, primary_key=True)
    emotion = db.Column(db.String)
    date_stamp = db.Column(db.DateTime, server_default=db.func.now())

    #creating ORM relationships - through the model aka class
    #emotion = db.relationship('Emotion' , back_populates='users_emotions')
    #users_emotions = db.relationship('User_Emotion', back_populates='emotion')

    #emotion_like = db.relationship('Emotion' , back_populates='likes')
    #likes = db.relationship('Like', back_populates='emotion_like')


class User_Emotion(db.model, SerializerMixin):
    #table name
    __tablename__ = "users_emotions"

    #creating columns
    id = db.Column(db.Integer, primary_key=True)

    #creating table relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    emotion_id = db.Column(db.Integer, db.ForeignKey('emotions.id'))

    #creating columns
    emotion_intensity = db.Column(db.Integer)

    #creating ORM relationships - through the model aka class
    #user = db.relationship('User', back_populates='users_emotions')
    #emotion = db.relationship('Emotion' , back_populates='users_emotions')

class Like(db.model, SerializerMixin):
    #table name
    __tablename__ = "likes"

    #creating columns
    id = db.Column(db.Integer, primary_key=True)

    #creating table relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    emotion_id = db.Column(db.Integer, db.ForeignKey('emotions.id'))

    #creating ORM relationships - through the model aka class
    #user_like = db.relationship('User', back_populates='likes')
    #emotion_like = db.relationship('Emotion' , back_populates='likes')

'''
class Journal(db.model, SerializerMixin):
    #table name
    __tablename__ = "journals"

    #creating columns
    id = db.Column(db.Integer, primary_key=True)

    #creating table relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #creating ORM relationships - through the model aka class
    user_journal = db.relationship('User', back_populates='journals')
'''
