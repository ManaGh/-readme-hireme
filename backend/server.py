from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def create_server():
    return "Hello server. I am running"


@app.route("/graduates")
def graduates():
    return {"graduates": ["Graduate1", "Graduate2", "Graduate3"]}


@app.route("/trainee_form", methods=["POST"])
def trainee_form():
    data = request.get_json()
    print(data)
    return data


if __name__ == "__main__":
    app.run(debug=True)
