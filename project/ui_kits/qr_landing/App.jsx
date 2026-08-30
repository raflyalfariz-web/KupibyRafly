function App() {
  const [view, setView] = React.useState("landing");
  const [state, setState] = React.useState({ ml500: 1, l1: 0, sweet: "Normal", name: "", addr: "", time: "" });
  const set = (patch) => setState((s) => ({ ...s, ...patch }));
  return (
    <React.Fragment>
      <BrandBar />
      <Hero />
      <Menu onOrder={() => setView("order")} />
      <ShopInfo />
      <Footer />
      {view === "landing" ? <StickyCta onOrder={() => setView("order")} /> : null}
      {view === "order" ? <OrderSheet state={state} set={set} onClose={() => setView("landing")} onSend={() => setView("wa")} /> : null}
      {view === "wa" ? <WaHandoff state={state} onBack={() => setView("landing")} /> : null}
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
