from google import genai
from config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)

def generate_ai_feedback(title: str, amount: float, category: str, description: str) -> str:
    prompt = f"""
    A user bought something.

    Item: {title}
    Cost: ${amount}
    Category: {category}
    Description: {description}

    Give short financial advice about whether this purchase seems reasonable
    for someone trying to save money. Keep it to 2-3 sentences.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text