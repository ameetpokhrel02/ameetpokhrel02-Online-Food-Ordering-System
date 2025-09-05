import React, { useState } from "react";
import { Box, IconButton, Modal, Typography, Button } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const style = {
  position: "fixed",
  bottom: 32,
  right: 32,
  zIndex: 9999,
};

const modalStyle = {
  position: "fixed",
  bottom: 80,
  right: 40,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 3,
  minWidth: 280,
  minHeight: 180,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(["hi", "hello"]);

  return (
    <>
      <Box sx={style}>
        <IconButton
          color="primary"
          size="large"
          sx={{ bgcolor: "#fff", boxShadow: 3, '&:hover': { bgcolor: '#f5f5f5' } }}
          onClick={() => setOpen(true)}
        >
          <ChatBubbleOutlineIcon fontSize="large" />
        </IconButton>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Chat
          </Typography>
          <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
            {messages.map((msg, idx) => (
              <Typography key={idx} sx={{ mb: 1, bgcolor: "#f5f5f5", p: 1.2, borderRadius: 2 }}>
                {msg}
              </Typography>
            ))}
          </Box>
          <Button variant="contained" onClick={() => setMessages([...messages, "hi"])} sx={{ mr: 1 }}>
            hi
          </Button>
          <Button variant="contained" onClick={() => setMessages([...messages, "hello"])}>
            hello
          </Button>
        </Box>
      </Modal>
    </>
  );
}
