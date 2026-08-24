from fastapi import FastAPI
from app.services.email_service import send_email, content, subs_list, subs_count, log_send, get_logs
from fastapi.middleware.cors import CORSMiddleware

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
       
    
    
    