from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from optimization  import optimize_schedule
application = Flask(__name__)
cors = CORS(application)
app.config['CORS_HEADERS'] = 'Content-Type'



@application.route('/optimize', methods=['GET', 'PUT'])
@cross_origin()
def optimize():
    schedule_data = request.get_json()
    optimized_schedule = optimize_schedule(schedule_data)
    return jsonify(optimized_schedule)

@application.route('/')
def hello():
    return 'Hello, World!'


if __name__ == '__main__':
    application.run(host='0.0.0.0')
