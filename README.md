# 레이서 포트폴리오 서비스

이 프로젝트는 자기자신의 포트폴리오를 작성하고, 또한 다른 사람의 포트폴리오를 확인할 수 있는 웹 서비스입니다. \
웹 구현 예시: http://34.64.140.205/

> 위 IP 주소는 프로젝트 진행 기간에만 유효합니다.

**5개 MVP**로 구성됩니다.

README.md
- User (회원가입, 로그인 등 사용자 관련)
- Award (포트폴리오 중 상장 이력 관련)
- Certificate (포트폴리오 중 자격증 관련)
- Project (포트폴리오 중 프로젝트 관련)
- Education (포트폴리오 중 교육, 학교 관련)

## 2주차 기능 구현

### 기능 추가
- 유저 MVP가 아닌 다른 MVP에서 "사진 업로드" 기능 추가
- 모든 MVP에 “업로드된 사진 미리보기” 기능 추가
- 회원가입 탈퇴

### 기능 개선
- "삭제" 기능 추가
- 유저 MVP에서 "사진 업로드" 기능 추가
- "이메일 중복 방지" 기능 추가
- 웹 화면 구성 UI (색상 등) 고도화


## 주요 사용 기술

1. 프론트엔드

- React (create-react-app으로 구현되었습니다.)
- React Bootstrap
- axios

2. 백엔드

- Express (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose

## 설치 방법

1. 프론트 엔드 서버 실행

```bash
cd front
yarn
yarn start
```

2. 백엔드 서버 실행

```bash
back 폴더 내부 README 참고
```

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.
