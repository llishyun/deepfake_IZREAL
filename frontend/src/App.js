
import React, { useState, useEffect } from 'react';
import './App.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import VotePopup from './VotePopup';

ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ YouTube Video ID 추출 함수
const getYouTubeVideoId = (url) => {
  try {
    const parsedUrl = new URL(url);

    // ✅ youtu.be 단축 URL 처리 (예: https://youtu.be/oPbuyJqSQ2k)
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.substring(1);
    }

    // ✅ YouTube Shorts URL 처리 (예: https://www.youtube.com/shorts/oPbuyJqSQ2k)
    if (parsedUrl.pathname.startsWith("/shorts/")) {
      return parsedUrl.pathname.replace("/shorts/", "");
    }

    // ✅ 일반적인 YouTube URL 처리 (예: https://www.youtube.com/watch?v=oPbuyJqSQ2k)
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
    <div>
      <h1 style={{ textAlingn : 'center', margit : '20px 0', color :'rgb(194, 16, 194)'}}>IZREAL</h1>
      <input 
        type="text" 
        value={url} 
        onChange={handleUrlChange} 
        placeholder="YouTube 영상 URL을 입력해주세요." 
      />
      <button onClick={handlePrediction} disabled={loading}>
        {loading ? '로딩 중...' : '딥페이크 여부 예측'}
      </button>

      {embedUrl && videoId && (
        <iframe 
          width="100%" 
          height="315" 
          src={`https://www.youtube.com/embed/${videoId}`} 
          title="YouTube video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      )}

      {prediction && <p>{prediction}</p>}

      {realScore !== null && fakeScore !== null && (
        <div>
          <Pie data={chartData} />
          <p>👍 진짜 영상 점수 : {realScore.toFixed(3)}</p>
          <p>👎 가짜 영상 점수 : {fakeScore.toFixed(3)}</p>
        </div>
      )}

      {resultText && (
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h3 className="text-lg font-bold">📋 Prediction Result</h3>
          <pre className="whitespace-pre-wrap text-sm font-mono">{resultText}</pre>
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
