"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
from datetime import timedelta
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify, url_for, send_from_directory
from datetime import datetime

api = Blueprint('api', __name__)
bcrypt = Bcrypt()
# Allow CORS requests to this API
CORS(api)

@api.route('/sign_up', methods=['POST'])
def create_one_user():
    try:
        body = request.get_json()

        # Validación y conversión de la fecha
        date = datetime.strptime(body["date"], "%Y-%m-%d")
    except (ValueError, KeyError):
        return jsonify({"error": "Invalid or missing date format. Please use YYYY-MM-DD."}), 400

    raw_password = body.get('password')

    password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')
    new_user = User(
        name=body["name"],
        last_name=body["last_name"],
        email=body["email"],
        password=password_hash,
        user_name=body["user_name"],
        country=body["country"],
        phone=body["phone"],
        address=body["address"],
        date=date,
        is_active=True
    )

    try:
        db.session.add(new_user)
        db.session.commit()

        ok_to_share = {
            "name": body["name"],
            "last_name": body["last_name"],
            "email": body["email"],
            "user_name": body["user_name"],
            "country": body["country"],
            "phone": body["phone"],
            "address": body["address"],
            "date": date.strftime('%Y-%m-%d'),
            "is_active": True
        }

        return jsonify({"msg": "user created successfully", "user_added": ok_to_share}), 200
    except Exception as e:
        db.session.rollback()
        api.logger.error(f"Error creating user: {str(e)}")
        return jsonify({"error": "Failed to create user. Please try again later."}), 500


@api.route('/user/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": f"user with id {user_id} not found"}), 404
    serialized_user = user.serialize()
    return serialized_user, 200

