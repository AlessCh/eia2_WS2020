const canvas = document.createElement('canvas');
const crc2 = canvas.getContext('2d');

for (let i = 0; i < 20; i++) {
    const x = Math.random() * 300;
    const y = Math.random() * 200;
  
    // ...
  
    ctx.arc(x, y, 3, 0, Math.PI * 2, false);
  
    // ...
  }