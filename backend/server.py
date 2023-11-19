from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os


app = Flask(__name__)
CORS(app, resources={
     r"/submit_trainee_form": {"origins": "http://localhost:3000"}})

# Route that hits the root of the server. Use this to make sure the server is running


@app.route("/")
def create_server():
    return "Hello server. I am running"


# Preliminary information used to run code to make sure it works
trainee_data = {
    "id": 0,
    "trainee_name": "Andriana",
    "github_link": "https://github.com/AndrianaOS",
    "portfolio_link": "https://cv-portfolio.onrender.com/",
    "linkedIn_link": "https://www.linkedin.com/in/andriana-saffo/",
    "role": "Full Stack",
    "about_me": "Lorem",
    "skills": ["HTML", "Python", "JavaScript"],
}

# Submitting form will add graduate data to this array. The data will not persist
all_data = [trainee_data]

# GitHub token
gh_token = os.getenv("GITHUB_API_TOKEN")

# Gets list of all graduates added to the array. To be refactored once database is established
@app.route("/graduatesList", methods=["GET"])
def graduates_list():
    print(f"All graduates: {trainee_data}")
    return jsonify(all_data)

# Interacts with GitHub API to pull information stated in query. User login will take users GitHub username
@app.route("/graduates", methods=["POST"])
def graduates():
    try:
        GITHUB_HEADERS = {
            "Authorization": f"Bearer {gh_token}",
            "Content-Type": "application/json",
        }
        github_query_json = {
            "query": '{user(login: "AndrianaOS"){avatarUrl(size: 256), name, bio, email, websiteUrl, repositoriesContributedTo(first: 10){totalCount}, pinnedItems(first: 10) {nodes {... on Repository {name}}}}}'}
        response = requests.post(
            os.getenv("GITHUB_API_ENDPOINT"), json=github_query_json, headers=GITHUB_HEADERS)
        result = response.json()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# POST request for form
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

    if not any(new_trainee_data[key] for key in ["trainee_name", "github_link", "portfolio_link", "linkedIn_link", "role", "about_me", "skills"]):
        print("Please fill in required fields")
        return jsonify({'message': 'Please fill in all required fields'}), 400

    all_data.append(new_trainee_data)
    print(all_data)
    return jsonify(all_data)


if __name__ == "__main__":
    app.debug = True
    app.run()
