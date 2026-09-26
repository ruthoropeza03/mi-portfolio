import {
  getGoogleDriveDownloadUrl,
  getGoogleDriveImageUrls,
  getGoogleDrivePreviewUrl,
} from "./googleDrive";

const defaultR2PublicUrl = "https://media.ruthoropeza.site";
const r2PublicUrl = (import.meta.env.VITE_R2_PUBLIC_URL || defaultR2PublicUrl).replace(/\/+$/, "");

export function getR2AssetUrl(key) {
  if (!key) return "";

  const safeKey = key.split("/").map(encodeURIComponent).join("/");
  return `${r2PublicUrl}/${safeKey}`;
}

export function getProjectImageUrls(project) {
  const r2Url = getR2AssetUrl(project.r2Image);
  return [...(r2Url ? [r2Url] : []), ...getGoogleDriveImageUrls(project.image)];
}

export function getCvAsset() {
  const r2Key = import.meta.env.VITE_R2_CV_PDF_KEY?.trim();
  if (r2Key) {
    const url = getR2AssetUrl(r2Key);
    return { previewUrl: url, downloadUrl: `${url}?download=1`, opensInNewTab: true };
  }

  const legacyUrl =
    "https://docs.google.com/document/d/1bR_TP_LL2DWy61iIryyjKe8fdwHQIVME/edit?usp=sharing&ouid=106762493859465222525&rtpof=true&sd=true";

  return {
    previewUrl: getGoogleDrivePreviewUrl(legacyUrl),
    downloadUrl: getGoogleDriveDownloadUrl(legacyUrl),
    opensInNewTab: false,
  };
}

export function getCertificationPdfUrl(certification) {
  const r2Key = import.meta.env.VITE_R2_AI_CERTIFICATE_PDF_KEY?.trim();
  return certification.id === "CIA1" && r2Key ? getR2AssetUrl(r2Key) : certification.PDF;
}
