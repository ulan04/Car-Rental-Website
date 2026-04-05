import { NavLink, Outlet } from "react-router-dom";

export default function Support() {
  return (
    <div className="container">
      <h2>Support</h2>
      <p>If you have trouble with bookings or cars, start here.</p>

      <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
        <NavLink to="/support" end>
          Contact
        </NavLink>
        <NavLink to="faq">FAQ</NavLink>
      </div>

      <Outlet />
    </div>
  );
}

export function SupportContact() {
  return (
    <div>
      <h3>Contact us</h3>
      <ul>
        <li>Email: support@carrental.example</li>
        <li>Phone: +7 (000) 555-1234</li>
        <li>Hours: 09:00 - 18:00 (Mon - Sat)</li>
      </ul>
    </div>
  );
}

export function SupportFAQ() {
  return (
    <div>
      <h3>Common questions</h3>
      <ol>
        <li>Can I edit a booking? Yes, open the booking page and click Edit.</li>
        <li>What documents are required? Driver license and ID card.</li>
        <li>How do I add a car? Go to Cars and press + Add Car.</li>
      </ol>
    </div>
  );
}
