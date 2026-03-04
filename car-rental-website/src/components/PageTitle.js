export default function PageTitle({ title, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <h2>{title}</h2>
      <div>{right}</div>
    </div>
  );
}