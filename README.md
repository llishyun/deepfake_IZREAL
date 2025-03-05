# 딥페이크 탐지 웹사이트 'IZREAL'

재단법인 미래와 소프트웨어와 함께하는 제5회 아이디어 공모전

---

## **💡 기획 의도**
딥페이크 기술이 급격하게 고도화되면서 대량의 허위 정보와 조작된 콘텐츠 빠르게 확산되고 있으며, 이는 사회적 혼란을 야기하고 정치적 선동 및 경제적 피해를 발생시킨다. 특히, 숏폼 콘텐츠가 대중화되면서 딥페이크 기술의 영향력이 더욱 커지고 있다. 숏폼 콘텐츠는 정보의 진위 여부를 즉각적으로 검증하기 어려워 허위 정보가 담긴 영상이 널리 퍼질 위험성이 있다. 현재 딥페이크 관련 법률은 기술 발전 속도를 따라가지 못하고 있으며, 불법으로 규정하는 기준이 모호하다. 이로 인해, AI 생성 콘텐츠를 악용한 범죄를 예방하거나 피해를 구제하는 데 한계가 있으며, 신뢰할 수 있는 기술적 대응이 필수적인 상황이다. 또한, 기존의 얼굴 인식 기반 딥페이크 탐지 기술은 비얼굴 영역이나 새로운 유형의 딥페이크에 대해 탐지가 어려운 한계가 존재한다.


➡️ 따라서, ‘IZREAL’의 목적은 **빠르게 확산되는 숏폼 콘텐츠의 허위 정보 확산을 방지하기 위해 숏폼 콘텐츠의 딥페이크 합성 여부를 실시간으로 판단하는 웹 사이트를 개발**하는 것이다. 
본 프로젝트의 아이디어는 *얼굴 이외의 영역에서도 효과적으로 AI 생성 콘텐츠를 탐지할 수 있는 새로운 기법을 탐색하고, 신뢰할 수 있는 딥페이크 탐지 시스템을 구축하는 데 초점*을 맞춘다. 


첨부할 이미지
  1. 구현 페이지 (시작 페이지, 클릭한 후 투표페이지, 수치 바뀐 마지막 페이지 첨부 - 보고서에도 작성)

리드미 작성 방식 
  로컬 가상환경 설정 방식
  backend, frontend 설정 방식


## Model




## 실습 환경 구성

backend, frontend, MySQL (DB) 환경 설정을 위한 설명. 

### backend 환경 설정
1. 새 cmd open 
2. 프로젝트 폴더에 가상환경 만들고 activate  :
     python -m venv testvenv => venv\Scripts\activate
4. cd backend 로 backend 페이지로 이동한 후 FastAPI 실행을 위한 uvicorn main:app --reload 입력


### MySQL(DB) 환경 설정
1. 로컬에 MySQL 이 설치되어 있어야 함.
2. 새 cmd open
3. mysql -u root -p 입력 후 엔터 => Enter password : 에 본인의 MySQL 비밀번호 입력
4. video_db 이름의 DB 만들기 -> CREATE DATABASE video_db { 어쩌구 } 스크린 캡쳐해서 붙이기 
5. USE video_db; 입력하고 cmd 에 DATABASE changed 출력 확인
   


### frontend 환경설정
1. 로컬에 node.js 가 설치되어 있어야 함. 
2. 새 cmd open
3. 프로젝트 폴더의 frontend 폴더로 이동 (cd frontend 입력)
4. cmd에 npm install axios @mui/material @mui/icons-material react-router-dom react-chartjs-2 chart.js 입력하여 설치
5. npm start 입력후 localhost:3000 부분 Ctrl+click 으로 접속
