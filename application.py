from flask import Flask, jsonify, request
from flask_cors import CORS

from optimization  import optimize_schedule

application = Flask(__name__)
CORS(application)


@application.route('/api/optimize', methods=['POST'])
def optimize():
    schedule_data = request.get_json()
    optimized_schedule = optimize_schedule(schedule_data)
    return jsonify(optimized_schedule)


if __name__ == '__main__':
    application.run(host='0.0.0.0', port=5000)
