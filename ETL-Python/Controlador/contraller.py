from flask import Flask, request, jsonify
from database import Database

app = Flask(__name__)
db = Database()

@app.route('/api/data', methods=['GET'])
def get_data():
    query = "SELECT * FROM tabla"
    result = db.execute_query(query)
    return jsonify(result)

@app.route('/api/dbf', methods=['GET'])
def read_dbf():
    file_path = request.args.get('file_path')
    result = db.read_dbf(file_path)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
