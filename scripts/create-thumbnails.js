import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Función para reducir la calidad de una imagen
async function reduceImageQuality(inputPath, outputPath, quality) {
  try {
    await sharp(inputPath)
      .webp({ quality: quality }) // Configura la calidad de la imagen
      .toFile(outputPath);
    console.log(`Imagen procesada y guardada: ${outputPath}`);
  } catch (error) {
    console.error(`Error procesando la imagen ${inputPath}:`, error);
  }
}

// Función principal para procesar las imágenes
async function processImages(inputFolder, outputFolder, quality) {
  try {
    // Asegura que la carpeta de salida exista (la crea si no)
    await fs.ensureDir(outputFolder);

    // Elimina el contenido existente en la carpeta de salida
    await fs.emptyDir(outputFolder);

    // Lee todos los archivos de la carpeta de entrada
    const files = await fs.readdir(inputFolder);

    // Filtra solo los archivos de imagen (por ejemplo, .jpg y .png)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

    // Muestra el número de imágenes encontradas
    console.log(`Número de imágenes encontradas: ${imageFiles.length}`);

    // Procesa cada archivo de imagen
    for (const file of imageFiles) {
      const inputPath = path.join(inputFolder, file);
      const outputPath = path.join(outputFolder, file);

      // Reduce la calidad de la imagen
      await reduceImageQuality(inputPath, outputPath, quality);
    }

    console.log('Todas las imágenes han sido procesadas.');
  } catch (error) {
    console.error('Error procesando las imágenes:', error);
  }
}

// Obtener el nombre de archivo y la ruta del módulo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);
console.log('Join');
console.log(path.join(__dirname, '../public/images/gallery/Velada'));

// Parámetros
const inputFolder = path.join(__dirname, '../public/images/gallery/Velada'); // Cambia esto a la ruta de tu carpeta de imágenes
const outputFolder = path.join(__dirname, '../public/images/gallery/Velada-thumbnail'); // Cambia esto a la ruta de tu carpeta de salida
const quality = 50; // Ajusta la calidad deseada (entre 0 y 100)

// Llamar a la función principal para procesar las imágenes
processImages(inputFolder, outputFolder, quality);