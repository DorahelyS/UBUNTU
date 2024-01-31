#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Emotion, UserEmotion, Like

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        
        # Seed code goes here!
        # This will delete any existing rows
        # so you can run the seed file multiple times without having duplicate entries in your database
        print("Deleting data...")
        User.query.delete()
        Emotion.query.delete()
        UserEmotion.query.delete()
        Like.query.delete()
        print("Starting seed...")

        print("Creating users...")
        user_1 = User(name="Dorahely", email='dorahely@gmail.com', password='passwords', position='engineer1', age=27)
        user_2 = User(name="Monica", email='monica@gmail.com', password='passwords', position='engineer2', age=27)
        user_3 = User(name="Kylie", email='kylie@gmail.com', password='passwords', position='engineer3', age=27)

        db.session.add_all([user_1, user_2, user_3])
        db.session.commit()

        print("Creating emotions...")
        emotion_1 = Emotion(emotion='anxious')
        emotion_2 = Emotion(emotion='stressed')
        emotion_3 = Emotion(emotion='happy')
        emotion_4 = Emotion(emotion='happy')

        db.session.add_all([emotion_1, emotion_2, emotion_3, emotion_4])
        db.session.commit()

        print("Creating join table...")
        user_emotion_1 = UserEmotion(user_id=1, emotion_id=1, emotion_intensity=4)
        user_emotion_2 = UserEmotion(user_id=2, emotion_id=2, emotion_intensity=3)
        user_emotion_3 = UserEmotion(user_id=3, emotion_id=3, emotion_intensity=3)
        user_emotion_4 = UserEmotion(user_id=1, emotion_id=4, emotion_intensity=4)

        db.session.add_all([user_emotion_1, user_emotion_2, user_emotion_3, user_emotion_4])
        db.session.commit()

        print("Creating like table...")
        like_1 = Like(user_id=1, emotion_id=2)
        like_2 = Like(user_id=2, emotion_id=3)
        like_3 = Like(user_id=3, emotion_id=2)

        db.session.add_all([like_1, like_2, like_3])
        db.session.commit()
        
        print("Seeding complete...")