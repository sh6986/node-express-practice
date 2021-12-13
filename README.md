# node-express-practice

##제너레이터 사용해서 express 프로젝트 만들기

###generator 설치
```java
npm install express-generator -g
```

###express 프로젝트 생성
```java
express myapp
```

###해당 프로젝트로 이동해서 필요한 모듈 설치
```java
cd myapp
npm install
```
package-lock.json 파일과 mode_modules 폴더가 생성된다.

###서버 실행하기
```java
npm start
```


---


++ 제너레이터를 사용하면 package.json 부터 모든 파일을 자동으로 만들어주기 때문에 npm init 명령어를 사용하지 않아도 된다.

(npm init 명령어를 사용하면 package.json 파일을 만든다.)

제너레이터를 사용하지 않으면 express 모듈은 따로 설치해주어야 한다.
```java
npm install express --save
```

---
##express 구조
###bin/www
http 모듈에 express 모듈을 연결하고 포트를 지정할 수 있다. 
서버를 실행하는 스크립트이다.

###public
각종 리소스들을 모아 놓은 폴더로 외부(브라우저 등의 클라이언트)에서 접근 가능한 파일들을 모아 둔 디렉토리이다.

###routes
라우터들을 관리하는 곳으로 서버의 로직은 모두 routers 폴더 안의 파일에 작성한다.
index.js를 기반으로 라우팅 관리를 해주면 된다. routes 디렉토리 안에 각각 폴더나 파일을 만들어 관리한다. 다만 index.js가 루트가 되게 한다.

###views
view파일들을 관리하는 곳으로 웹서버로 사용 시 이 디렉토리에 있는 파일들을 사용해서 렌더링 시킨다.

###app.js
핵심적인 서버의 역할을 하며 미들웨어 관리르 하는 곳이다.

###pakage.json
프로젝트의 이름, 버전, 의존 패키지 리스트 등의 정보를 담고 있는 파일이다.
npm start 명령어를 통해 실행하면 scripts 속성의 start 속성값에 있는 www(서버 구동시키는 스크립트)를 실행한다.