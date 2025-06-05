import { useDropzone } from "react-dropzone";

export default function Uploader({ onUpload, isLoading }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 5 * 1024 * 1024,
    disabled: isLoading,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) onUpload(acceptedFiles[0]);
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Upload Medical Report</h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isLoading ? "bg-gray-100" : "bg-blue-50 hover:bg-blue-100"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-5xl mb-4">📄</div>
        <p className="text-lg font-medium">
          {isLoading
            ? "Processing your report..."
            : "Drag & drop prescription or report image here"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supports JPG, PNG (max 5MB)
        </p>
        <button
          className={`mt-4 px-6 py-2 rounded-lg font-medium ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Select File"}
        </button>
      </div>
    </div>
  );
}
