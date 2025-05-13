from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json, os

# point at react
BASE = os.path.dirname(__file__)
app = Flask(
    __name__,
    static_folder=os.path.join(BASE, '../frontend/build'),
    template_folder=os.path.join(BASE, '../frontend/build')
)
CORS(app)

# store quiz answers
user_progress = {"quiz": {}}

# load quiz.json
with open(os.path.join(BASE, 'data/quiz.json')) as f:
    QUIZ = json.load(f)

@app.route('/api/ping')
def ping():
    return jsonify({'ping': 'pong'})

@app.route('/api/quiz/<int:qid>', methods=['GET', 'POST'])
def quiz(qid):
    if request.method == 'GET':
        return jsonify(QUIZ[qid-1])

    payload = request.get_json() or {}
    user_progress['quiz'][qid] = payload
    return jsonify({"status": "ok"}), 200

@app.route('/api/results', methods=['GET'])
def results():
    correct = 0
    for qid, answer_data in user_progress['quiz'].items():
        correct_key = QUIZ[qid-1]['correct']
        if isinstance(correct_key, dict):
            if answer_data.get('matches') == correct_key:
                correct += 1
        else:
            if answer_data.get('answer') == correct_key:
                correct += 1
    total = len(QUIZ)
    return jsonify({'score': correct, 'total': total})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(port=5050, debug=True)
