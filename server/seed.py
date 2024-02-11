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

        db.session.commit()

        
        print("Starting seed...")

        print("Creating users...")
        user_1 = User(name="Dorahely", username='DorahelyS', email='dorahely@gmail.com', position='engineer1', age=27)
        user_2 = User(name="Monica", username='MonicaJ', email='monica@gmail.com', position='engineer2', age=27)
        user_3 = User(name="Giselle", username='GiselleA', email='giselle@gmail.com', position='buyer1', age=28)
        user_4 = User(name="Kathryn", username='KathrynD', email='kathryn@gmail.com', position='buyer2', age=30)
        user_5 = User(name="Mimi", username='MimiL', email='mimi@gmail.com', position='buyer1', age=32)
        user_6 = User(name="Jina", username='JinaZ', email='jina@gmail.com', position='engineer2', age=31)

        db.session.add_all([user_1, user_2, user_3, user_4, user_5, user_6])
        db.session.commit()

        print("Creating emotions...")
        emotion_1 = Emotion(emotion='Anger')
        emotion_2 = Emotion(emotion='Sadness')
        emotion_3 = Emotion(emotion='Surprise')
        emotion_4 = Emotion(emotion='Joy')
        emotion_5 = Emotion(emotion='Love')
        emotion_6 = Emotion(emotion='Fear')

        db.session.add_all([emotion_1, emotion_2, emotion_3, emotion_4, emotion_5, emotion_6])
        db.session.commit()

        print("Creating join table...")
        user_emotion_1 = UserEmotion(user_id=1, emotion_id=1, color='Violet', emotion_intensity=4)
        user_emotion_2 = UserEmotion(user_id=2, emotion_id=2, color='Indigo', emotion_intensity=3)
        user_emotion_3 = UserEmotion(user_id=3, emotion_id=3, color='Blue', emotion_intensity=3)
        user_emotion_4 = UserEmotion(user_id=4, emotion_id=4, color='Green', emotion_intensity=4)
        user_emotion_5 = UserEmotion(user_id=5, emotion_id=5, color='Yellow', emotion_intensity=1)
        user_emotion_6 = UserEmotion(user_id=6, emotion_id=6, color='Red', emotion_intensity=3)

        db.session.add_all([user_emotion_1, user_emotion_2, user_emotion_3, user_emotion_4, user_emotion_5, user_emotion_6])
        db.session.commit()

        print("Creating like table...")
        like_1 = Like(user_id=1, emotion_id=2)
        like_2 = Like(user_id=2, emotion_id=3)
        like_3 = Like(user_id=3, emotion_id=2)

        db.session.add_all([like_1, like_2, like_3])
        db.session.commit()
        
        print("Seeding complete...")
        