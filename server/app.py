#!/usr/bin/env python3

# Standard library imports

import json 
# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Emotion, UserEmotion, Like

#from sqlalchemy import and_

#defining a dictionary kinda like a legend where I associate color with emotion id
EMOTION_COLORS = {
    1: 'Violet',
    2: 'Indigo',
    3: 'Blue',
    4: 'Green',
    5: 'Yellow',
    6: 'Red'
}

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')

    # Perform authentication logic based on username and email
    user = User.query.filter_by(username=username, email=email).first()

    if user:
        # Return only the data of the authenticated user
        return jsonify({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'name': user.name,
            'position': user.position,
            'age': user.age,
            'message': 'Login successful'
        }), 200
    else:
        return jsonify({'error': 'Invalid username or email'}), 401


@app.route("/users", methods=['GET', 'POST'])
def users():

    #grabbing all users
    all_users = User.query.all()

    if all_users:
        if request.method == 'GET':
            response = make_response(
                [user.to_dict()
                 for user in all_users]
            )
            pass
        elif request.method == 'POST':
            try:
                new_user_form = request.get_json()
                #have to make sure when creating a new instance the keywords much match the class attributes 
                #you need to use these exact attribute names as keyword arguments
                new_user = User(
                    name=new_user_form['name'],
                    email=new_user_form['email'],
                    password=new_user_form['password'],
                    position=new_user_form['position'],
                    age=new_user_form['age']
                )

                db.session.add(new_user)
                db.session.commit()

                response = make_response(
                    new_user.to_dict(),
                    201
                )
            #except Exception as e:
                #print(f"An error occurred: {str(e)}")
                #response = make_response(
                    #{'error': 'Cannot make new user'},
                    #500
                #)
            
            except:
                response = make_response(
                    {'error': 'Cannot make new compliment'},
                    500
                )

            pass
    else:
        response = make_response(
            {'error': "No users found in the DB"},
            404
        )

    return response

@app.route("/users/<int:id>", methods=['GET', 'PATCH', 'DELETE'])
def users_by_id(id):

    user_by_id = User.query.filter(
        User.id == id).first()

    if user_by_id:
        if request.method == 'GET':
            response = make_response(
                user_by_id.to_dict(),
                200
            )

        elif request.method == 'PATCH':
            try:
                update_user_form = request.get_json()

                for attribute in update_user_form:
                    setattr(user_by_id, attribute,
                            update_user_form[attribute])

                db.session.add(user_by_id)
                db.session.commit()

                response = make_response(
                    user_by_id.to_dict(),
                    202
                )
            except:
                response = make_response(
                    {'error': 'Cannot update user'},
                    405
                )

        elif request.method == 'DELETE':
            try:
                #assoc_assets = UserEmotion.query.filter(
                    #and_(UserEmotion.user_id == id, Like.user_id == id)).all()
                
                assoc_assets = UserEmotion.query.filter(
                    UserEmotion.user_id == id).all() + Like.query.filter(Like.user_id == id).all()


                for del_asset in assoc_assets:
                    db.session.delete(del_asset)

                db.session.delete(user_by_id)
                db.session.commit()

                response = make_response(
                    {'success': "Successfully deleted user"},
                    201
                )

            except:
                response = make_response(
                    {'error': 'Cannot delete user'},
                    405
                )

            #to help debug
            #except Exception as e:
                #response = make_response(
                    #{'error': f'Cannot delete user: {str(e)}'},
                    #500
                #)

            pass
    else:
        response = make_response(
            {'error': "No user with that id"},
            404
        )

    return response

'''
@app.route("/emotions", methods=['GET', 'POST'])
def emotions():

    all_emotions = Emotion.query.all()

    if all_emotions:
        if request.method == 'GET':
            response = make_response(
                [emotion.to_dict()
                 for emotion in all_emotions]
            )
            pass
        elif request.method == 'POST':
            try:
                new_emotion_form = request.get_json()

                new_emotion = Emotion(
                    emotion=new_emotion_form.get('emotion')
                )

                db.session.add(new_emotion)
                db.session.commit()

                response = make_response(
                    new_emotion.to_dict(),
                    201
                )

            except:
                response = make_response(
                    {'error': 'Cannot make new emotion'},
                    500
                )

            pass
    else:
        response = make_response(
            {'error': "No emotion found in the DB"},
            404
        )

    return response
'''
@app.route("/emotions", methods=['GET', 'POST'])
def emotions():

    all_emotions = Emotion.query.all()

    if request.method == 'GET':
        if all_emotions:
            response = make_response(
                [emotion.to_dict()
                 for emotion in all_emotions]
            )
        else:
            response = make_response(
                {'error': "No emotions found in the DB"},
                404
            )

    elif request.method == 'POST':
        try:
            new_emotion_form = request.get_json()
            emotion_name = new_emotion_form.get('emotion')

            # Check if the emotion already exists in the database
            existing_emotion = Emotion.query.filter_by(emotion=emotion_name).first()

            if existing_emotion:
                # If the emotion exists, return its ID
                response_data = {'id': existing_emotion.id, 'emotion': existing_emotion.emotion}
                response = make_response(
                    jsonify(response_data),
                    200
                )
            else:
                # If the emotion doesn't exist, create a new one
                new_emotion = Emotion(
                    emotion=emotion_name
                )

                db.session.add(new_emotion)
                db.session.commit()

                response = make_response(
                    new_emotion.to_dict(),
                    201
                )

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            response = make_response(
                {'error': 'Cannot make new emotion'},
                500
            )

    return response


