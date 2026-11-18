/* Regenerates assets/avatars/*.svg from tools/avatar-art.mjs.
   Dev-only: the game ships the generated files, it never needs this script. Run: node tools/generate-avatars.mjs */
import { mkdirSync, writeFileSync } from "node:fs";
import { AVATAR_ART, HOPE_EXPRESSIONS } from "./avatar-art.mjs";

const OUT = new URL("../assets/avatars/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
mkdirSync(OUT, { recursive: true });

function standalone(svg) {
  return svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" ');
}

let count = 0;
for (const [name, art] of Object.entries(AVATAR_ART)) {
  if (art.expressions) {
    for (const expr of art.expressions) {
      writeFileSync(`${OUT}${name}-${expr}.svg`, standalone(art.render(expr)));
      count++;
    }
  } else {
    writeFileSync(`${OUT}${name}.svg`, standalone(art.render()));
    count++;
  }
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">` +
  `<rect x="6" y="2" width="6" height="4" fill="#F8FAFC"/><rect x="5" y="6" width="7" height="5" fill="#F8FAFC"/>` +
  `<rect x="4" y="11" width="4" height="3" fill="#8B5CF6"/><rect x="8" y="11" width="4" height="3" fill="#8B5CF6"/></svg>`;
mkdirSync(new URL("../assets/icons/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"), { recursive: true });
writeFileSync(`${new URL("../assets/icons/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")}favicon.svg`, favicon);

console.log(`Generated ${count} avatars + favicon in assets/`);
