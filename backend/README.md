Saingam Shop Backend - ชุดที่ 3

แพลตฟอร์มที่แนะนำสำหรับเริ่มต้น:
Render

ไฟล์:
- server.js = ตัว Backend
- package.json = รายการแพ็กเกจ
- render.yaml = ค่าช่วยตั้งค่า Render
- ENV-SETTINGS.txt = ค่าที่ต้องใส่ใน Environment
- START-HERE.txt = วิธีเริ่มต้นแบบสั้น

สำคัญ:
GitHub Pages ใช้สำหรับ index.html และหน้าเว็บ static
Backend Node.js ให้ Deploy แยกบน Render หรือเซิร์ฟเวอร์ Node.js

หลัง Deploy ให้ทดสอบ:
https://URL-BACKEND-ของคุณ.onrender.com/api/health

ควรได้ JSON ที่มี:
ok: true
status: online
