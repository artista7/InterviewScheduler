from flask import Flask, jsonify, request

from optimization  import optimize_schedule
app = Flask(__name__)


@app.route('/')
def hello():
    schedule_data = request.get_json()
    optimized_schedule = optimize_schedule(schedule_data)
    return jsonify(optimized_schedule)

if __name__ == '__main__':
    app.run()
