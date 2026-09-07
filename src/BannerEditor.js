import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const BannerEditor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // Uygulama açıldığında Canvas'ı başlatıyoruz
  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800, // TS3/CS2 standart banner genişliği
      height: 200,
      backgroundColor: '#1a1a1a',
    });
    setCanvas(initCanvas);

    return () => {
      initCanvas.dispose();
    };
  }, []);

  // Yazı Ekleme Fonksiyonu
  const addText = (defaultText) => {
    if (canvas) {
      const text = new fabric.IText(defaultText, {
        left: 50,
        top: 50,
        fontFamily: 'Impact',
        fill: '#ffffff',
        fontSize: 40,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.8)',
          blur: 5,
          offsetX: 3,
          offsetY: 3
        })
      });
      canvas.add(text);
      canvas.setActiveObject(text);
    }
  };

  // Kütüphaneden Hazır Obje (Logo/Efekt) Ekleme
  const addAsset = (url, scale) => {
    if (canvas) {
      fabric.Image.fromURL(url, (img) => {
        img.scale(scale);
        img.set({ left: 100, top: 10 });
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    }
  };

  // Arka Plan Rengini veya Görselini Değiştirme
  const setBackground = (color) => {
    if (canvas) {
      canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    }
  };

  // Tasarımı İndirme
  const downloadBanner = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'LegacyCanvas-Banner.png';
      link.click();
    }
  };

  // Seçili objeyi silme (Delete tuşu işlevi)
  const deleteSelected = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', color: 'white', backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      <h1>LegacyCanvas Editör</h1>
      
      {/* Kontrol Paneli */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => addText('Legacy Gaming')} style={btnStyle}>➕ Metin Ekle</button>
        <button onClick={() => addText('Siyaset Gaming - CS 1.6')} style={btnStyle}>➕ Sunucu Adı Ekle</button>
        
        {/* Hazır Asset Butonları (Şu an placeholder URL'ler, buralara kendi CDN linklerimizi koyacağız) */}
        <button onClick={() => addAsset('https://cdn-icons-png.flaticon.com/512/324/324128.png', 0.2)} style={btnStyle}>🦅 Kartal Maskotu</button>
        <button onClick={() => addAsset('https://cdn-icons-png.flaticon.com/512/3132/3132791.png', 0.2)} style={btnStyle}>⚡ Şimşek Efekti</button>
        
        <button onClick={() => setBackground('#001f3f')} style={btnStyle}>❄️ Kış/Gece Teması</button>
        <button onClick={() => setBackground('#8b0000')} style={btnStyle}>🔴 Savaş Teması</button>
        
        <button onClick={deleteSelected} style={{...btnStyle, backgroundColor: '#d9534f'}}>🗑️ Seçiliyi Sil</button>
        <button onClick={downloadBanner} style={{...btnStyle, backgroundColor: '#5cb85c'}}>💾 Banneri İndir</button>
      </div>

      {/* Tasarım Alanı */}
      <div style={{ border: '3px solid #333', display: 'inline-block', boxShadow: '0 0 20px rgba(0,255,255,0.2)' }}>
        <canvas ref={canvasRef} />
      </div>
      
      <p style={{ marginTop: '10px', color: '#aaa' }}>İpucu: Objeleri sürükle, köşelerinden tutup büyüt veya metinlere çift tıklayarak düzenle.</p>
    </div>
  );
};

const btnStyle = {
  padding: '10px 15px',
  cursor: 'pointer',
  backgroundColor: '#333',
  color: 'white',
  border: '1px solid #555',
  borderRadius: '5px',
  fontWeight: 'bold'
};

export default BannerEditor;
