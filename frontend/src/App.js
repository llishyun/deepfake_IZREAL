import React, { useState, useEffect } from 'react';
import './App.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import VotePopup from './VotePopup';
import logo from "./IZREAL_logo.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const getYouTubeVideoId = (url) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.substring(1);
    }
    if (parsedUrl.pathname.startsWith("/shorts/")) {
      return parsedUrl.pathname.replace("/shorts/", "");
    }
    return parsedUrl.searchParams.get("v");
  } catch (error) {
    return null;
  }
};

function App() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [realScore, setRealScore] = useState(null);
  const [fakeScore, setFakeScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [resultText, setResultText] = useState('');

  const handleUrlChange = (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);

    const extractedVideoId = getYouTubeVideoId(inputUrl);
    console.log("Extracted Video ID:", extractedVideoId);
    setVideoId(extractedVideoId);

    const updatedUrl = inputUrl.replace('youtube.com/shorts/', 'youtube.com/watch?v=');
    setEmbedUrl(updatedUrl);
  };

  const handlePrediction = async () => {
    setLoading(true);
    try {
      console.log("📡 예측 요청 전송:", { url });

      const response = await fetch("http://localhost:8000/predict/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
          console.log("✅ 예측 성공:", data);
          setPrediction(data.message);
          setRealScore(data.real_score);
          setFakeScore(data.fake_score);
          setResultText(data.result_text);
      } else {
          console.error("🚨 API 응답 오류:", data);
          setPrediction(`Error: ${data.error || "Failed to fetch prediction"}`);
      }
  } catch (error) {
      console.error("🚨 서버 오류 발생:", error);
      setPrediction("Error: Failed to fetch prediction");
  } finally {
      setLoading(false);
  }try {
        console.log("📡 예측 요청 전송:", { url });

        const response = await fetch("http://localhost:8000/predict/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ 예측 성공:", data);
            setPrediction(data.message);
            setRealScore(data.real_score);
            setFakeScore(data.fake_score);
            setResultText(data.result_text);
        } else {
            console.error("🚨 API 응답 오류:", data);
            setPrediction(`Error: ${data.error || "Failed to fetch prediction"}`);
        }
    } catch (error) {
        console.error("🚨 서버 오류 발생:", error);
        setPrediction("Error: Failed to fetch prediction");
    } finally {
        setLoading(false);
    }
  };

  // ✅ 예측이 완료되고 videoId가 존재하면 자동으로 팝업 띄우기
  useEffect(() => {
    if (prediction && videoId) {
      console.log("✅ 예측 완료! 팝업을 띄웁니다.");
      setShowPopup(true);
    }
  }, [prediction, videoId]);

  const chartData = {
    labels: ['Real Video', 'Fake Video'],
    datasets: [
      {
        data: [realScore || 0, fakeScore || 0],
        backgroundColor: ['#A6DAF4', '#F4A1A7'],
        borderColor: ['#A6DAF4', '#F4A1A7'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container">
      <img src={logo} alt="IZREAL 로고" className="logo" />
      <h3 className="title">숏폼 영상 딥페이크 탐지 사이트</h3>
      
      <div className="input-group">
        <input 
          type="text" 
          value={url} 
          onChange={handleUrlChange} 
          placeholder="YouTube 영상 URL을 입력하세요." 
        />
      </div>
      
      <button onClick={handlePrediction} disabled={loading}>
        {loading ? '로딩 중...' : '딥페이크 여부 예측'}
      </button>

      {embedUrl && videoId && (
        <iframe 
          width="600" 
          height="auto" 
          src={`https://www.youtube.com/embed/${videoId}`} 
          title="YouTube video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      )}

      {prediction && <p className="highlighted">{prediction}</p>}

      {realScore !== null && fakeScore !== null && (
        <div className="chart-container">
          <Pie data={chartData} />
          <p>👍 진짜 영상 점수: {realScore.toFixed(3)}</p>
          <p>👎 가짜 영상 점수: {fakeScore.toFixed(3)}</p>
        </div>
      )}

      {resultText && (
        <div className="result-container">
          <h3 className="text-lg font-bold">📋 Prediction Result</h3>
          <pre>{resultText}</pre>
        </div>
      )}

      {/* ✅ 투표 팝업 */}
      {showPopup && videoId && (
        <VotePopup videoId={videoId} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

export default App;
