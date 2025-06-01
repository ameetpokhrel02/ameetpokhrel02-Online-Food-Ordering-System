import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    q: 'From where does Kisanserv get fruits and Vegetables',
    a: 'Pharetra aenean sollicitudin libero arcu sed venenatis sodales consequat egestas. Sodales interdum dolor posuere imperdiet ac lorem risus aliquet sit. Dis vulputate amet ar.'
  },
  {
    q: 'Why is Kisanserv selling Packed vegetables?',
    a: 'Packed vegetables ensure hygiene, freshness, and longer shelf life for our customers.'
  },
  {
    q: 'What if the quality inside packet is not good?',
    a: 'If you are not satisfied with the quality, you can request a refund or replacement easily through our support.'
  },
  {
    q: 'Can I order using Kisanserv.com Portal?',
    a: 'Yes, you can place orders directly through our website portal for your convenience.'
  },
  {
    q: 'My payment got deducted from but order not confirmed?',
    a: 'If your payment is deducted but the order is not confirmed, please contact our customer support for quick resolution.'
  },
  {
    q: 'From where can I download the "Kisanserv Express"App?',
    a: 'You can download the Kisanserv Express app from the Google Play Store or Apple App Store.'
  },
];

const FaqSection: React.FC = () => {
  const [expanded, setExpanded] = React.useState<number | false>(0);
  const handleChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box sx={{ bgcolor: '#f7f7f7', py: 8, px: { xs: 1, sm: 0 } }}>
      <Typography variant="subtitle1" align="center" sx={{ color: '#388e3c', fontWeight: 600, mb: 1 }}>
        Our FAQ
      </Typography>
      <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 2 }}>
        Frequently Asked Questions
      </Typography>
      <Typography align="center" sx={{ color: '#666', mb: 6, maxWidth: 600, mx: 'auto' }}>
        Velit vel sit lacus pharetra pulvinar tempus massa sed. Turpis consectetur justo accumsan ac nunc ornare viverra pharetra.
      </Typography>
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        {faqs.map((faq, i) => (
          <Accordion key={i} expanded={expanded === i} onChange={handleChange(i)} sx={{ mb: 2, borderRadius: 3, boxShadow: 3, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 700, fontSize: '1.1rem', bgcolor: '#fff', borderRadius: 3 }}>
              {faq.q}
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#fff', borderRadius: 3, borderTop: '1px solid #eee', color: '#444' }}>
              {faq.a}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FaqSection; 