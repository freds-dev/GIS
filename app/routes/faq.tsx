// Speichere diesen Code in einer Datei mit der Erweiterung .tsx, z.B. faq.tsx

import React from 'react';

const FAQPage: React.FC = () => {
  return (
    <>
      
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>FAQ Page</title>
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
            <h1>Frequently Asked Questions</h1>
          </header>

          <section>
            <h2>How do I find information about playgrounds?</h2>
            <p>You can use the search bar on the explore page to find information about playgrounds in Münster.</p>
          </section>

          <section>
            <h2>Can I contribute by adding new playgrounds?</h2>
            <p>No, you can not contribute new playgrounds, but yopu can contact us and give us information about new playgrounds.</p>
          </section>

          <section>
            <h2>Is there a mobile app available?</h2>
            <p>Currently, there is no mobile app available, but you can access the website on your mobile browser.</p>
          </section>

          <section>
            <h2>Are all playgrounds in Münster listed on this website</h2>
            <p>No, there are a few playgrounds missing, due to missing data.</p>
          </section>

          <section>
            <h2>How often is the information about the playgrounds updated?</h2>
            <p>Everytime there is new building in progress.</p>
          </section>

          <section>
            <h2>Are there reviews or recommendations for the playgrounds?</h2>
            <p>Yes, you can comment on your experience on the playgrounds.</p>
          </section>

          <section>
            <h2>What is the best course at the Ifgi?</h2>
            <p>Of course it is GI in society</p>
          </section>

          {/* Add more sections for additional FAQs */}

          <script>
            {/* You can add JavaScript code here if needed */}
          </script>
        </body>
      </html>
    </>
  );
};

export default FAQPage;
