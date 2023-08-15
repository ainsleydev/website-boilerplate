const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const SVGO = require('svgo');

const PUBLIC_PATH = './dist';
const QUALITY = 80;
const COMPRESSION_LEVEL = 8;

const convertImages = async () => {
    const imageFiles = fs.readdirSync(PUBLIC_PATH);

    for (const file of imageFiles) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
            const inputPath = path.join(PUBLIC_PATH, file);
            const baseName = path.basename(file, path.extname(file));

            // Convert to WebP
            await sharp(inputPath)
                .webp({ quality: QUALITY })
                .toFile(path.join(PUBLIC_PATH, `${baseName}.webp`));

            // Convert to Avif
            await sharp(inputPath)
                .avif({ quality: QUALITY })
                .toFile(path.join(PUBLIC_PATH, `${baseName}.avif`));
        }
    }

    // Compress JPGs and PNGs
    const jpgFiles = imageFiles.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'));
    for (const file of jpgFiles) {
        const filePath = path.join(PUBLIC_PATH, file);
        let buffer = await sharp(filePath)
            .jpeg({
                quality: QUALITY,
            })
            .toBuffer();
        await sharp(buffer).toFile(filePath);
    }

    const pngFles = imageFiles.filter(file => file.endsWith('.png'));
    for (const file of pngFles) {
        const filePath = path.join(PUBLIC_PATH, file);
        let buffer = await sharp(filePath)
            .png({
                quality: QUALITY,
            })
            .toBuffer();
        await sharp(buffer).toFile(filePath);
    }

    // Optimise SVGs
    const svgFiles = imageFiles.filter(file => file.endsWith('.svg'));
    for (const file of svgFiles) {
        const inputPath = path.join(PUBLIC_PATH, file);
        const svgContent = fs.readFileSync(inputPath, 'utf-8');

        const optimizedSvgContent = await SVGO.optimize(svgContent);

        fs.writeFileSync(inputPath, optimizedSvgContent.data, 'utf-8');
    }
};

convertImages().catch(err => console.error(err));
