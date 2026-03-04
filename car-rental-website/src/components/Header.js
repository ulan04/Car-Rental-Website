import Brand from "./Brand";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-row">

        <Brand />

        <NavLinks />

      </div>
    </header>
  );
}