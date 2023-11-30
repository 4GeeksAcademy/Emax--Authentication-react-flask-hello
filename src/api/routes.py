"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/sign_up', methods=['POST'])
def create_one_user():
    body = json.loads(request.data)
    new_user = User(
        name = body["name"],
        last_name = body["last_name"],
        email = body["email"],
        password = body["password"],
        user_name= body["user_name"],
        country = body["country"],
        phone = body["phone"],
        address = body["address"],
        date= body["date"],
        is_active = True
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "user created succesfull", "user_added": new_user}), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": f"user with id {user_id} not found"}), 404
    serialized_user = user.serialize()
    return serialized_user, 200

