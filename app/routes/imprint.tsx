// Speichere diesen Code in einer Datei mit der Erweiterung .tsx, z.B. impressum.tsx

import React from 'react';

const ImpressumPage: React.FC = () => {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Impressum</title>
          <style>
            {`
              body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
              }

              header {
                background-color: #333;
                color: #fff;
                padding: 10px;
                text-align: center;
                width: 100%;
              }

              section {
                max-width: 600px;
                width: 100%;
                margin: 20px;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
              }

              h2 {
                color: #333;
              }

              p {
                color: #555;
              }
            `}
          </style>
        </head>
        <body>
          <header>
            <h1>Impressum</h1>
          </header>

          <section>
            <h2>Company</h2>
            <p>PlaygroundsHUB</p>
          </section>

          <section>
            <h2>Adress</h2>
            <p>Musterstraße 123, 12345 Musterstadt</p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>Email: m_busc15@wwu.de</p>
            <p>Telefon: +49 123 456789</p>
          </section>

          <section>
            <h2>Represented by</h2>
            <p>Jakob Danel, Fred Bruch, Maximilian Busch</p>
          </section>

          {/* Add more sections for additional information */}

          <script>
            {/* You can add JavaScript code here if needed */}
          </script>
        </body>
      </html>
    </>
  );
};

export default ImpressumPage;
