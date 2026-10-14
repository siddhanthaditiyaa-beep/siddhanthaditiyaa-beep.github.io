# Portfolio

Static site, no build step. Open `index.html` or host the folder anywhere.

- Edit `data.js` to change your name, links, projects, skills and timeline.
- Set `linkedin` and `email` in `data.js` and the buttons appear automatically.
- New public GitHub repos show up in "Fresh from GitHub" once the site is online.

## Put it live on GitHub Pages (run in a terminal, from this folder)

    git clone https://github.com/siddhanthaditiyaa-beep/Portfolio.github.io.git
    cp index.html style.css app.js data.js README.md Portfolio.github.io/
    cd Portfolio.github.io
    git add . && git commit -m "New portfolio" && git push

Then in the repo: Settings > Pages > Deploy from branch > main > / (root).
