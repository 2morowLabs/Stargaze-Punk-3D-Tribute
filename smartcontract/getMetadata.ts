import axios from 'axios';
import { writeFile } from 'fs';
import { parse } from 'node-html-parser';

const url = 'https://www.hubble.tools/collections/stargaze-punks/tokens/';

const filterMetadataFromID = async (id: number) => {
  const response = await axios.get(`${url}${id}`);
  const html: string = response.data;

  const root = parse(html);

  const table = root.querySelectorAll('table')[1];
  const rows = table.querySelectorAll('tr');

  let metadata: Array<any> = [];

  for (let i = 0; i < rows.length; i += 2) {
    const row = rows[i];
    const trait_type = row.rawText.trim().split('\n')[0].trim();

    const row2 = rows[i + 1];
    const value = row2.rawText.trim().split('\n')[0].replace('↳', '').trim();
    metadata.push({ trait_type, value });
  }

  metadata = metadata.filter((item) => item.trait_type !== 'Bubble');
  console.log(metadata);

  writeToFile(id, metadata);
};

const writeToFile = async (id: number, attributes: Array<any>) => {
  const fileName = `metadata/${id}`;

  const image = `https://cloud.marcotommoro.duckdns.org/apps/sharingpath/marcotommoro/public/3D_PUNKS/${id}.mp4`;
  const fixed = {
    name: `Stargaze Punks 3D #${id}`,
    description: 'Stargaze Punks tribute',
    external_url: image,
    image,
  };

  const json = JSON.stringify({ ...fixed, attributes });
  console.log(id);
  writeFile(fileName, json, () => {});
};

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const main = async () => {
  for (let i = 6444; i <= 8888; i++) {
    filterMetadataFromID(i);
    if (i % 100 === 0) {
      await sleep(1000);
    }
  }
};

main();
