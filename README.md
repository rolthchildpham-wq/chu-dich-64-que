# Chu Dịch 64 Quẻ
Website tĩnh: gieo ba đồng tiền, tra cứu 64 quẻ Hán văn, hào động và quẻ biến. Dữ liệu lấy từ tệp Markdown người dùng cung cấp, chưa phải một bản hiệu khảo độc lập. Chưa tích hợp AI backend.

## Firebase auto-deploy
1. Tạo Firebase Project và bật Hosting.
2. Cấu hình Google Cloud Workload Identity Federation giới hạn repo `rolthchildpham-wq/chu-dich-64-que` và nhánh `main`, service account có quyền triển khai Firebase Hosting.
3. GitHub Actions Secrets: `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_SERVICE_ACCOUNT`; GitHub Actions Variable: `FIREBASE_PROJECT_ID`.
4. Push lên main, kiểm tra Actions và URL trong Firebase console.

Local: `npm test` rồi `npx serve public`. Không bao giờ commit API keys.
