import StepperForm from "./features/StepperForm/intex";
import ArnifiRichEditor from "./features/RichEditor";

function App() {
  return (
    <div
      style={{
        backgroundColor: "lightblue",
        minHeight: "100vh",
        width: "100%",
        padding: "50px",
      }}
    >
      <main
        style={{
          maxWidth: "1000px",
          margin: "auto",
          backgroundColor: "white",
          borderRadius: "10px",
          minHeight: "80vh",
          padding: "20px",
        }}
      >
        <StepperForm />
        {/* <RechEditor /> */}
        {/* <ArnifiRichEditor /> */}
      </main>
    </div>
  );
}

export default App;
