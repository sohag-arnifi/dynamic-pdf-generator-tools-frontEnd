import { Box, IconButton } from "@mui/material";
import pluginsList from "./toolsIconList";

const Toolbar = () => {
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#f5f5f5",
        marginY: "20px",
        padding: "20px",
      }}
    >
      <Box>
        {pluginsList.map(({ id, Icon, event }) => (
          <IconButton key={id} onClick={() => console.log(event)}>
            <Icon />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default Toolbar;
