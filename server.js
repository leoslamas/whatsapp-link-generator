  
const express = require('express');
const device = require('express-device');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('dist'));
app.use(device.capture());

const generateGroupLink = (req) => {
  const { code } = req.query;
  const deviceType = req.device.type;
  if (deviceType === 'desktop') {
      return `https://chat.whatsapp.com/${code}`
  }
    return `whatsapp://chat?code=${code}`;
};

const generateChatLink = (req) => {
    const { p, m } = req.query;
    const deviceType = req.device.type;
    if (deviceType === 'desktop') {
        return `https://web.whatsapp.com/send?phone=${p}&text=${m}`;
    }
    return `whatsapp://send?phone=${p}&text=${m}`;
};

app.get('/group', (req, res) => {
  res.redirect(generateGroupLink(req));
});

app.get('/chat', (req, res) => {
    res.redirect(generateChatLink(req));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));