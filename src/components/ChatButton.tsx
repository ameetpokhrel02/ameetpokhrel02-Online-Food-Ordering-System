import React, { useState } from "react";
import { Box, IconButton, Modal, Typography, Button, OutlinedInput } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';

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
  p: 0,
  borderRadius: 4,
  minWidth: 340,
  minHeight: 320,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hey here! 👋 Want to connect with an expert to talk through our pricing?',
      date: '22 May',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'user', text: input, date: new Date().toLocaleDateString() }]);
      setInput('');
    }
  };

  return (
    <>
      <Box sx={style}>
        <IconButton
          color="primary"
          size="large"
          sx={{ bgcolor: 'primary.main', color: '#fff', boxShadow: 3, '&:hover': { bgcolor: 'secondary.main' } }}
          onClick={() => setOpen(true)}
        >
          <ChatBubbleOutlineIcon fontSize="large" />
        </IconButton>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: 'fixed',
          bottom: 80,
          right: 40,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          borderRadius: 4,
          minWidth: 340,
          minHeight: 320,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: 1.5, px: 2, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 500, textAlign: 'center' }}>22 May</Typography>
          </Box>
          <Box sx={{ flex: 1, px: 2, py: 2, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Avatar src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
              <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 3, p: 1.5, maxWidth: '80%' }}>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>{messages[0].text}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              <Button variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', color: 'primary.main', borderColor: 'primary.main', fontWeight: 600, mb: 1 }} onClick={() => setMessages([...messages, { type: 'user', text: 'Find more about pricing!', date: new Date().toLocaleDateString() }])}>
                Find more about pricing!
              </Button>
              <Button variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', color: 'primary.main', borderColor: 'primary.main', fontWeight: 600 }} onClick={() => setMessages([...messages, { type: 'user', text: 'Talk to an expert!', date: new Date().toLocaleDateString() }])}>
                Talk to an expert!
              </Button>
            </Box>
            {/* Render user messages below */}
            {messages.slice(1).map((msg, idx) => (
              <Box key={idx} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <Box sx={{ bgcolor: 'secondary.main', color: '#fff', borderRadius: 3, p: 1.2, maxWidth: '70%' }}>
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ px: 2, py: 1.5, bgcolor: '#fafafa', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, display: 'flex', alignItems: 'center', gap: 1 }}>
            <OutlinedInput
              fullWidth
              placeholder="Lorem ipsum dolor sit amet."
              value={input}
              onChange={e => setInput(e.target.value)}
              sx={{ bgcolor: '#fff', borderRadius: 2, fontSize: 15 }}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            />
            <IconButton color="primary" onClick={handleSend} sx={{ bgcolor: 'primary.main', color: '#fff', ml: 1 }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
