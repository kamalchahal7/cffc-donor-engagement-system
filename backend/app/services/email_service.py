import os
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from fastapi.responses import RedirectResponse, Response
from supabase import create_client

load_dotenv()

api_key = os.getenv("SENDGRID_API_KEY")
email = os.getenv("FROM_EMAIL")
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

supabase = create_client(supabase_url, supabase_key)

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
    return get_group("all")

def subs_count():
    subs = subs_list()
    if subs:
        return len(subs)
    return 0

def log_send(num_sent: int):
    response = supabase.table("analytics").insert({"event_type": "send", "num_sent": num_sent}).execute()
    return True
    # return response.data[0]["id"]

def get_logs():
    response = supabase.table("analytics").select("*").eq("event_type", "send").execute()
    return {"sends": response.data}

def click():
    supabase.table("analytics").insert({"event_type": "click"}).execute()
    return RedirectResponse(url="https://cffc-donor-engagement-system.vercel.app")

# def email_open():
#     supabase.table("analytics").insert({"event_type": "open"}).execute()
#     pixel = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n\xb4\x00\x00\x00\x00IEND\xaeB`\x82'
#     return Response(content=pixel, media_type="image/png")

def click_counter():
    response = supabase.table("analytics").select("*").eq("event_type", "click").execute()
    return {"clicks": len(response.data)}

# def open_counter():
#     response = supabase.table("analytics").select("*").eq("event_type", "open").execute()
#     return {"opens": len(response.data)}

def get_group(group: str):
    if group == "all":
        # Retrieves SQL data from supabase
        response = supabase.table("subscribers").select("email").execute()
        # Changes SQL dictionary data into list
        response = [row["email"] for row in response.data]
        # Removes duplicate subscribers
        response = list(set(response))
    else:
        response = supabase.table("subscribers").select("email").eq("group", group).execute()
        response = [row["email"] for row in response.data]
    return response

# def add_subscriber(new_email: str):
#     try:
#         with open("app/data/subscribers.json", "r") as f:
#             data = json.load(f)
#         if new_email not in data["subscribers"]:
#             data["subscribers"].append(new_email)
#             with open("app/data/subscribers.json", "w") as f:
#                 json.dump(data, f, indent=2)
#             return True
#         return False
#     except Exception as e:
#         print(e)
#         return None