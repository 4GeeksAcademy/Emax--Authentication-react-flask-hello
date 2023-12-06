"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import  request, jsonify, Blueprint, make_response, current_app
from api.models import db, User
from flask_cors import CORS
import json
from datetime import timedelta
from flask_jwt_extended import JWTManager
from datetime import datetime

api = Blueprint('api', __name__)


CORS(api, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}}, supports_credentials=True)


#app = Flask(__name__)

# Ruta de prueba para verificar la conexión

@api.route('/test')
def test():
    return jsonify({"msg": "funciona"}), 200

@api.route('/sign', methods=['POST', 'OPTIONS'])
def create_one_user():
    try:
        if request.method == 'OPTIONS':
            response = make_response()
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Methods', 'POST')
            return response
    
        body = request.get_json()

        date = datetime.strptime(body["date"], "%Y-%m-%d")
    except (ValueError, KeyError):
        return jsonify({"error": "Invalid or missing date format. Please use YYYY-MM-DD."}), 400

    raw_password = body.get('password')
    print(body)

    password_hash = current_app.bcrypt.generate_password_hash(raw_password).decode('utf-8')
    new_user = User(
        full_name=body.get("full_name"),
        email=body.get("email"),
        password=password_hash,
        user_name=body.get("user_name"),
        country=body.get("country"),
        phone=body.get("phone"),
        address=body.get("address"),
        #date=date,
    )

    try:
        db.session.add(new_user)
        db.session.commit()

        ok_to_share = {
            "full_name": body["full_name"],  # Corregido aquí
            "email": body["email"],
            "user_name": body["user_name"],
            "country": body["country"],
            "phone": body["phone"],
            "address": body["address"],
            #"date": date.strftime('%Y-%m-%d'),
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

