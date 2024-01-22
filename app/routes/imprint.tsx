export default function ImprintPage() {
  return (
    <div className="font-sans bg-gray-100 h-full">
      <div className="bg-gray-800 text-white p-4 text-center w-full fixed top-0">
        <h1>Impressum</h1>
      </div>

      <div className="flex flex-col justify-center items-center h-full">
        <section className="max-w-2xl w-full m-5 p-5 bg-white shadow-md rounded-lg text-center">
          <h2>Company</h2>
          <p>PlaygroundsHUB</p>
        </section>

        <section className="max-w-2xl w-full m-5 p-5 bg-white shadow-md rounded-lg text-center">
          <h2>Adress</h2>
          <p>Musterstraße 123, 12345 Musterstadt</p>
        </section>

        <section className="max-w-2xl w-full m-5 p-5 bg-white shadow-md rounded-lg text-center">
          <h2>Contact</h2>
          <p>Email: m_busc15@wwu.de</p>
          <p>Telefon: +49 123 456789</p>
        </section>

        <section className="max-w-2xl w-full m-5 p-5 bg-white shadow-md rounded-lg text-center">
          <h2>Represented by</h2>
          <p>Jakob Danel, Frederick Bruch, Maximilian Busch</p>
        </section>
      </div>
    </div>
  );
}
