from flask import Flask, render_template, request
import nltk
from nltk.chat.util import Chat, reflections

app = Flask(__name__)

# สร้างฐานข้อมูลของคำถามและคำตอบ
pairs = [
    [
        r"(.*) (ฉัน|ผม|หนู|เรา) (ชื่อ|ชื่ออะไร)",
        ["สวัสดี! ฉันคือ AI Chatbot ยินดีที่ได้รู้จัก!",]
    ],
    [
        r"สวัสดี|สวัดดี|ดี|ดีครับ|ดีค่ะ",
        ["สวัสดี! มีอะไรให้ช่วยมั้ย?", "สวัสดี! ยินดีต้อนรับ!",]
    ],
    [
        r"บ๊ายบาย|ลาละ|ลาก่อน",
        ["บ๊ายบาย! ไว้เจอกันใหม่", "ลาละ! รักษาสุขภาพด้วยนะ",]
    ],
    [
        r"(.*) (อายุ|กี่ปี|กี่ขวบ)",
        ["ฉันเป็นแค่ AI ไม่มีอายุหรอก",]
    ],
    [
        r"ฉันรู้สึก (.*)",
        ["ทำไมถึงรู้สึก %1 ล่ะ?", "อะไรทำให้รู้สึก %1 ล่ะ?"]
    ],
    [
        r"(.*) ฝนจะตกไหม",
        ["ฉันไม่สามารถบอกได้ว่าฝนจะตกหรือไม่ แต่ควรเตรียมร่มไว้เผื่อ!",]
    ],
]

chatbot = Chat(pairs, reflections)

@app.route("/", methods=["GET", "POST"])
def index():
    ai_response = ""
    if request.method == "POST":
        user_input = request.form["user_input"]
        ai_response = chatbot.respond(user_input)
    
    return render_template("index.html", ai_response=ai_response)

if __name__ == "__main__":
    nltk.download('punkt')
    app.run(debug=True)
