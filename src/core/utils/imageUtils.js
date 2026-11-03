// heic2any is ~1.3 MB, so it is loaded only when a HEIC file actually needs converting

/**
 * Checks if a file is a valid image, including HEIC / HEIF format.
 * @param {File} file 
 * @returns {boolean}
 */
export const isImageFile = (file) => {
    if (!file) return false;
    const type = (file.type || '').toLowerCase();
    const name = (file.name || '').toLowerCase();
    
    return (
        type.startsWith('image/') ||
        type.includes('heic') ||
        type.includes('heif') ||
        /\.(heic|heif|jpg|jpeg|png|webp|gif|avif|bmp|svg)$/i.test(name)
    );
};

/**
 * Checks specifically if a file is in HEIC or HEIF format.
 * @param {File} file 
 * @returns {boolean}
 */
export const isHeicFile = (file) => {
    if (!file) return false;
    const type = (file.type || '').toLowerCase();
    const name = (file.name || '').toLowerCase();
    return (
        type.includes('heic') ||
        type.includes('heif') ||
        /\.(heic|heif)$/i.test(name)
    );
};

/**
 * Converts HEIC/HEIF file to JPEG File object if needed for browser display & storage compatibility.
 * If file is already a standard image format (JPEG/PNG/WEBP/etc.), returns original file.
 * @param {File} file 
 * @returns {Promise<File>}
 */
export const ensureJpegImage = async (file) => {
    if (!file) return file;
    
    if (isHeicFile(file)) {
        try {
            console.log(`🔄 [imageUtils] Converting HEIC image to JPEG: ${file.name}`);
            const { default: heic2any } = await import('heic2any');
            const convertedBlob = await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 0.92,
            });
            
            // heic2any may return a single Blob or array of Blobs
            const blobResult = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
            const newFileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
            
            const convertedFile = new File([blobResult], newFileName, {
                type: 'image/jpeg',
                lastModified: Date.now(),
            });
            console.log(`✅ [imageUtils] HEIC converted successfully to JPEG: ${newFileName}`);
            return convertedFile;
        } catch (error) {
            console.error(`⚠️ [imageUtils] HEIC conversion error for ${file.name}:`, error);
            return file;
        }
    }
    
    return file;
};
