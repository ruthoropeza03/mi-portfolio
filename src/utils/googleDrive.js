export function getGoogleDriveFileId(value) {
  if (!value) return "";

  const match = value.match(/\/d\/([^/]+)/) || value.match(/[?&]id=([^&]+)/);
  return match ? match[1] : value.trim();
}

export function getGoogleDrivePreviewUrl(value) {
  const fileId = getGoogleDriveFileId(value);
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : "";
}

export function getGoogleDriveDownloadUrl(value) {
  const fileId = getGoogleDriveFileId(value);
  return fileId ? `https://drive.usercontent.google.com/download?id=${fileId}&export=download` : "";
}

export function getGoogleDriveImageUrl(value) {
  return getGoogleDriveImageUrls(value)[0] || "";
}

export function getGoogleDriveImageUrls(value) {
  const fileId = getGoogleDriveFileId(value);
  if (!fileId) return [];

  return [
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`,
    `https://lh3.googleusercontent.com/d/${fileId}=w1600`,
    `https://drive.google.com/uc?export=view&id=${fileId}`,
  ];
}
