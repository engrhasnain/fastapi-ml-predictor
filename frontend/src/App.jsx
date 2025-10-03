import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Something went wrong. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
          Image Intent Classifier
        </h1>

        <div className="flex flex-col items-center mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white shadow"
            }`}
          >
            {loading ? "Processing..." : "Upload & Predict"}
          </button>
        </div>

        {preview && result && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Image */}
            <div className="flex-1 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-90 h-90 object-cover rounded-lg shadow-md"

              />
            </div>

            {/* Right side - Prediction */}
            <div className="flex-1 p-4 border rounded-lg bg-gray-50 shadow-inner">
              <p className="text-lg mb-2">
                <strong className="text-blue-600">Prediction:</strong>{" "}
                {result.prediction}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Extracted Text:</strong>
              </p>
              <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                {result.extracted_text}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
