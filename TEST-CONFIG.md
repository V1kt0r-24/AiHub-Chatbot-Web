# Test Config Script - Kiểm tra staticwebapp.config.json

## Các cách test config:

### 1. Kiểm tra Security Headers
```powershell
# Test với curl (nếu có)
curl -I https://your-site.azurestaticapps.net

# Hoặc với PowerShell
$response = Invoke-WebRequest -Uri "https://your-site.azurestaticapps.net" -Method Head
$response.Headers
```

### 2. Test 404 Error Handling
- Truy cập URL không tồn tại: `https://your-site.azurestaticapps.net/nonexistent`
- **Kết quả mong đợi**: Hiển thị index.html thay vì lỗi 404

### 3. Test IP Restriction
- Truy cập từ IP khác `20.6.51.16`
- **Kết quả mong đợi**: Bị chặn hoặc lỗi 403

### 4. Kiểm tra trong Azure Portal
1. **Static Web App** → **Configuration**
2. Xem **Configuration file** có hiển thị nội dung đúng không

## Lưu ý quan trọng:

### ⚠️ IP Restriction hiện tại:
```json
"allowedIpRanges": ["20.6.51.16/32"]
```

**Vấn đề**: Chỉ IP này được truy cập → Website có thể không public

### 💡 Gợi ý:

#### Để website public:
```json
{
  "networking": {
    "allowedIpRanges": []  // Bỏ trống = cho phép tất cả
  }
}
```

#### Hoặc mở rộng IP range:
```json
{
  "networking": {
    "allowedIpRanges": [
      "0.0.0.0/0"  // Cho phép tất cả (public)
    ]
  }
}
```

#### Hoặc specific IP ranges:
```json
{
  "networking": {
    "allowedIpRanges": [
      "203.0.113.0/24",    // Office network
      "198.51.100.0/24"    // Home network
    ]
  }
}
```