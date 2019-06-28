from flask import Flask, jsonify, request

from optimization  import optimize_schedule
application = Flask(__name__)


@application.route('/optimize', methods=['GET', 'PUT'])
def optimize():
    schedule_data = request.get_json()
    optimized_schedule = optimize_schedule(schedule_data)
    return jsonify(optimized_schedule)

@application.route('/')
def hello():
    return 'Hello, World!'


if __name__ == '__main__':
    application.run(host='0.0.0.0')
