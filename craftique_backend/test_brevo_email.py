import smtplib
from email.mime.text import MIMEText

smtp_server = "smtp-relay.brevo.com"
port = 587
login = "craftique.help@gmail.com"
password = "xsmtpsib-c56474991845094d81e38101839718f28d6d0dc2658cd8aea82c695177b2c535-S7g52snNAE9kpY3Z"  # your Brevo SMTP key

sender_email = login
receiver_email = "asadhusainadv.786@gmail.com"  # use your real test email

subject = "🔧 Craftique SMTP Test"
body = "✅ If you got this email, Brevo SMTP is working correctly from your machine."

msg = MIMEText(body)
msg["Subject"] = subject
msg["From"] = sender_email
msg["To"] = receiver_email

try:
    server = smtplib.SMTP(smtp_server, port)
    server.starttls()
    server.login(login, password)
    server.sendmail(sender_email, receiver_email, msg.as_string())
    server.quit()
    print("✅ Email sent successfully!")
except smtplib.SMTPAuthenticationError as e:
    print("❌ SMTP Authentication failed:", e)
except Exception as e:
    print("❌ Other error:", e)
