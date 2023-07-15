document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const eraseButton = document.getElementById('eraseButton');
    const brushButton = document.getElementById('brushButton');
    const clearButton = document.getElementById('clearButton');
    const brushSizeInput = document.getElementById('brushSize');
    const colorPicker = document.getElementById('colorPicker');
    let isDrawing = false;
  
    const startDrawing = (e) => {
      if (e.button !== 0) return; // Check for left mouse button
      isDrawing = true;
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
      context.strokeStyle = colorPicker.value;
      context.lineWidth = brushSizeInput.value;
    };
  
    const draw = (e) => {
      if (!isDrawing) return;
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
    };
  
    const stopDrawing = () => {
      isDrawing = false;
    };
  
    const erase = () => {
      context.globalCompositeOperation = 'destination-out';
      context.strokeStyle = 'rgba(0, 0, 0, 1)';
      context.lineWidth = brushSizeInput.value;
    };
  
    const brush = () => {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = colorPicker.value;
      context.lineWidth = brushSizeInput.value;
    };
  
    const changeBrushSize = () => {
      context.lineWidth = brushSizeInput.value;
      if (eraseButton.classList.contains('active')) erase();
    };
  
    const changeColor = () => {
      if (isDrawing) {
        context.strokeStyle = colorPicker.value;
      }
    };
  
    const clearCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
  
    eraseButton.addEventListener('click', () => {
      eraseButton.classList.add('active');
      brushButton.classList.remove('active');
      erase();
    });
  
    brushButton.addEventListener('click', () => {
      brushButton.classList.add('active');
      eraseButton.classList.remove('active');
      brush();
    });
  
    brushSizeInput.addEventListener('input', changeBrushSize);
  
    colorPicker.addEventListener('input', changeColor);
  
    clearButton.addEventListener('click', clearCanvas);
  });
  