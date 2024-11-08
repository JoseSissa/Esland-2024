import { readFile } from 'fs/promises'; // Asegúrate de usar la versión de Node.js que soporte ESM (18+)

async function loadData() {
  try {
    const data = await readFile(new URL('../src/data/editions-vote.json', import.meta.url), 'utf-8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
}

const voteInfo = await loadData();

const insertStatements = []

voteInfo.forEach(({ categoryName, candidates: categoryCandidates, id: categoryId }) => {
    insertStatements.push(`INSERT INTO Categories (category_id, category_name) VALUES ("${categoryId}", "${categoryName}");`)

    categoryCandidates.forEach(({ name, image, link, id }) => {
        insertStatements.push(`INSERT INTO Options (option_id, category_id, option_name) VALUES ("${id}", "${categoryId}", "${name}");`)
    })
})

console.log(insertStatements.join('\n'));
