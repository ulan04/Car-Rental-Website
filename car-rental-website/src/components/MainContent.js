import React from "react";

export default function MainContent({ children }) {
  return (
    <main className="main">
      <div className="container">{children}</div>
    </main>
  );
}