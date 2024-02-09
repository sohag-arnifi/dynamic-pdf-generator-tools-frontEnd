import StepperForm from "./features/StepperForm/intex";
import ArnifiRichEditor from "./features/RichEditor";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { documents } from "./utils/constants/formSteps";

function App() {
  const [selectedDoc, setSelectedDoc] = useState(() => {
    const storedSelectedDoc = localStorage.getItem("selected-doc");
    return storedSelectedDoc ? JSON.parse(storedSelectedDoc) : "";
  });

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        minHeight: "100vh",
        width: "100%",
        padding: "50px",
      }}
    >
      <Box
        sx={{
          maxWidth: "1000px",
          margin: "20px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "white",
          padding: "10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ paddingRight: "20px", textAlign: "center" }}
        >
          Select your preferred form
        </Typography>
        <Box>
          <Select
            sx={{
              width: "300px",
            }}
            displayEmpty
            value={selectedDoc}
            onChange={(e) => {
              setSelectedDoc(JSON.parse(e.target.value));
              localStorage.setItem("selected-doc", e.target.value);
            }}
            inputProps={{ "aria-label": "Without label" }}
            renderValue={() => {
              if (!selectedDoc) {
                return "Select Document from the list";
              }
              return selectedDoc?.name;
            }}
          >
            {/* <MenuItem value={""}>Select Document from the list</MenuItem> */}
            {documents?.map((doc) => (
              <MenuItem key={doc.id} value={JSON.stringify(doc)}>
                {doc.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

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
        {!selectedDoc ? (
          <Box>
            <Typography
              variant="h5"
              sx={{ padding: "20px", fontWeight: "bold", textAlign: "center" }}
            >
              No document selected!
            </Typography>
          </Box>
        ) : (
          <StepperForm selectedDocId={selectedDoc?.id} />
        )}
        {/* <RechEditor /> */}
        {/* <ArnifiRichEditor /> */}
      </main>
    </div>
  );
}

export default App;
