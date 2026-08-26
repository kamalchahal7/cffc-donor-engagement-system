from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.email_service import send_email, content, subs_list, subs_count, log_send, get_logs, click, click_counter, get_group, email_open, open_counter


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Hello, World!"}

@app.post("/send_email")
def emailer(receiver_email: str, subject: str, content: str):
    result = send_email(receiver_email, subject, content)
    if result:
        return {"message": "Email sent successfully!"}
    else:
        return {"message": "Email failed to send."}

@app.post("/send_newsletter")
def newsletter(receiver_email: str):
    subject = "Our latest newsletter"
    html_content = content()
    result = send_email(receiver_email, subject, html_content)
    if result:
        return {"message": "Newsletter sent successfully!"}
    else:
        return {"message": "Newsletter failed to send."}

@app.post("/send_newsletter_all")
def newsletter_service():
    subject = "CFFC: Latest Newsletter"
    emails = subs_list()
    html_content = content()
    results = []
    for email in emails:
        results.append(send_email(email, subject, html_content))
    num_sent = len([r for r in results if r is not None])
    log_send(num_sent)
    if num_sent == len(emails):
        return {"message": "All newsletters sent successfully!"}
    else:
        return {"message": "Some or all newsletters failed to send."}

@app.get("/subs_count")
def get_count():
    return {"count": subs_count()}

@app.get("/send_history")
def get_history():
    return get_logs()

@app.get("/track_click")
def track_click():
    return click()

@app.get("/track_open")
def track_open():
    return email_open()

@app.get("/click_count")
def get_clicks():
    return click_counter()

@app.get("/open_count")
def get_opens():
    return open_counter()

@app.post("/send_newsletter_group")
def group_email(group: str):
    emails = get_group(group)
    if not emails:
         return {"message": f"No subscribers found in group: {group}"}
    subject = "Our latest newsletter"
    html_content = content()
    results = []
    for email in emails:
        results.append(send_email(email, subject, html_content))

    num_sent = len([r for r in results if r is not None])
    log_send(num_sent)
    if num_sent == len(emails):
        return {"message": f"{group.capitalize()} newsletters sent successfully!"}
    else:
        return {"message": "Some or all newsletters failed to send."}

# @app.post("/add_subscriber")
# def new_subscriber(email: str):
#     result = add_subscriber(email)
#     if result:
#         return {"message": "Subscriber added!"}
#     elif result is False:
#         return {"message": "Already subscribed."}
#     else:
#         return {"message": "Failed to add subscriber."}
    
    
    