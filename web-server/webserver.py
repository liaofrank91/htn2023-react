from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin # Import Flask-CORS
import requests
import os

app = Flask(__name__)
#CORS(app, origins='*')  # Allow requests from all origins (for development)
CORS(
    app,
    resources = {
        r"/*": {
            "origins": [
                "http://localhost:3000",
            ]
        }
    },
)
app.config['CORS_HEADERS'] = 'Content-Type'

# Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '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')
OPENAI_ENDPOINT = 'https://api.openai.com/v1/completions'

@app.route('/frontend-endpoint', methods=['POST'])
@cross_origin()
def handle_frontend_request():
    try:
        data = request.json
        menu = data.get('menu', '')
        allergies = data.get('allergies', '')
        restrictions = data.get('restrictions', '')
        goals = data.get('goals', '')

        if not menu:
            return jsonify({'error': 'Missing menu field'}), 400

        response = perform_openai_api_call(menu, allergies, restrictions, goals)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def perform_openai_api_call(menu, allergies, restrictions, goals):
    prompt = 'Here is an unparsed menu:\n' + menu + ". \n"
    if allergies != '':
        prompt = prompt + "Given these strict allergies: " + allergies + ".\n"
    if restrictions != '':
        prompt = prompt + "Given these strict dietary restrictions: " + restrictions + ".\n"
    if goals != '':
        prompt = prompt + "Given these goals: " + goals + ".\n"
    prompt = prompt + "Only list the 3 best options from the menu that satisfy these restrictions with explanations of macros using the template below no prose (each reason must be <80 characters)\n"
    prompt = prompt + """
    ONLY respond in the following format (JSON):
    {
        "options": [
            {
                "number": "1",
                "name": "Meat Sandwich",
                "reason": [
                    "Lots of protein for bulking",
                    "Contains lots of vitamins",
                    "Healthy fats"
                ]
            },
            {
                "number": "2",
                "name": "Grilled Salmon with Quinoa and Steamed Broccoli",
                "reason": [
                    "Grilled salmon is an excellent source of heart-healthy omega-3 fatty acids and high-quality protein.",
                    "Quinoa is a complete protein and provides fiber, vitamins, and minerals.",
                    "Steamed broccoli is rich in vitamins, particularly vitamin C, and fiber, promoting digestive health."
                ]
            },
            {
                "number": "3",
                "name": "Shrimp and Vegetable Stir-Fry with Brown Rice",
                "reason": [
                    "Shrimp is low in calories and an excellent source of protein and essential nutrients like iodine.",
                    "The stir-fried vegetables add vitamins, minerals, and fiber.",
                    "Brown rice provides complex carbs and fiber for sustained energy."
                ]
            }
        ]
    }
    """
    headers = {
        'Authorization': f'Bearer {OPENAI_API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = {
        "model": "text-davinci-003",
        'prompt': prompt,
        'max_tokens': 1000  # Customize this based on your requirements
    }

    response = requests.post(OPENAI_ENDPOINT, headers=headers, json=payload)

    if response.status_code == 200:
        return response.json()
    else:
        return {'error': 'API call to OpenAI failed'}

#def parse_output(input):
if __name__ == '__main__':
    app.run(debug=True)
