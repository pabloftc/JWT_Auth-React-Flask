"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).all()
    
    """ if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401 """
    if len(user) > 0:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    else:
        return jsonify("Wrong Email or Password")

@api.route("/signup", methods=["POST"])
def handle_signup():

    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        if email != None and password != None:
            user_already = User.query.filter_by(email=email).first()
            if user_already:
                return jsonify("The email is already registered"), 500
            else:
                user = User(email=email, password=password, is_active=True)
                db.session.add(user)
                db.session.commit()
                return jsonify("User Signed Up!"), 200
    except Exception as e:
        return (f'Sign Up failed: {e}')

@api.route("/private", methods=["GET"])
@jwt_required()
def get_private():

    email = get_jwt_identity()
    obj = {
        "message": email
    }
    
    return jsonify(obj), 200

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():

    email = get_jwt_identity()
    obj = {
        "message": "Hello " + email + "!*!"
    }
    
    return jsonify(obj), 200