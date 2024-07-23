from flask import Flask, jsonify
from flask_cors import CORS
from route.apis import apis

app = Flask(__name__)
CORS(app)

app.register_blueprint(apis)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
