function rulesButtonsToHtml(input) {
  let i = 0;

  const nextToken = () => {
    while (i < input.length && /\s/.test(input[i])) i++;

    const start = i;

    while (i < input.length && !/\s/.test(input[i])) i++;

    return input.slice(start, i);
  };

  const escapeAttr = s =>
    s.replaceAll("&", "&amp;")
     .replaceAll('"', "&quot;")
     .replaceAll("'", "&#39;")
     .replaceAll("<", "&lt;")
     .replaceAll(">", "&gt;");

  let str = nextToken();
  let html = "";

  let header = 1;
  let phase = 0;
  let charger = 0;

  while (str && i < input.length) {
    const buffer = input[i++];

    if (phase === 0 && header === 1) {
      const safe = escapeAttr(str);
      html += `<a href="#${safe}"><input type="button" value="${safe}"/></a>\n`;
      header = 2;
    }

    if (header === 2 && buffer === "\n") {
      header = 0;
    }

    if (buffer === "\n") {
      charger++;

      if (charger === 2) {
        phase++;

        if (phase !== 1) {
          phase = 0;
          header = 1;
          str = nextToken();
          charger = 0;
        }
      }
    } else {
      charger = 0;
    }
  }

  return html;
}


function rulesToHtml(input) {
  let i = 0;
  const nextToken = () => {
    while (i < input.length && /\s/.test(input[i])) i++;
    const start = i;
    while (i < input.length && !/\s/.test(input[i])) i++;
    return input.slice(start, i);
  };

  let str = nextToken();
  let html = "";

  let header = 1;
  let phase = 0;
  let charger = 0;

  while (i < input.length) {
    const buffer = input[i++];

    if (phase === 0 && header === 1) {
      html += `<h4 id='${str}'>`;
      header = 2;
      html += str;
    }

    if (header === 2 && buffer === "\n") {
      html += "</h4>";
      header = 0;
    }

    if (buffer === "\n" && charger === 0 && phase === 1) {
      html += "</li>";
    }

    if ((charger === 1 || charger === 2) && phase === 1 && buffer !== "\n") {
      html += " <li>";
    }

    if (buffer === "\n") {
      charger++;

      if (charger === 2) {
        phase++;

        if (phase === 1) {
          html += "<ul>";
        } else {
          html += "</ul>\n";
          html += `\n<canvas id='${str}1' style='height: 0px; width: 0px;'></canvas>\n`;
          html += `<canvas id='${str}2' style='height: 0px; width: 0px;'></canvas>\n`;

          phase = 0;
          header = 1;
          str = nextToken();
          charger = 0;
        }
      }
    } else {
      charger = 0;
    }

    html += buffer;
  }

  if (phase === 1) {
    if (charger === 0) {
      html += "</li>";
    }

    html += "</ul>\n";
    html += `\n<canvas id='${str}1' style='height: 0px; width: 0px;'></canvas>\n`;
    html += `<canvas id='${str}2' style='height: 0px; width: 0px;'></canvas>\n`;
  }

  return html;
}
