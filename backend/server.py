import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import requests

load_dotenv()


app = Flask(__name__)
CORS(app)


# Connection to database
db_url = os.getenv("DB_URL")
db_conn = psycopg2.connect(db_url)

INSERT_GRADUATE_RETURN_ID = "INSERT INTO graduates (trainee_name, github_link, portfolio_link, linkedIn_link, role, about_me, skills) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id"
GET_GRADUATE_NAME = "SELECT 1 FROM graduates WHERE trainee_name = %s"


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
    "skills": ["HTML", "Python", "JavaScript", "NodeJS", "CSS", "Flask", "PostgreSQL", "ExpressJS", "React"],
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


# Extracts GitHub username from github_link
def extract_alphanumeric_details(url):
    prefix = "https://github.com/"

    # Check if the URL starts with the specified prefix
    if url.startswith(prefix):
        # Extract the substring after the prefix
        details = url[len(prefix):]

        # Filter out non-alphanumeric characters
        alphanumeric_details = ''.join(
            char for char in details if char.isalnum())

        return alphanumeric_details

    else:
        # Return None if the prefix is not present
        return None


# Example usage:
extracted_result = extract_alphanumeric_details(trainee_data["github_link"])
print("Extracted result:", extracted_result)


# Interacts with GitHub API to pull information stated in query. User login will take users GitHub username
@app.route("/graduates", methods=["POST"])
def graduates():
    try:
        GITHUB_HEADERS = {
            "Authorization": f"Bearer {gh_token}",
            "Content-Type": "application/json",
        }

        if extracted_result is not None:
            github_query_json = {
                "query": f'{{user(login: "{extracted_result}"){{avatarUrl(size: 256), name, bio, email, websiteUrl, repositoriesContributedTo(first: 10){{totalCount}}, pinnedItems(first: 10) {{nodes {{... on Repository {{name}}}}}}}}}}'
            }
        else:
            return jsonify({"error": "Failed to extract login details"}), 400

        response = requests.post(
            os.getenv("GITHUB_API_ENDPOINT"), json=github_query_json, headers=GITHUB_HEADERS)
        result = response.json()
        print(result)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# POST request for form
@app.route("/submit_trainee_form", methods=["GET", "POST", "OPTIONS"])
def submit_trainee_form():
    try:
        print("Request method:", request.method)
        print("Request data:", request.get_data())

        data = request.get_json()
        print(data)
        trainee_name = data["trainee_name"]
        print(trainee_name)
        github_link = data["github_link"]
        portfolio_link = data["portfolio_link"]
        linkedIn_link = data["linkedIn_link"]
        role = data["role"]
        about_me = data["about_me"]
        skills = data["skills"]
        with db_conn:
            with db_conn.cursor() as cursor:
                cursor.execute(GET_GRADUATE_NAME, (trainee_name))
                graduate_name = cursor.fetchall()[1]
                graduate_id = cursor.fetchone()[0]

                if graduate_name:
                    raise ValueError("Graduate already exists")
                elif not any(data[key] for key in [trainee_name, github_link, portfolio_link, linkedIn_link, role, about_me, skills]):
                    raise ValueError("Please fill in required fields")
                else:
                    cursor.execute(INSERT_GRADUATE_RETURN_ID, (trainee_name, github_link,
                                                               portfolio_link, linkedIn_link, role, about_me, skills))
        db_conn.commit()
        return jsonify({"id": graduate_id, "message": f"{trainee_name} successfully added"}), 201
    except Exception as error:
        print(error)
        # return {"error": error}, 400
        error_message = str(error)
        return jsonify({"error": error_message})

