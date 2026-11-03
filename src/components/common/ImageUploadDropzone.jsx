import React, { useState, useRef } from 'react';
import { isImageFile, isHeicFile, ensureJpegImage } from '../../core/utils/imageUtils';

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export const ImageUploadDropzone = ({ 
    value, 
    onChange, 
    label = "Profile Photo", 
    helpText,
    required = true,
    aspectRatio = "square" // "square" for team avatars, "banner" for event posters
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [showManualUrl, setShowManualUrl] = useState(false);
    
    // Interactive Adjuster / Auto Align state
    const [isAdjusting, setIsAdjusting] = useState(false);
    const [rawImageSrc, setRawImageSrc] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [posX, setPosX] = useState(50); // 0 (left) to 100 (right)
    const [posY, setPosY] = useState(50); // 0 (top) to 100 (bottom)

    const fileInputRef = useRef(null);

    const handleFiles = async (files) => {
        if (!files || files.length === 0) return;
        let file = files[0];
        if (!isImageFile(file)) {
            alert('Please select or drop a valid image file (PNG, JPG, JPEG, WEBP, HEIC, HEIF).');
            return;
        }

        try {
            if (isHeicFile(file)) {
                file = await ensureJpegImage(file);
            }
            const base64 = await fileToBase64(file);
            setRawImageSrc(base64);
            setZoom(1);
            setPosX(50);
            setPosY(50);
            setIsAdjusting(true);
        } catch (err) {
            console.error("Error reading image file:", err);
            alert("Could not process the selected image file.");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const handleRemoveImage = () => {
        onChange('');
        setRawImageSrc(null);
        setIsAdjusting(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const openAdjusterForCurrent = () => {
        if (!value) return;
        setRawImageSrc(value);
        setZoom(1);
        setPosX(50);
        setPosY(50);
        setIsAdjusting(true);
    };

    // Alignment Presets
    const autoCenter = () => {
        setPosX(50);
        setPosY(50);
        setZoom(1);
    };

    const alignTop = () => {
        setPosX(50);
        setPosY(15);
    };

    const alignBottom = () => {
        setPosX(50);
        setPosY(85);
    };

    const alignLeft = () => {
        setPosX(15);
        setPosY(50);
    };

    const alignRight = () => {
        setPosX(85);
        setPosY(50);
    };

    // Apply Crop & Alignment to canvas and return Data URL
    const applyAlignmentAndCrop = () => {
        if (!rawImageSrc) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const targetWidth = aspectRatio === 'banner' ? 800 : 400;
            const targetHeight = aspectRatio === 'banner' ? 450 : 400;
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            // Fill background white
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, targetWidth, targetHeight);

            const imgAspect = img.width / img.height;
            const targetAspect = targetWidth / targetHeight;

            let renderWidth, renderHeight;
            if (imgAspect > targetAspect) {
                renderHeight = img.height;
                renderWidth = img.height * targetAspect;
            } else {
                renderWidth = img.width;
                renderHeight = img.width / targetAspect;
            }

            const zoomedWidth = renderWidth / zoom;
            const zoomedHeight = renderHeight / zoom;

            const maxX = img.width - zoomedWidth;
            const maxY = img.height - zoomedHeight;

            const srcX = Math.max(0, Math.min(maxX, (posX / 100) * maxX));
            const srcY = Math.max(0, Math.min(maxY, (posY / 100) * maxY));

            ctx.drawImage(img, srcX, srcY, zoomedWidth, zoomedHeight, 0, 0, targetWidth, targetHeight);
            const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
            onChange(croppedDataUrl);
            setIsAdjusting(false);
        };
        img.src = rawImageSrc;
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="block text-xs font-black uppercase text-black">
                    {label}{required ? ' *' : ''}
                </label>
                <button
                    type="button"
                    onClick={() => setShowManualUrl(!showManualUrl)}
                    className="text-[11px] font-bold text-gray-500 hover:text-black underline cursor-pointer"
                >
                    {showManualUrl ? 'Use Drag & Drop' : 'Enter URL / Path Manually'}
                </button>
            </div>

            {showManualUrl ? (
                <div>
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="/images/team/subhashree.jpeg or https://..."
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    />
                </div>
            ) : isAdjusting ? (
                /* Interactive Adjuster & Auto Align Mode */
                <div className="bg-[#fcf9f1] border-[2.5px] border-black rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between border-b-[2px] border-black pb-2">
                        <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                            <span>📐</span> Adjust & Align Image
                        </span>
                        <button
                            type="button"
                            onClick={autoCenter}
                            className="px-3 py-1 rounded-xl bg-[#FFD700] text-black font-black text-[10px] uppercase border-[1.5px] border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-1"
                        >
                            <span>🎯</span> Auto Center
                        </button>
                    </div>

                    {/* Interactive Visual Frame */}
                    <div className="flex justify-center my-2">
                        <div 
                            className={`relative overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white ${
                                aspectRatio === 'banner' 
                                    ? 'w-full h-44 rounded-2xl' 
                                    : 'w-36 h-36 rounded-full'
                            }`}
                        >
                            <img
                                src={rawImageSrc}
                                alt="Adjustment Preview"
                                className="w-full h-full object-cover transition-all duration-75"
                                style={{
                                    objectPosition: `${posX}% ${posY}%`,
                                    transform: `scale(${zoom})`,
                                    transformOrigin: `${posX}% ${posY}%`
                                }}
                            />
                        </div>
                    </div>

                    {/* Quick Alignment Presets */}
                    <div>
                        <span className="block text-[10px] font-black uppercase text-gray-700 mb-1.5 text-center">
                            Alignment Presets:
                        </span>
                        <div className="flex flex-wrap justify-center gap-1.5">
                            <button
                                type="button"
                                onClick={autoCenter}
                                className={`px-2.5 py-1 rounded-lg border-[1.5px] border-black text-[10px] font-black uppercase cursor-pointer ${posX === 50 && posY === 50 ? 'bg-[#4285F4] text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                            >
                                🎯 Center
                            </button>
                            <button
                                type="button"
                                onClick={alignTop}
                                className={`px-2.5 py-1 rounded-lg border-[1.5px] border-black text-[10px] font-black uppercase cursor-pointer ${posY < 30 ? 'bg-[#4285F4] text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                            >
                                ⬆️ Top (Head)
                            </button>
                            <button
                                type="button"
                                onClick={alignBottom}
                                className={`px-2.5 py-1 rounded-lg border-[1.5px] border-black text-[10px] font-black uppercase cursor-pointer ${posY > 70 ? 'bg-[#4285F4] text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                            >
                                ⬇️ Bottom
                            </button>
                            <button
                                type="button"
                                onClick={alignLeft}
                                className={`px-2.5 py-1 rounded-lg border-[1.5px] border-black text-[10px] font-black uppercase cursor-pointer ${posX < 30 ? 'bg-[#4285F4] text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                            >
                                ⬅️ Left
                            </button>
                            <button
                                type="button"
                                onClick={alignRight}
                                className={`px-2.5 py-1 rounded-lg border-[1.5px] border-black text-[10px] font-black uppercase cursor-pointer ${posX > 70 ? 'bg-[#4285F4] text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                            >
                                ➡️ Right
                            </button>
                        </div>
                    </div>

                    {/* Fine-Tuning Sliders */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold border-t border-gray-300">
                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase text-black mb-1">
                                <span>Zoom</span>
                                <span>{zoom.toFixed(1)}x</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="2.2"
                                step="0.1"
                                value={zoom}
                                onChange={(e) => setZoom(parseFloat(e.target.value))}
                                className="w-full accent-[#4285F4] cursor-pointer"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase text-black mb-1">
                                <span>Vertical Y</span>
                                <span>{posY}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={posY}
                                onChange={(e) => setPosY(parseInt(e.target.value))}
                                className="w-full accent-[#34A853] cursor-pointer"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase text-black mb-1">
                                <span>Horizontal X</span>
                                <span>{posX}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={posX}
                                onChange={(e) => setPosX(parseInt(e.target.value))}
                                className="w-full accent-[#EA4335] cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Adjuster Action Buttons */}
                    <div className="flex justify-end gap-2 pt-2 border-t-[2px] border-black">
                        <button
                            type="button"
                            onClick={() => setIsAdjusting(false)}
                            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-black font-black text-xs uppercase border-[1.5px] border-black cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={applyAlignmentAndCrop}
                            className="px-5 py-2 rounded-xl bg-[#34A853] hover:bg-black text-white font-black text-xs uppercase border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                            <span>✂️</span> Apply Alignment & Save
                        </button>
                    </div>
                </div>
            ) : (
                /* Standard Dropzone View */
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative w-full rounded-2xl border-[2.5px] border-dashed p-4 flex flex-col items-center justify-center transition-all cursor-pointer select-none min-h-[140px] ${
                        isDragging
                            ? 'border-[#4285F4] bg-[#4285F4]/10 shadow-[4px_4px_0px_0px_rgba(66,133,244,1)] scale-[1.01]'
                            : value
                            ? 'border-black bg-[#fcf9f1]'
                            : 'border-gray-400 bg-[#fcf9f1] hover:border-black hover:bg-white'
                    }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.heic,.HEIC,.heif,.HEIF"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    {value ? (
                        <div className="flex flex-col items-center gap-3 w-full">
                            <div className="relative group">
                                <img
                                    src={value}
                                    alt="Preview"
                                    className={`object-cover border-[2.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                                        aspectRatio === 'banner'
                                            ? 'w-48 h-24 rounded-xl'
                                            : 'w-24 h-24 rounded-full'
                                    }`}
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400';
                                    }}
                                />
                                <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-black">Change</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openAdjusterForCurrent();
                                    }}
                                    className="px-3 py-1 rounded-xl bg-[#FFD700] text-black font-black text-[10px] uppercase border-[1.5px] border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-1"
                                >
                                    <span>🎯</span> Adjust & Align Photo
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveImage();
                                    }}
                                    className="px-3 py-1 rounded-xl bg-[#EA4335] text-white font-black text-[10px] uppercase border-[1.5px] border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-2 py-2">
                            <div className="w-12 h-12 rounded-full bg-[#FFD700] border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto text-xl">
                                📸
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase text-black">
                                    Drag & Drop Member Photo Here
                                </p>
                                <p className="text-[11px] font-bold text-gray-500 mt-0.5">
                                    or <span className="text-[#4285F4] underline">browse file</span> from your device
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {helpText && (
                <p className="text-[10px] font-bold text-gray-500 uppercase">{helpText}</p>
            )}
        </div>
    );
};
