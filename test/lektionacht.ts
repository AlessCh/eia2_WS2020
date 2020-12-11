namespace test {
    x: number;
    y: number;
    radius: number;
    alpha: number;

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        draw();
 
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
          
        this.radius = 1 + Math.random() * 2;
        this.alpha = 0.5 + Math.random() * 0.5;
            }
          
    draw(): void {
              crc2.globalAlpha = this.alpha;
              crc2.beginPath();
              crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
              crc2.closePath();
              crc2.fillStyle = "#ffffff"; 
              crc2.fill();
            }
          }
          
          // ... (canvas setup)
          
for (let i = 0; i < 20; i++) {
            const flake = new Snowflake(canvas);
            flake.draw();
          }
}
}