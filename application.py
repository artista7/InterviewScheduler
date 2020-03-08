import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

from optimization  import optimize_schedule

application = Flask(__name__, static_folder='ui/build')
CORS(application)


@application.route('/api/optimize', methods=['POST'])
def optimize():
    schedule_data = request.get_json()
    optimized_schedule = optimize_schedule(schedule_data)
    return jsonify(optimized_schedule)


# Serve React App
@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(application.static_folder + '/' + path):
        return send_from_directory(application.static_folder, path)
    else:
        return send_from_directory(application.static_folder, 'index.html')


if __name__ == '__main__':
    application.run(host='0.0.0.0', port=5000)
