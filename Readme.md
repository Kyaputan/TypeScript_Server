# 🚀 ULTIMATE TYPESCRIPT BACKEND BOILERPLATE 🚀

![TypeScript](https://img.shields.io/badge/TypeScript-v4.9.5-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18.x-green)
![Express](https://img.shields.io/badge/Express-v4.18.2-lightgrey)
![License](https://img.shields.io/badge/license-MIT-orange)

> **เพาเวอร์ฟูลแบ็คเอนด์ระดับโลก สร้างด้วย TypeScript สำหรับแอพพลิเคชั่นที่ต้องการความเสถียรและประสิทธิภาพสูงสุด**

## 📑 สารบัญ

- [คุณสมบัติหลัก](#คุณสมบัติหลัก)
- [ขั้นตอนการติดตั้ง](#ขั้นตอนการติดตั้ง)
- [โครงสร้างโปรเจคท์](#โครงสร้างโปรเจคท์)
- [คำสั่งที่ใช้บ่อย](#คำสั่งที่ใช้บ่อย)
- [การตั้งค่า Environment Variables](#การตั้งค่า-environment-variables)
- [การ Deploy](#การ-deploy)
- [เทคนิคการพัฒนา](#เทคนิคการพัฒนา)
- [การร่วมพัฒนา](#การร่วมพัฒนา)
- [ไลเซนส์](#ไลเซนส์)

## 🌟 คุณสมบัติหลัก

- ⚡ **TypeScript** - สร้างความมั่นใจด้วย Type-safe และลดบั๊กในการพัฒนา
- 🔄 **Hot Reloading** - พัฒนาอย่างต่อเนื่องด้วย Nodemon
- 🧱 **โครงสร้างแบบ MVC** - จัดระเบียบโค้ดให้เป็นสัดส่วนและง่ายต่อการบำรุงรักษา
- 🔒 **ระบบความปลอดภัย** - JWT Authentication และการจัดการ middleware
- 📝 **Validation** - ตรวจสอบข้อมูลอย่างเข้มงวดด้วย Joi/Zod
- 📊 **Logger** - บันทึกทุกการทำงานอย่างละเอียดด้วย Winston
- 🧪 **Testing** - พร้อมสำหรับการทดสอบด้วย Jest
- 📚 **Swagger Documentation** - API Documentation ที่สวยงามและเป็นประโยชน์
- 🐳 **Docker Support** - พร้อม containerize สำหรับการ deploy

## 🚀 ขั้นตอนการติดตั้ง

### สิ่งที่ต้องมีก่อน

- Node.js (เวอร์ชั่น 18.x หรือสูงกว่า)
- npm หรือ yarn

### วิธีติดตั้ง

1. **โคลนโปรเจคท์**

```bash
git clone https://github.com/yourusername/awesome-typescript-backend.git
cd awesome-typescript-backend
```

2. **ติดตั้ง Dependencies**

```bash
npm install
# หรือ
yarn install
```

3. **ตั้งค่า Environment Variables**

```bash
cp .env.example .env
# แก้ไขไฟล์ .env ตามความเหมาะสม
```

4. **สร้างไฟล์ Build**

```bash
npm run build
# หรือ
yarn build
```

5. **รันเซิร์ฟเวอร์**

```bash
npm run dev
# หรือ
yarn dev
```

🎉 เซิร์ฟเวอร์ของคุณจะทำงานที่ `http://localhost:3000`!

## 📁 โครงสร้างโปรเจคท์

```
src/
├── config/             # การกำหนดค่าแอพพลิเคชัน
├── controllers/        # ตัวควบคุมที่จัดการคำขอและการตอบสนอง
├── middlewares/        # Middleware functions
├── models/             # โมเดลและสคีมาของข้อมูล
├── routes/             # กำหนดเส้นทาง API
├── services/           # ตรรกะทางธุรกิจ
├── utils/              # ฟังก์ชันยูทิลิตี้ต่างๆ
├── types/              # นิยาม TypeScript interfaces และ types
├── tests/              # Unit และ integration tests
└── server.ts           # Entry point ของแอพพลิเคชัน
```

## 💻 คำสั่งที่ใช้บ่อย

| คำสั่ง | คำอธิบาย |
|--------|------------|
| `npm run build` | คอมไพล์โค้ด TypeScript เป็น JavaScript |
| `npm run start` | รันเซิร์ฟเวอร์จากไฟล์ที่ build แล้ว |
| `npm run dev` | รันเซิร์ฟเวอร์ในโหมด development พร้อม hot-reloading |
| `npm run test` | รันชุดทดสอบ |
| `npm run lint` | ตรวจสอบ code style และ fix อัตโนมัติ |
| `npm run typecheck` | ตรวจสอบ TypeScript types |
| `npm run docs` | สร้าง API documentation |

## ⚙️ การตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์หลักของโปรเจคท์:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydatabase
DB_USER=postgres
DB_PASSWORD=password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

# Logging
LOG_LEVEL=info

# API Configuration
API_PREFIX=/api/v1
```

## 🌐 การ Deploy

### การ Deploy ด้วย Docker

1. **สร้าง Docker Image**

```bash
docker build -t my-typescript-backend .
```

2. **รัน Docker Container**

```bash
docker run -p 3000:3000 --env-file .env my-typescript-backend
```

### การ Deploy บน Production Server

1. **สร้าง Build สำหรับ Production**

```bash
NODE_ENV=production npm run build
```

2. **เริ่มเซิร์ฟเวอร์**

```bash
NODE_ENV=production npm run start
```

หรือใช้ Process Manager เช่น PM2:

```bash
pm2 start ecosystem.config.js --env production
```

## 🧠 เทคนิคการพัฒนา

### การสร้าง Controller ใหม่

```typescript
// src/controllers/userController.ts
import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  public static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
```

### การสร้าง Route ใหม่

```typescript
// src/routes/userRoutes.ts
import { Router } from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, UserController.getUsers);
router.post('/', UserController.createUser);

export default router;
```

### การเชื่อมต่อ Routes กับ Express App

```typescript
// src/routes/index.ts
import { Router } from 'express';
import userRoutes from './userRoutes';

const router = Router();

router.use('/users', userRoutes);

export default router;
```

## 👥 การร่วมพัฒนา

ยินดีต้อนรับการมีส่วนร่วมในการพัฒนา! โปรดอ่าน [CONTRIBUTING.md](CONTRIBUTING.md) สำหรับคำแนะนำเพิ่มเติม

## 📜 ไลเซนส์

โปรเจคท์นี้อยู่ภายใต้ MIT License - ดูรายละเอียดเพิ่มเติมที่ [LICENSE](LICENSE)

---

⭐ สร้างด้วยความรักโดยทีมของเรา ⭐

หากมีคำถามหรือข้อเสนอแนะ โปรดติดต่อ [singkhet1@gmail.com](mailto:singkhet1@gmail.com)