@app.route("/emotions/<int:id>", methods=['GET', 'PATCH', 'DELETE'])
def emotions_by_id(id):

    emotion_by_id = Emotion.query.filter(
        Emotion.id == id).first()

    if emotion_by_id:
        if request.method == 'GET':
            response = make_response(
                emotion_by_id.to_dict(),
                200
            )

        elif request.method == 'PATCH':
            try:
                update_emotion_form = request.get_json()

                for attribute in update_emotion_form:
                    setattr(emotion_by_id, attribute,
                            update_emotion_form[attribute])

                db.session.add(emotion_by_id)
                db.session.commit()

                response = make_response(
                    emotion_by_id.to_dict(),
                    202
                )
            except:
                response = make_response(
                    {'error': 'Cannot update emotion'},
                    405
                )

        elif request.method == 'DELETE':
            try:
                assoc_assets = UserEmotion.query.filter(
                    UserEmotion.emotion_id == id).all() + Like.query.filter(Like.emotion_id == id).all()

                for del_asset in assoc_assets:
                    db.session.delete(del_asset)

                db.session.delete(emotion_by_id)
                db.session.commit()

                response = make_response(
                    {'success': "Successfully deleted records"},
                    201
                )

            except:
                response = make_response(
                    {'error': 'Cannot delete emotion'},
                    405
                )

            pass
    else:
        response = make_response(
            {'error': "No emotion with that id"},
            404
        )

    return response


@app.route("/likes", methods=['GET', 'POST'])
def likes():

    all_likes = Like.query.all()

    if all_likes:
        if request.method == 'GET':
            response = make_response(
                [like.to_dict()
                 for like in all_likes]
            )
            pass
        elif request.method == 'POST':
            try:
                new_like_form = request.get_json()

                new_like = Like(
                    user_id=new_like_form.get('user_id'),
                    emotion_id=new_like_form.get('emotion_id')
                )

                db.session.add(new_like)
                db.session.commit()

                response = make_response(
                    new_like.to_dict(),
                    201
                )

            except:
                response = make_response(
                    {'error': 'Cannot make new like'},
                    500
                )

            pass
    else:
        response = make_response(
            {'error': "No likes in the DB"},
            404
        )

    return response

@app.route("/likes/<int:id>", methods=['GET', 'PATCH', 'DELETE'])
def likes_by_id(id):

    like_by_id = Like.query.filter(
        Like.id == id).first()

    if like_by_id:
        if request.method == 'GET':
            response = make_response(
                like_by_id.to_dict(),
                200
            )

        elif request.method == 'PATCH':
            try:
                update_like_form = request.get_json()

                for attribute in update_like_form:
                    setattr(like_by_id, attribute,
                            update_like_form[attribute])

                db.session.add(like_by_id)
                db.session.commit()

                response = make_response(
                    like_by_id.to_dict(),
                    202
                )
            except:
                response = make_response(
                    {'error': 'Cannot update like'},
                    405
                )

        elif request.method == 'DELETE':
            try:

                db.session.delete(like_by_id)
                db.session.commit()

                response = make_response(
                    {'success': "Successfully deleted like form records"},
                    201
                )

            except:
                response = make_response(
                    {'error': 'Cannot delete like'},
                    405
                )

            pass
    else:
        response = make_response(
            {'error': "No like with that id"},
            404
        )

    return response

'''
@app.route("/user_emotion", methods=['GET', 'POST'])
def user_emotion():
    all_user_emotion = UserEmotion.query.all()

    if all_user_emotion:
        if request.method == 'GET':
            emotion_data = []
            for user_emotion in all_user_emotion:
                emotion_id = user_emotion.emotion_id
                if emotion_id in EMOTION_COLORS:
                    emotion_color = EMOTION_COLORS[emotion_id]
                else:
                    emotion_color = 'gray'  # Default color if emotion ID is not found

                emotion_entry = {
                    'date_stamp': user_emotion.date_stamp.strftime('%Y-%m-%d'),  # Convert to string if needed
                    'color': emotion_color
                }
                emotion_data.append(emotion_entry)

            response = make_response(emotion_data, 200)
        elif request.method == 'POST':
            try:
                new_user_emotion_form = request.get_json()

                new_user_emotion = UserEmotion(
                    user_id=new_user_emotion_form['user_id'],
                    emotion_id=new_user_emotion_form.get('emotion_id'),
                    emotion_intensity=new_user_emotion_form.get('emotion_intensity')
                )

                db.session.add(new_user_emotion)
                db.session.commit()

                response = make_response(
                    new_user_emotion.to_dict(),
                    201
                )

            #except Exception as e:
                #print(f"An error occurred: {str(e)}")
                #response = make_response(
                    #{'error': 'Cannot make new user'},
                    #500
                #)

            except:
                response = make_response(
                    {'error': 'Cannot make new compliment'},
                    500
                )

            pass
    else:
        response = make_response(
            {'error': "No found in the DB"},
            404
        )

    return response
'''


