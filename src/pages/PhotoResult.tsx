import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { useToast } from '../context/ToastContext';

const videoConstraints: MediaTrackConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user',
};

export function PhotoResult() {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const employeeId = (location.state as { employeeId?: string } | null)?.employeeId;

  const handleCapture = () => {
    setError(null);
    const screenshot = webcamRef.current?.getScreenshot();

    if (!screenshot) {
      setError('Unable to capture photo. Please try again.');
      return;
    }

    setCapturedImage(screenshot);
    showToast('Photo captured.', 'success');
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setError(null);
  };

  const handleCancel = () => {
    if (employeeId) {
      navigate(`/details/${employeeId}`);
    } else {
      navigate('/list');
    }
  };

  const handleBackToList = () => {
    navigate('/list');
  };

  const handleDownload = () => {
    if (!capturedImage) {
      return;
    }

    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = 'employee-photo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="photo-page">
      <div className="photo-header">
        <div>
          <h1 className="photo-title">Capture Photo</h1>
          {employeeId && <p className="photo-subtitle">Employee ID: {employeeId}</p>}
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="photo-container">
        {!capturedImage && (
          <div className="webcam-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              onUserMediaError={() =>
                setError('Unable to access camera. Please check permissions and try again.')
              }
            />
          </div>
        )}

        {capturedImage && (
          <img src={capturedImage} alt="Captured" className="photo-preview" />
        )}

        <div className="photo-controls">
          {!capturedImage ? (
            <>
              <button type="button" className="btn btn-primary" onClick={handleCapture}>
                📸 Take Photo
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-primary" onClick={handleDownload}>
                💾 Download
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleRetake}>
                🔄 Retake
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleBackToList}>
                📋 Back to List
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

