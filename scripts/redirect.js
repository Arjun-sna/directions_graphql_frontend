const fs = require('fs');

fs.writeFileSync('dist/_redirects', '/* /index.html 200')