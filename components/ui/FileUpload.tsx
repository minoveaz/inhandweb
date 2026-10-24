import React, { useId, useState } from 'react';

export const FileUpload: React.FC<{
  label: string;
  acceptText?: string;
  onFileSelect?: (fileName: string | null) => void;
}> = ({
  label,
  acceptText = 'PNG, JPG o PDF. Máximo 10 MB.',
  onFileSelect,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputId = useId();

  const handleFile = (f?: File) => {
    if (!f) return;
    setFileName(f.name);
    onFileSelect?.(f.name);
  };

  return (
    <div className="space-y-2">
      <span className="ds-label block">{label}</span>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`flex flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed p-6 text-center cursor-pointer transition duration-fast ${
          dragging
            ? 'border-ih-cobalt bg-ih-sand/50'
            : 'border-ih-border-control bg-ih-raised hover:border-ih-cobalt'
        }`}
      >
        <span className="w-9 h-9 rounded-pill bg-ih-sand text-ih-cobalt font-bold flex items-center justify-center text-lg">
          +
        </span>
        <span className="text-sm font-bold text-ih-cobalt">
          Seleccionar un archivo o arrastrar aquí
        </span>
        <span className="ds-helper">{acceptText}</span>
        <input
          id={inputId}
          type="file"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>

      {fileName && (
        <div className="flex items-center justify-between rounded-control bg-ih-success-bg border border-ih-success-fg/25 px-3.5 py-2 text-xs">
          <span className="font-bold text-ih-success-fg">✓ {fileName}</span>
          <button
            type="button"
            onClick={() => {
              setFileName(null);
              onFileSelect?.(null);
            }}
            className="font-bold text-ih-danger-fg hover:underline"
          >
            Retirar
          </button>
        </div>
      )}
    </div>
  );
};
