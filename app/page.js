"use client";
// cos nie tak chyba z use client
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const cursorDotRef = useRef(null);
  const triangleFormRef = useRef(null);
  const converterFormRef = useRef(null);
  const currencyFormRef = useRef(null);

  useEffect(() => {
    // Matrix Code Rain
    const characters = 'アィゥェォカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワンヰヱヲ∀∑∫π∞√∆∇∂∈∉∪∩⊂⊆⊕⊗∴∵≈≠≡≤≥⇒⇔';
    const charArray = characters.split('');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const fontSize = 20; // Definiujemy fontSize przed użyciem
    let columns = Math.floor(window.innerWidth / fontSize);
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(window.innerWidth / fontSize);
      drops.length = 0;
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    }

    const matrixInterval = setInterval(drawMatrix, 33);

    // Kropka śledząca myszką
    const cursorDot = cursorDotRef.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateDot() {
      dotX += (mouseX - dotX) * 0.1;
      dotY += (mouseY - dotY) * 0.1;

      if (cursorDot) {
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
      }

      requestAnimationFrame(animateDot);
    }

    animateDot();

    // Powiększanie kropki na hover
    const interactiveElements = document.querySelectorAll('button, input, select, label');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorDot) {
          cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (cursorDot) {
          cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      });
    });

    // Ruch kontenerów na podstawie ruchu myszy
    const containers = document.querySelectorAll('.container, .converter-container, .currency-container');
    containers.forEach(container => {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const deltaX = (x - midX) / midX;
        const deltaY = (y - midY) / midY;

        const maxRotation = 10;
        const rotateY = deltaX * maxRotation;
        const rotateX = -deltaY * maxRotation;

        container.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      });

      container.addEventListener('mouseleave', () => {
        container.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      });
    });

    // Logika trójkąta
    const triangleForm = triangleFormRef.current;
    if (triangleForm) {
      triangleForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const podstawa = parseFloat(document.getElementById("podstawa").value);
        const bok1 = parseFloat(document.getElementById("bok1").value);
        const bok2 = parseFloat(document.getElementById("bok2").value);
        const kat1 = parseFloat(document.getElementById("kat1").value);
        const kat2 = parseFloat(document.getElementById("kat2").value);
        const kat3 = parseFloat(document.getElementById("kat3").value);

        const resultElement = document.getElementById("result");
        resultElement.classList.remove("success", "error");

        function trojkatIstnieje(podstawa, bok1, bok2, kat1, kat2, kat3) {
          if (podstawa <= 0 || bok1 <= 0 || bok2 <= 0 || kat1 <= 0 || kat2 <= 0 || kat3 <= 0) {
            resultElement.textContent = "Boki i kąty muszą być dodatnie liczby!";
            resultElement.classList.add("error");
            return;
          }
          const sumaBokow = bok1 + bok2;
          const sumaStopni = kat1 + kat2 + kat3;
          let czyBokiOK = sumaBokow > podstawa;
          let czyKatOk = sumaStopni === 180;

          if (czyBokiOK && czyKatOk) {
            resultElement.textContent = "Trójkąt istnieje!";
            resultElement.classList.add("success");
          } else {
            resultElement.textContent = "Trójkąt nie istnieje.";
            resultElement.classList.add("error");
          }
        }

        trojkatIstnieje(podstawa, bok1, bok2, kat1, kat2, kat3);
      });
    }

    // Funkcje konwertera długości
    function converterCm(liczba, jednostka) {
      if (jednostka === "decymetry") {
        return `Wynik wynosi: ${liczba / 10} dm`;
      } else if (jednostka === "metry") {
        return `Wynik wynosi: ${liczba / 100} m`;
      } else if (jednostka === "kilometry") {
        return `Wynik wynosi: ${liczba / 100000} km`;
      } else {
        return "Nieobsługiwana konwersja.";
      }
    }

    function converterDm(liczba, jednostka) {
      if (jednostka === "centymetry") {
        return `Wynik wynosi: ${liczba * 10} cm`;
      } else if (jednostka === "metry") {
        return `Wynik wynosi: ${liczba / 10} m`;
      } else if (jednostka === "kilometry") {
        return `Wynik wynosi: ${liczba / 10000} km`;
      } else {
        return "Nieobsługiwana konwersja.";
      }
    }

    function converterM(liczba, jednostka) {
      if (jednostka === "centymetry") {
        return `Wynik wynosi: ${liczba * 100} cm`;
      } else if (jednostka === "decymetry") {
        return `Wynik wynosi: ${liczba * 10} dm`;
      } else if (jednostka === "kilometry") {
        return `Wynik wynosi: ${liczba / 1000} km`;
      } else {
        return "Nieobsługiwana konwersja.";
      }
    }

    function converterKm(liczba, jednostka) {
      if (jednostka === "centymetry") {
        return `Wynik wynosi: ${liczba * 100000} cm`;
      } else if (jednostka === "decymetry") {
        return `Wynik wynosi: ${liczba * 10000} dm`;
      } else if (jednostka === "metry") {
        return `Wynik wynosi: ${liczba * 1000} m`;
      } else {
        return "Nieobsługiwana konwersja.";
      }
    }

    const converterForm = converterFormRef.current;
    if (converterForm) {
      converterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const liczba = parseFloat(document.getElementById("liczba").value);
        const jednostkaZ = document.getElementById("jednostkaZ").value;
        const jednostkaDo = document.getElementById("jednostkaDo").value;

        const converterResultElement = document.getElementById("converterResult");
        converterResultElement.classList.remove("success", "error");

        function konwertuj(liczba, jednostkaZ, jednostkaDo) {
          if (jednostkaZ === jednostkaDo) {
            return `Wynik wynosi: ${liczba} ${jednostkaDo}`;
          } else if (jednostkaZ === "centymetry") {
            return converterCm(liczba, jednostkaDo);
          } else if (jednostkaZ === "decymetry") {
            return converterDm(liczba, jednostkaDo);
          } else if (jednostkaZ === "metry") {
            return converterM(liczba, jednostkaDo);
          } else if (jednostkaZ === "kilometry") {
            return converterKm(liczba, jednostkaDo);
          } else {
            return "Nieobsługiwana konwersja.";
          }
        }

        const wynik = konwertuj(liczba, jednostkaZ, jednostkaDo);

        if (wynik.includes("Nieobsługiwana")) {
          converterResultElement.textContent = wynik;
          converterResultElement.classList.add("error");
        } else {
          converterResultElement.textContent = wynik;
          converterResultElement.classList.add("success");
        }
      });
    }

    // Funkcje konwertera walut
    const exchangeRates = {
      "PLN": { "GR": 100, "USD": 0.25, "EUR": 0.23 },
      "GR": { "PLN": 0.01, "USD": 0.0025, "EUR": 0.0023 },
      "USD": { "PLN": 4, "GR": 400, "EUR": 0.92 },
      "EUR": { "PLN": 4.35, "GR": 435, "USD": 1.09 }
      // Dodaj więcej walut i kursów w razie potrzeby
    };

    const currencyForm = currencyFormRef.current;
    if (currencyForm) {
      currencyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const kwota = parseFloat(document.getElementById("kwota").value);
        const walutaZ = document.getElementById("walutaZ").value;
        const walutaDo = document.getElementById("walutaDo").value;

        const currencyResultElement = document.getElementById("currencyResult");
        currencyResultElement.classList.remove("success", "error");

        function konwertujWaluty(kwota, walutaZ, walutaDo) {
          if (walutaZ === walutaDo) {
            return `Wynik wynosi: ${kwota} ${walutaDo}`;
          }
          if (!exchangeRates[walutaZ] || !exchangeRates[walutaZ][walutaDo]) {
            return "Nieobsługiwana konwersja.";
          }
          const wynik = kwota * exchangeRates[walutaZ][walutaDo];
          return `Wynik wynosi: ${wynik.toFixed(2)} ${walutaDo}`;
        }

        const wynik = konwertujWaluty(kwota, walutaZ, walutaDo);

        if (wynik.includes("Nieobsługiwana")) {
          currencyResultElement.textContent = wynik;
          currencyResultElement.classList.add("error");
        } else {
          currencyResultElement.textContent = wynik;
          currencyResultElement.classList.add("success");
        }
      });
    }

    return () => {
      clearInterval(matrixInterval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas id="matrix" ref={canvasRef}></canvas>
      <div id="cursor-dot" ref={cursorDotRef}></div>

      {/* Sekcja 1: Trójkąt */}
      <div className="section" id="triangle-section">
        <div className="container" id="triangle-container">
          <h1>Sprawdź, czy trójkąt istnieje</h1>
          <form id="triangleForm" ref={triangleFormRef}>
            <div className="input-group">
              <label htmlFor="podstawa">Podstawa:</label>
              <input type="number" id="podstawa" name="podstawa" required placeholder="Wprowadź podstawę" />
            </div>
            <div className="input-group">
              <label htmlFor="bok1">Bok 1:</label>
              <input type="number" id="bok1" name="bok1" required placeholder="Wprowadź pierwszy bok" />
            </div>
            <div className="input-group">
              <label htmlFor="bok2">Bok 2:</label>
              <input type="number" id="bok2" name="bok2" required placeholder="Wprowadź drugi bok" />
            </div>
            <div className="input-group">
              <label htmlFor="kat1">Kąt 1:</label>
              <input type="number" id="kat1" name="kat1" required placeholder="Wprowadź pierwszy kąt" />
            </div>
            <div className="input-group">
              <label htmlFor="kat2">Kąt 2:</label>
              <input type="number" id="kat2" name="kat2" required placeholder="Wprowadź drugi kąt" />
            </div>
            <div className="input-group">
              <label htmlFor="kat3">Kąt 3:</label>
              <input type="number" id="kat3" name="kat3" required placeholder="Wprowadź trzeci kąt" />
            </div>
            <button type="submit">Sprawdź</button>
          </form>
          <div id="result"></div>
        </div>
      </div>

      {/* Sekcja 2: Konwerter jednostek */}
      <div className="section" id="converter-section">
        <div className="converter-container" id="converter-container">
          <h1>Konwerter jednostek długości</h1>
          <form id="converterForm" ref={converterFormRef}>
            <div className="input-group">
              <label htmlFor="liczba">Wartość:</label>
              <input type="number" id="liczba" name="liczba" required placeholder="Wprowadź wartość" />
            </div>
            <div className="input-group">
              <label htmlFor="jednostkaZ">Jednostka źródłowa:</label>
              <select id="jednostkaZ" name="jednostkaZ" defaultValue="" required>
                <option value="" disabled>Wybierz jednostkę</option>
                <option value="centymetry">Centymetry</option>
                <option value="decymetry">Decymetry</option>
                <option value="metry">Metry</option>
                <option value="kilometry">Kilometry</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="jednostkaDo">Jednostka docelowa:</label>
              <select id="jednostkaDo" name="jednostkaDo" defaultValue="" required>
                <option value="" disabled>Wybierz jednostkę</option>
                <option value="centymetry">Centymetry</option>
                <option value="decymetry">Decymetry</option>
                <option value="metry">Metry</option>
                <option value="kilometry">Kilometry</option>
              </select>
            </div>
            <button type="submit">Konwertuj</button>
          </form>
          <div id="converterResult"></div>
        </div>
      </div>

      {/* Sekcja 3: Konwerter walut */}
      <div className="section" id="currency-section">
        <div className="currency-container" id="currency-container">
          <h1>Konwerter walut</h1>
          <form id="currencyForm" ref={currencyFormRef}>
            <div className="input-group">
              <label htmlFor="kwota">Kwota:</label>
              <input type="number" id="kwota" name="kwota" required placeholder="Wprowadź kwotę" />
            </div>
            <div className="input-group">
              <label htmlFor="walutaZ">Waluta źródłowa:</label>
              <select id="walutaZ" name="walutaZ" defaultValue="" required>
                <option value="" disabled>Wybierz walutę</option>
                <option value="PLN">PLN (zł)</option>
                <option value="GR">GR (gr)</option>
                <option value="USD">$ (dolar)</option>
                <option value="EUR">€ (euro)</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="walutaDo">Waluta docelowa:</label>
              <select id="walutaDo" name="walutaDo" defaultValue="" required>
                <option value="" disabled>Wybierz walutę</option>
                <option value="PLN">PLN (zł)</option>
                <option value="GR">GR (gr)</option>
                <option value="USD">$ (dolar)</option>
                <option value="EUR">€ (euro)</option>
              </select>
            </div>
            <button type="submit">Konwertuj</button>
          </form>
          <div id="currencyResult"></div>
        </div>
      </div>

      <style jsx global>{`
        /* Ogólne style */
        body {
          margin: 0;
          padding: 0;
          background: black;
          font-family: monospace;
          color: #0F0;
          cursor: none;
        }

        /* Canvas dla efektu Matrix */
        canvas {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        /* Kropka śledząca myszkę */
        #cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 12px;
          height: 12px;
          background-color: #0F0;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: transform 0.2s ease, background-color 0.2s ease;
          z-index: 1000;
        }

        /* Ogólne style dla sekcji */
        .section {
          position: relative;
          padding: 50px 20px;
          min-height: 100vh;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Style dla kontenerów */
        .container, .converter-container, .currency-container {
          background: rgba(0,0,0,0.8);
          border: 2px solid #0F0;
          border-radius: 15px;
          padding: 30px 25px;
          width: 100%;
          max-width: 450px;
          margin: 20px;
          color: #0F0;
          transition: transform 0.1s ease-out;
          perspective: 1000px;
        }

        /* Animacja wejścia */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Animacja dla tytułu */
        h1 {
          text-align: center;
          margin-bottom: 25px;
          color: #0F0;
          font-size: 24px;
          animation: fadeInSlide 1s forwards;
          animation-delay: 0.3s;
        }

        @keyframes fadeInSlide {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .input-group {
          position: relative;
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #0F0;
        }

        input, select {
          width: 100%;
          padding: 12px 15px;
          background: #000;
          color: #0F0;
          border: 1px solid #0F0;
          border-radius: 8px;
          box-sizing: border-box;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        input:focus, select:focus {
          border-color: #0F0;
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
          background: #111;
        }

        /* Styl dla select */
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url('data:image/svg+xml;charset=US-ASCII,<svg%20width%3D"16"%20height%3D"16"%20xmlns%3D"http://www.w3.org/2000/svg"><polygon%20points%3D"0,0%2016,0%208,8"%20style%3D"fill:%230F0;"/></svg>');
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 10px;
        }

        button {
          background: #000;
          color: #0F0;
          border: 1px solid #0F0;
          padding: 12px;
          width: 100%;
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.3s, transform 0.2s, color 0.3s;
        }

        button:hover {
          background: #0F0;
          color: #000;
          transform: translateY(-2px);
        }

        #result, #converterResult, #currencyResult {
          margin-top: 25px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
        }

        .success {
          color: #0F0;
        }

        .error {
          color: #F00;
        }

        /* Responsywność */
        @media (max-width: 768px) {
          .section {
            padding: 30px 10px;
          }

          h1 {
            font-size: 20px;
            margin-bottom: 20px;
          }

          input, select {
            font-size: 14px;
            padding: 10px 12px;
          }

          button {
            font-size: 16px;
            padding: 10px;
          }

          #result, #converterResult, #currencyResult {
            font-size: 18px;
          }
        }

        @media (max-width: 500px) {
          .container, .converter-container, .currency-container {
            max-width: 90%;
            margin: 15px;
            padding: 25px 20px;
          }

          h1 {
            font-size: 18px;
            margin-bottom: 15px;
          }

          input, select {
            font-size: 14px;
            padding: 10px 12px;
          }

          button {
            font-size: 16px;
            padding: 10px;
          }

          #result, #converterResult, #currencyResult {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}
