import os
from pytubefix import YouTube

# ✅ 유튜브 영상 다운로드 함수 (예외처리 강화)
def download_youtube_video(url, save_path="downloads"):
    """유튜브 쇼츠 또는 일반 영상을 다운로드하는 함수"""
    os.makedirs(save_path, exist_ok=True)
    
    try:
        yt = YouTube(url)
        video_title = yt.title.replace(" ", "_")

        # ✅ 720p 화질 선택 (없으면 가장 높은 화질)
        stream = yt.streams.filter(file_extension="mp4", res="720p").first()
        if stream is None:
            stream = yt.streams.get_highest_resolution()

        # ✅ 파일 저장 경로 설정
        save_file = os.path.join(save_path, f"{video_title}.mp4")
        
        # ✅ 다운로드 실행
        stream.download(output_path=save_path, filename=f"{video_title}.mp4")
        print(f"✅ 다운로드 완료: {save_file}")
        return save_file
    
    except Exception as e:
        print(f"🚨 영상 다운로드 실패: {e}")
        raise ValueError("영상 다운로드 실패")
