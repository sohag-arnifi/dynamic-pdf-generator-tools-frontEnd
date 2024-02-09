import { Box, IconButton } from "@mui/material";
import pluginsList from "./toolsIconList";
import useOnClickListener from "./useOnClickListener";

const Toolbar = () => {
  const { onClick } = useOnClickListener();

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
        {pluginsList.map((plugin) => (
          <IconButton
            sx={{ marginX: "5px" }}
            key={plugin.id}
            onClick={() => onClick(plugin.event)}
          >
            {plugin.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default Toolbar;
