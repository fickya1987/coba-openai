from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Set up OpenAI API credentials
openai.api_key = 'YOUR_API_KEY'  # Replace with your OpenAI API key

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data['message']

    # Send the user's message to the language model
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=message,
        max_tokens=50
    )

    # Extract the generated message from the API response
    reply = response.choices[0].text.strip()

    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)
