# AiHub Static Web - GitHub Actions Deployment

## Hướng dẫn Deploy lên Azure Static Web Apps

### Bước 1: Chuẩn bị Azure Static Web App

1. Đăng nhập vào [Azure Portal](https://portal.azure.com)
2. Tạo một **Static Web App** mới:
   - Resource group: Chọn hoặc tạo mới
   - Name: `aihub-static-web` (hoặc tên bạn muốn)
   - Hosting plan: **Free**
   - Deployment source: **GitHub**
   - Chọn organization, repository: `AiHub-Static-Web`
   - Branch: `master`
   - Build presets: **Custom**
   - App location: `/`
   - Api location: (để trống)
   - Output location: (để trống)

### Bước 2: Lấy Deployment Token

1. Sau khi tạo Static Web App, vào resource đó trong Azure Portal
2. Bấm vào **"Manage deployment token"**  
3. Copy token (bắt đầu bằng `000...`)

### Bước 3: Thêm Secret vào GitHub Repository

1. Vào GitHub repository: https://github.com/V1kt0r-24/AiHub-Static-Web
2. Settings → Secrets and variables → Actions
3. Bấm **"New repository secret"**
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: Paste token từ bước 2
6. Bấm **"Add secret"**

### Bước 4: Deploy

**Cách 1: Push code (tự động)**
```bash
git push origin master
```

**Cách 2: Chạy workflow thủ công**
1. Vào tab **Actions** trong GitHub repository
2. Chọn workflow **"Azure Static Web Apps CI/CD"**
3. Bấm **"Run workflow"** → **"Run workflow"**

### Bước 5: Kiểm tra Deploy

1. Vào tab **Actions** để xem tiến trình
2. Nếu thành công, bạn sẽ thấy ✅ green checkmark
3. URL website sẽ có dạng: `https://nice-rock-xxx.azurestaticapps.net`

### Cấu trúc project hiện tại

```
├── .github/workflows/azure-static-web-apps.yml  # GitHub Actions workflow
├── index.html                                    # Trang chủ  
├── page2.html                                    # Trang 2
├── style.css                                     # CSS styles
└── staticwebapp.config.json                     # Cấu hình Static Web App
```

### Troubleshooting

**Lỗi: "missing secrets"**
- Kiểm tra secret `AZURE_STATIC_WEB_APPS_API_TOKEN` đã được thêm đúng chưa

**Lỗi: "build failed"**  
- Workflow đã được cấu hình `skip_app_build: true` để bỏ qua build step

**Website không cập nhật**
- Kiểm tra Actions tab xem deploy có thành công không
- Clear browser cache và thử lại

## Custom Domain (Tùy chọn)

Sau khi deploy thành công, bạn có thể thêm custom domain:

1. Azure Portal → Static Web App → Custom domains
2. Add domain → Enter domain name  
3. Cấu hình DNS record theo hướng dẫn
4. Validate và enable

## Liên hệ

Nếu gặp vấn đề, hãy check:
- Actions logs trong GitHub
- Static Web App logs trong Azure Portal