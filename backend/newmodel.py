import torch
import numpy as np
import mysql.connector
import os
from math import log, exp
from model import predict_video  # ✅ model.py에서 AI 탐지 함수 가져옴

# ✅ GPU 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ✅ MySQL 연결 함수
def get_mysql_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='peaceOdri19810921',
            database='video_db'
        )
        return conn
    except mysql.connector.Error as e:
        print(f"❌ MySQL Connection Failed: {e}")
        exit(1)

# ✅ 사용자 투표 결과 가져오기
def get_user_votes(video_id):
    conn = get_mysql_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*), SUM(vote) FROM video_votes WHERE video_id = %s", (video_id,))
    user_count, real_count = cursor.fetchone()
    conn.close()

    if user_count == 0:
        return 0.5, 0  # 투표가 없으면 중립 값 반환

    p_u = float(real_count) / float(user_count)
    return p_u, float(user_count)

# ✅ 유동적 가중치 계산 (Adaptive Learning 적용)
def calculate_weighted_score(ai_score, p_u, user_count):
    ai_score = float(ai_score)
    p_u = float(p_u)
    user_count = float(user_count)

    # ✅ w1: AI 신뢰도 가중치 (Sigmoid 함수 적용)
    k = 10  # 조정 계수 (클수록 가중치 변화 급격함)
    w1 = 1 / (1 + exp(-k * (ai_score - 0.5)))

    # ✅ w2: 사용자 투표 가중치 (로그 함수 적용)
    w2 = log(user_count + 1)

    # ✅ 최종 가중합 적용
    weighted_score = (ai_score * w1 + p_u * w2) / (w1 + w2)
    return weighted_score

# ✅ 최종 결과 계산 함수
def predict_and_print_results(video_id, video_path):
    print("🔍 AI 예측 시작")
    ai_result = predict_video(video_path)  # model.py에서 가져온 AI 탐지 결과 사용
    ai_score = ai_result["real_score"]

    print("📊 사용자 투표 가져오는 중")
    p_u, user_count = get_user_votes(video_id)

    print("⚖ 가중치 적용 중")
    weighted_score = calculate_weighted_score(ai_score, p_u, user_count)

    # ✅ 최종 판별
    final_prediction = "REAL" if weighted_score >= 0.5 else "FAKE"

    result_text = f"\n--------------------------------------------------\n"
    result_text += f"🔍 AI Prediction Result\n"
    result_text += f"🔹 AI Score (Real): {ai_score:.6f}\n"
    result_text += f"🔹 Weighted Score (Real): {weighted_score:.6f}\n"
    result_text += f"✅ Final Prediction: {final_prediction}\n"
    result_text += "--------------------------------------------------\n"
    
    print(result_text)
    return {
        "video_id": video_id,
        "ai_score_real": ai_score,
        "weighted_score_real": weighted_score,
        "user_votes_considered": user_count if 0.3 <= ai_score <= 0.6 else None,
        "user_vote_ratio": p_u if 0.3 <= ai_score <= 0.6 else None,
        "final_prediction": final_prediction,
        "result_text": result_text
    }
