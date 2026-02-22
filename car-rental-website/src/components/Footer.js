export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-row">
        <p>© {year} Ulan Car Rental</p>
        <p>Welcome to Ulan Car Rental</p>
      </div>
    </footer>
  );
}