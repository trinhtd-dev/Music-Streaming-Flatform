const fs = require('fs');

// Đọc file JSON
const filePath = 'C:\\Users\\Windows 10\\Downloads\\melody_stream.topicsss.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Cập nhật trường image của từng document
data.forEach((doc, index) => {
    doc.image = `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;
});

// Ghi lại file JSON đã được cập nhật
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('Cập nhật trường image thành công!');