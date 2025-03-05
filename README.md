# 딥페이크 탐지 웹사이트 'IZREAL'

[재단법인 미래와 소프트웨어와 함께하는 제5회 아이디어 공모전](https://edu.ggumeasy.com/?pn=product.view&pcode=Z7109-W6080-V3918) 에 **DeepFake** 주제로 참여함.

![IZREAL_logo](https://github.com/user-attachments/assets/bb2834a3-f5ba-4f65-9fe8-618f4c921767)

---

<br>

## **💡 기획 의도**
### 선정 배경 및 이유
- 딥페이크 기술의 발전으로 인한 대량의 허위 정보와 조작된 콘텐츠가 사회적 혼란, 정치적 선동, 경제적 피해를 야기함.
- 숏폼 콘텐츠의 대중화로 허위 정보가 담긴 영상이 널리 퍼질 위험이 존재함.
- 딥페이크 기술과 관련 범죄에 대한 법적 정의의 부재로 범죄 예방 및 피해 구제에 한계가 있음.
- 기존 딥페이크 탐지 기술은 비얼굴 영역이나 새로운 유형의 딥페이크에 대한 탐지가 어려움.

### 목적
- **빠르게 확산되는 숏폼 콘텐츠의 허위 정보 확산을 방지하기 위해 숏폼 콘텐츠의 딥페이크 합성 여부를 실시간으로 판단하는 웹 사이트를 개발**하는 것. 
- 본 프로젝트의 아이디어는 **얼굴 이외의 영역에서도 효과적으로 AI 생성 콘텐츠를 탐지할 수 있는 새로운 기법을 탐색하고, 신뢰할 수 있는 딥페이크 탐지 시스템을 구축하는 데 초점**을 맞춤.

<br>

## **🪄주요 기능**
1. 유튜브 쇼츠 영상의 링크를 입력하면 해당 영상을 확인 및 시청할 수 있다.
2. 영상을 자동으로 다운로드하여 딥페이크 탐지 모델을 통한 분석을 수행한다.
3. 모델이 판단한 딥페이크 여부 결과와 점수를 시각화를 통해 확인할 수 있다.
4. 더욱 정확한 시스템을 위해 사용자가 판단하는 딥페이크 여부에 대한 투표 기능이 존재한다.
5. 사용자 투표를 반영한 점수를 확인할 수 있다.

<br>

## **🖥️ 구현 화면**
<img width="1440" alt="스크린샷 2025-03-05 오후 10 45 32" src="https://github.com/user-attachments/assets/bf968b4f-4be4-4388-84d6-19dc4be0aa3e" />
<img width="1440" alt="스크린샷 2025-03-05 오후 10 45 50" src="https://github.com/user-attachments/assets/1aba0f19-ad9c-46d4-a5b7-c32760b3cca6" />
<img width="1440" alt="스크린샷 2025-03-05 오후 10 46 05" src="https://github.com/user-attachments/assets/0ce0e166-70c7-4695-91aa-468c15a266ea" />
<img width="1440" alt="스크린샷 2025-03-05 오후 10 46 23" src="https://github.com/user-attachments/assets/8928a2df-a582-4f5c-852a-b4bf097ff7d4" />
<img width="1440" alt="스크린샷 2025-03-05 오후 10 46 38" src="https://github.com/user-attachments/assets/3f892554-4929-44e5-9b07-8d84fafe906b" />


<br>
<br>

## **💝 기대 효과**
1. 링크 복사, 붙여넣기, 클릭 만으로 숏폼 콘텐츠의 딥페이크 여부를 빠르게 확인할 수 있어 허위 정보 확산을 막아 사회적 혼란을 예방할 수 있다.
2. 영상 내의 얼굴 유무에 따라 분석을 달리하여 더 정확한 분석이 가능하다.
3. 실제 사용자의 투표 결과를 반영한 Adaptive Learning 방식을 사용하여 모델의 성능을 개선시킬 수 있다.
4. 사용자의 지속적인 피드백을 통해 모델의 신뢰도를 향상시킬 수 있다.
5. 분석 결과를 제시하여 사용자가 결과를 활용하고 신뢰할 수 있도록 한다.

<br>

## **🛠️ 기술 스택**
- **Frontend**
  * React-native
- **Backend**
  * 웹 프레임워크 : FastAPI
  * 데이터베이스 : MySQL
  * 언어 : Python
- **딥페이크 탐지**
  * 얼굴 감지 : MTCNN (https://github.com/ipazc/mtcnn)
  * 영상 내에 얼굴이 있는 경우 : EfficientNet 
  * 영상 내에 얼굴이 없는 경우 : Optical Flow + Edge Map
- **유튜브 영상 다운로드**
  * Pytubefix (https://github.com/JuanBindez/pytubefix)





<br>
<br>


## **💻 실습 환경 구성**

Backend, Frontend, MySQL (DB) 환경 설정을 위한 설명. 

### 1. 프로젝트 클론
```
git clone https://github.com/llishyun/deepfake_IZREAL.git
```

### 2. Backend 환경 설정
가상 환경 생성 및 활성화
```
cd deepfake_IZREAL
python -m venv testvenv
venv\Scripts\activate  # Windows
source testvenv/bin/activate  # macOS/Linux
```
FastAPI 실행
```
cd backend
uvicorn main:app --reload
```

### 3. MySQL (DB) 환경 설정
MySQL 접속 (로컬에 MySQL이 설치되어 있어야 합니다.)
```
mysql -u root -p
```
비밀번호 입력 후 DB 생성
```
CREATE DATABASE video_db;
USE video_db;
```
DATABASE changed 메시지가 출력되면 정상적으로 적용된 것입니다.

### 4. Frontend 환경 설정
Node.js 설치 확인 후 패키지 설치
```
cd frontend
npm install axios @mui/material @mui/icons-material react-router-dom react-chartjs-2 chart.js
```
Frontend 실행
```
npm start
```

### 5. FastAPI 동작 확인
FastAPI가 정상적으로 실행되는지 확인하기 위해 다음 명령어를 실행합니다.
```
curl -X POST "http://127.0.0.1:8000/predict/" -H "Content-Type: application/json" -d "{\"url\": \"유튜브 쇼츠 링크 입력\"}"
```
JSON 형식으로 응답이 오면 정상적으로 동작하는 것입니다.
<br>

### MySQL(DB) 환경 설정
1. 로컬에 MySQL 이 설치되어 있어야 함.
2. 새 cmd open
3. mysql -u root -p 입력 후 엔터 => Enter password : 에 본인의 MySQL 비밀번호 입력
4. video_db 이름의 DB 만들기 -> CREATE DATABASE video_db { 어쩌구 } 스크린 캡쳐해서 붙이기 
5. USE video_db; 입력하고 cmd 에 DATABASE changed 출력 확인
   
![Image](https://github.com/user-attachments/assets/699e62b2-136b-469e-9780-fe9157b7f513)
<br>

### frontend 환경 설정
1. 로컬에 node.js 가 설치되어 있어야 함. 
2. 새 cmd open
3. 프로젝트 폴더의 frontend 폴더로 이동 (cd frontend 입력)
4. cmd에 npm install axios @mui/material @mui/icons-material react-router-dom react-chartjs-2 chart.js 입력하여 설치
5. npm start 입력후 localhost:3000 부분 Ctrl+click 으로 접속

<br><br>

## FastAPI 확인 
cmd 에 curl -X POST "http://127.0.0.1:8000/predict/" -H "Content-Type: application/json" -d "{\"url\": \"유튜브 쇼츠 링크 입력 란"}"

--> json 파일 형식으로 출력되면 잘 동작하는 것!
