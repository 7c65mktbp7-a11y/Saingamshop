# Saingam Shop Set 5 — PromptPay QR

ชุดนี้เพิ่มระบบเตรียมชำระเงินผ่าน PromptPay QR

## สิ่งที่เพิ่ม
- สร้างรายการเติมเงินพร้อม payment reference
- สร้าง PromptPay QR แบบกำหนดจำนวนเงิน
- ลูกค้าดูสถานะรายการเติมเงินได้
- Admin สามารถอนุมัติ/ปฏิเสธรายการเพื่อทดสอบ flow ได้
- ป้องกันการเพิ่มเงินซ้ำเมื่อรายการถูกอนุมัติแล้ว
- รองรับการต่อ payment gateway/webhook จริงในขั้นถัดไป

## Environment Variables ที่ต้องเพิ่มใน Render
- PROMPTPAY_ID = เบอร์มือถือหรือเลขบัตรประชาชนที่ผูก PromptPay ของร้าน
- PROMPTPAY_NAME = ชื่อร้าน
- PAYMENT_WEBHOOK_SECRET = รหัสลับสำหรับ webhook ในอนาคต

## สำคัญ
QR ในชุดนี้เป็น QR PromptPay จริงสำหรับการโอนเงิน แต่การตรวจสอบว่าเงินเข้าจริงแบบอัตโนมัติยังต้องเชื่อมผู้ให้บริการ Payment Gateway/Webhook ในขั้นถัดไป
ห้ามถือว่าแค่ลูกค้ากดปุ่ม "ตรวจสอบ" คือจ่ายเงินสำเร็จ

## Deploy
Root Directory: backend
Build Command: npm install
Start Command: npm start
Node Version: 22.22.0
