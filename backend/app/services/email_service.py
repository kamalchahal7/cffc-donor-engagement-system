import os
import json
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from datetime import datetime

load_dotenv()

api_key = os.getenv("SENDGRID_API_KEY")
email = os.getenv("FROM_EMAIL")

def send_email(receiver_email: str, subject: str, content: str):
    message = Mail(
        from_email=email,
        to_emails=receiver_email,
        subject=subject,
        html_content=content)

    try:
        sg=SendGridAPIClient(api_key)
        response=sg.send(message)
        return response.status_code
    except Exception as e:
        print(e)
        print(e.body if hasattr(e, 'body') else "No body")
        return None

def content():
    try:
        with open("app/templates/newsletter.html", "r") as file:
            content = file.read()
        return content
    except Exception as e:
        print(e)
        return None

def subs_list():
    try:
        with open("app/data/subscribers.json", "r") as f:
            data = json.load(f)
            emails = data["subscribers"]
        return emails
    except Exception as e:
        print (e)
        return None

def subs_count():
    subs = subs_list()
    if subs:
        return len(subs)
    return 0

def log_send(num_sent: int):
    try:
        with open("app/data/send_history.json", "r") as f:
            data = json.load(f)
        
        timestamp = datetime.now().isoformat()
        data["sends"].append({
            "timestamp": timestamp,
            "num_sent": num_sent
        })

        with open("app/data/send_history.json", "w") as f:
            json.dump(data, f, indent=2)
        
        return True
    except Exception as e:
        print(e)
        return None

def get_logs():
    try:
        with open ("app/data/send_history.json", "r") as f:
            data = json.load(f)
        return data
    except Exception as e:
        print(e)
        return None
            
            