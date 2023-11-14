from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
     r"/submit_trainee_form": {"origins": "http://localhost:3000"}})


@app.route("/")
def create_server():
    return "Hello server. I am running"


trainee_data = {
    "id": 0,
    "trainee_name": "Andriana",
    "github_link": "https://cv-portfolio.onrender.com/",
    "portfolio_link": "https://cv-portfolio.onrender.com/",
    "linkedIn_link": "https://cv-portfolio.onrender.com/",
    "role": "kscn",
    "about_me": "jskb",
    "skills": ["hbjccx", "hjvdj"],
}

all_data = [trainee_data]


@app.route("/graduates")
def graduates():
    print(f"All graduates: {trainee_data}")
    return jsonify(all_data)


@app.route("/submit_trainee_form", methods=["GET", "POST"])
def submit_trainee_form():
    new_trainee_data = {
        "id": len(all_data) + 1,
        "trainee_name": request.json.get("trainee_name"),
        "github_link": request.json.get("github_link"),
        "portfolio_link": request.json.get("portfolio_link"),
        "linkedIn_link": request.json.get("linkedIn_link"),
        "role": request.json.get("role"),
        "about_me": request.json.get("about_me"),
        "skills": request.json.get("skills")
    }

    if not new_trainee_data["trainee_name"] or not new_trainee_data["github_link"] or not new_trainee_data["portfolio_link"] or not new_trainee_data["linkedIn_link"] or not new_trainee_data["role"] or not new_trainee_data["about_me"] or not new_trainee_data["skills"]:
        print("Please fill in required fields")
        return jsonify({'message': 'Please fill in all required fields'}), 400

    all_data.append(new_trainee_data)
    print(all_data)
    return jsonify(all_data)


if __name__ == "__main__":
    app.run(debug=True)
