# mysql 에 따른 backend code 수정 사항

1. model.py 에서 DB MySQL 연결에 있어 아래와 같이 본인 password 입력
   DATABASE_URL = "mysql+pymysql://root:your_password@localhost/video_db"
   
3. newmodel.py 에서 MySQL Connection Function에서 password 본인 것으로 바꾸기
