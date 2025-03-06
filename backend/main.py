from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils import download_youtube_video
from model import predict_video, SessionLocal, VideoVote
from newmodel import predict_and_print_results
from urllib.parse import urlparse, parse_qs
from sqlalchemy.orm import Session

app = FastAPI()

# DB 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS 미들웨어 설정 (필수)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 루트 경로
@app.get("/")
async def root():
    return {"message": "Welcome to the Deepfake Detection API!"}

# YouTube ID 추출
from urllib.parse import urlparse, parse_qs

def getYouTubeVideoId(url):
    try:
        parsed_url = urlparse(url)
        if parsed_url.hostname == "youtu.be":
            return parsed_url.path[1:]
        elif "/shorts/" in parsed_url.path:
            return parsed_url.path.split("/shorts/")[1]
        elif parsed_url.hostname in ["www.youtube.com", "youtube.com"]:
            return parse_qs(parsed_url.query).get("v", [None])[0]
        return None
    except Exception:
        return None

# 딥페이크 예측 엔드포인트 (Adaptive Learning + 기존모델)
@app.post("/predict/")
async def predict_video_endpoint(payload: dict):
    url = payload.get("url")
    video_id = getYouTubeVideoId(url)

    try:
        # 유튜브 영상 다운로드
        video_path = download_youtube_video(url)
        
        # Adaptive Learning 예측
        print(f"🔍 Adaptive Learning 분석 시작: {video_path}")
        adaptive_result = predict_and_print_results(video_id, video_path)
    
        # 기존 모델 예측
        print(f"🔍 기존 AI 분석 시작: {video_path}")
        basic_result = predict_video(video_path)
        
        # 프론트엔드에서 추가 출력을 위한 모든 데이터 포함! 🔥
        response_json = {
            "message": basic_result["message"],                         # 기존 모델 메시지
            "real_score": round(basic_result["real_score"], 4),         # 기존 모델 REAL 점수
            "fake_score": round(basic_result["fake_score"], 4),         # 기존 모델 FAKE 점수
            "result_text": adaptive_result["result_text"],              # Adaptive Learning 결과 메시지
            # 🔥 추가로 필요한 정보 (이미지 속 출력용!)
            "ai_score_real": round(adaptive_result["ai_score_real"], 6),
            "weighted_score_real": round(adaptive_result["weighted_score_real"], 6),
            "final_prediction": adaptive_result["final_prediction"]
        }

        return JSONResponse(content=response_json)
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return JSONResponse(content={"error": str(e)}, status_code=500)


# 간단한 메시지 생성 함수 추가 (가독성!)
def basic_message(score):
    if score >= 0.5:
        return "✅ 이 영상은 REAL입니다!"
    else:
        return "🚨 이 영상은 FAKE입니다!"

# 투표 API (기존대로 유지, 문제없음)
class VoteRequest(BaseModel):
    video_id: str
    user_id: str
    vote: bool

@app.post("/vote/")
async def vote(request: VoteRequest, db: Session = Depends(get_db)):
    if not request.video_id or not request.user_id:
        return JSONResponse(content={"error": "Missing video_id or user_id"}, status_code=400)

    new_vote = VideoVote(video_id=request.video_id, user_id=request.user_id, vote=request.vote)
    db.add(new_vote)
    db.commit()

    return JSONResponse(content={"message": f"투표 완료: {'딥페이크' if request.vote else '진짜'}로 선택됨"})