@app.route("/user_emotion", methods=['GET', 'POST'])
def user_emotion():
    # Get the current user's ID from the request
    user_id = request.json.get('user_id')

    # Fetch emotions associated with the current user's ID
    all_user_emotion = UserEmotion.query.filter_by(user_id=user_id).all()

    if all_user_emotion:
        if request.method == 'GET':
            emotion_data = []
            for user_emotion in all_user_emotion:
                emotion_id = user_emotion.emotion_id
                if emotion_id in EMOTION_COLORS:
                    emotion_color = EMOTION_COLORS[emotion_id]
                else:
                    emotion_color = 'gray'  # Default color if emotion ID is not found

                emotion_entry = {
                    'date_stamp': user_emotion.date_stamp.strftime('%Y-%m-%d'),
                    'color': emotion_color
                }
                emotion_data.append(emotion_entry)

            response = make_response(emotion_data, 200)
        elif request.method == 'POST':
            try:
                new_user_emotion_form = request.get_json()

                # Filter emotions by user_id
                user_id = new_user_emotion_form.get('user_id')
                all_user_emotion = UserEmotion.query.filter_by(user_id=user_id).all()

                if all_user_emotion:
                    emotion_data = []
                    for user_emotion in all_user_emotion:
                        emotion_id = user_emotion.emotion_id
                        if emotion_id in EMOTION_COLORS:
                            emotion_color = EMOTION_COLORS[emotion_id]
                        else:
                            emotion_color = 'gray'  # Default color if emotion ID is not found

                        emotion_entry = {
                            'date_stamp': user_emotion.date_stamp.strftime('%Y-%m-%d'),
                        '   color': emotion_color,
                            'intensity': user_emotion.emotion_intensity
                        }
                        emotion_data.append(emotion_entry)

                    response = make_response(emotion_data, 200)
                else:
                    response = make_response(
                        {'error': "No emotions found for this user"},
                        404
                    )

                # Creating new emotion entry
                new_user_emotion = UserEmotion(
                    user_id=user_id,
                    emotion_id=new_user_emotion_form.get('emotion_id'),
                    emotion_intensity=new_user_emotion_form.get('emotion_intensity')
                )

                db.session.add(new_user_emotion)
                db.session.commit()

                response = make_response(
                    new_user_emotion.to_dict(),
                    201
                )

            except Exception as e:
                print(f"An error occurred: {str(e)}")
                response = make_response(
                    {'error': 'Cannot fetch or create emotions'},
                    500
                )

        else:
            response = make_response(
                {'error': 'Invalid method'},
                405
             )

        return response

    


'''
@app.route("/user_emotion/<int:id>", methods=['PATCH'])
def user_emotion_by_id(id):
    user_emotion_by_id = UserEmotion.query.get(id)  # Retrieve user-emotion entry by ID

    if user_emotion_by_id:
        try:
            update_form = request.get_json()

            # Update the attributes of the user-emotion entry
            if 'emotion_intensity' in update_form:
                user_emotion_by_id.emotion_intensity = update_form['emotion_intensity']

            # Commit the changes to the database
            db.session.commit()

            response = make_response(
                user_emotion_by_id.to_dict(),
                202
            )
        except:
            response = make_response(
                {'error': 'Cannot update'},
                405
            )
    else:
        response = make_response(
            {'error': "Nothing with that id"},
            404
        )

    return response

'''
'''

@app.route("/user_emotion", methods=['GET', 'POST'])
def user_emotion():

    all_user_emotion = UserEmotion.query.all()

    if all_user_emotion:
        if request.method == 'GET':
            response = make_response(
                [user_emotion.to_dict()
                 for user_emotion in all_user_emotion]
            )
            pass
        elif request.method == 'POST':
            try:
                new_user_emotion_form = request.get_json()

                new_user_emotion = UserEmotion(
                    user_id=new_user_emotion_form['user_id'],
                    emotion_id=new_user_emotion_form.get('emotion_id'),
                    emotion_intensity=new_user_emotion_form.get('emotion_intensity')
                )

                db.session.add(new_user_emotion)
                db.session.commit()

                response = make_response(
                    new_user_emotion.to_dict(),
                    201
                )

            #except Exception as e:
                #print(f"An error occurred: {str(e)}")
                #response = make_response(
                    #{'error': 'Cannot make new user'},
                    #500
                #)

            except:
                response = make_response(
                    {'error': 'Cannot make new compliment'},
                    500
                )

            pass
    else:
        response = make_response(
            {'error': "No found in the DB"},
            404
        )

    return response


'''

if __name__ == '__main__':
    app.run(port=5555, debug=True)