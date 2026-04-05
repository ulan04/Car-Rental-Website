import { NavLink, Outlet } from "react-router-dom";

export default function Support() {
  return (
    <div className="container">
      <h2>Support</h2>
      <p>Need help with bookings or managing your fleet? Start here.</p>

      <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
        <NavLink
          to="/support"
          end
          style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 500,
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Contact
        </NavLink>
        <NavLink
          to="faq"
          style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 500,
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          FAQ
        </NavLink>
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
      <p>We usually reply within 2 hours during business time.</p>
    </div>
  );
}

export function SupportFAQ() {
  return (
    <div>
      <h3>Common questions</h3>
      <ol>
        <li><strong>Can I edit a booking?</strong> Yes, open the booking page and click “Edit”.</li>
        <li><strong>What documents are required?</strong> A valid driver license and ID card.</li>
        <li><strong>How do I add a new car?</strong> Go to Cars → “+ Add Car”.</li>
      </ol>
    </div>
  );
}
