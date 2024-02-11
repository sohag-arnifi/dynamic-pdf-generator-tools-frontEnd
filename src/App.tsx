import StepperForm from "./features/StepperForm/intex";
import ArnifiRichEditor from "./features/RichEditor";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { documents } from "./utils/constants/formSteps";
import Editor from "./features/NewRichEditor/Editor";

function App() {
  const [selectedDoc, setSelectedDoc] = useState(() => {
    const storedSelectedDoc = localStorage.getItem("selected-doc");
    return storedSelectedDoc ? JSON.parse(storedSelectedDoc) : "";
  });
  const [showForm, setShowForm] = useState(() => {
    const storedShowForm = localStorage.getItem("show-form");
    return storedShowForm ? JSON.parse(storedShowForm) : true;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedDoc]);

  const Loader = () => {
    return (
      <Box
        marginY={"50px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ minHeight: "60vh" }}
      >
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        minHeight: "100vh",
        width: "100%",
        padding: "50px",
      }}
    >
      {/* <Editor /> */}
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
            {documents?.map((doc) => (
              <MenuItem key={doc.id} value={JSON.stringify(doc)}>
                {doc.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <Box marginY={"20px"}>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              setShowForm(true);
              localStorage.setItem("show-form", JSON.stringify(true));
            }}
            color={showForm ? "error" : "primary"}
            variant="contained"
          >
            Dynamic Form
          </Button>
          <Button
            onClick={() => {
              setShowForm(false);
              localStorage.setItem("show-form", JSON.stringify(false));
            }}
            color={!showForm ? "error" : "primary"}
            variant="contained"
          >
            Dynamic Template
          </Button>
        </Stack>
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
        {showForm ? (
          !selectedDoc ? (
            <Box>
              <Typography
                variant="h5"
                sx={{
                  padding: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                No document selected!
              </Typography>
            </Box>
          ) : (
            <StepperForm selectedDocId={selectedDoc?.id} />
          )
        ) : loading ? (
          <Loader />
        ) : (
          <ArnifiRichEditor selectedDoc={selectedDoc} />
        )}
      </main>
    </div>
  );
}

export default App;
