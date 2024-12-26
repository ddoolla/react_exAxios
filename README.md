# Axois API

[참조] [Axios Docs](https://axios-http.com/kr/docs/intro)

> ## Axois 란?

- 브라우저와 node.js 에서 사용할 수 있는 Promise 기반 HTTP 클라이언트 라이브러리

### \* 특징

- 브라우저에서 사용시 XMLHttpRequests 생성 (클라이언트 사이드)
- node.js 에서 사용시 http 요청 생성 (서버 사이드, 외부 통신)
- Promise API 지원 (비동기 작업)
- 요청 및 응답 인터셉트 (요청, 응답이 처리되기 전에 필요한 작업 가능)
- 요청 및 응답 데이터 변환
- 요청 취소
- JSON 데이터 자동 변환
- XSRF 를 막기위한 클라이언트 사이드 지원

<br/>

---

> ## 설치

```
> npm install axios
```

<br/>

### \* vite.config - proxy 서버 설정

#### ※ 서버에서 CORS 설정 했으면 설정 안해도 됨

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  /* 프록시 서버 설정 */
  server: {
    proxy: {
      "/api": { // '/api' 로 시작하는 모든 경로
        target: "http://localhost:8080", // API 서버 주소
        changeOrigin: true, // Origin 헤더 변경
        secure: false, // https: true, http: false
      },
    },
  },
});
```

<br/>

---

> ## 요청 방법

### \* axios(config)

```
// GET 요청
axios({
    method: 'get',
    url: '/api/users',
    responseType: 'json' // default
})
.then(function (response) {
    console.log(response.data);
});

// POST 요청
axios({
    method: 'post',
    url: '/api/users'
    data: {
        nickName: '',
        password: '',
        name: '',
        gender: '',
        hobby: ''
    }
});
```

<br/>

---

> ## 요청 Config

```
{
    url: '/users',

    method: 'get', // default

    // url이 절대값이 아닌 경우 url 앞에 붙음
    baseURL: 'http://localhost:8080/api'

    // 요청 데이터를 서버로 전송하기 직전에 변경 작업 가능
    // POST, PUT, PATCH, DELETE 메서드만 적용
    // 반환 값은 Buffer, ArrayBuffer, FormData, Stream 인스턴스, 문자열만 가능
    // 헤더더 객체 수정 가능
    transformRequest: [function (data, headers) {
        // 데이터 변환 작업

        return data;
    }],

    // 응답 데이터가 then | catch 로 전달되기 전 변경 가능
    transformResponse: [function (data) {
        // 데이터 변환 작업

        return data;
    }],

    // 사용자 지정 헤더 추가
    headers: { Authorization: token },

    // url 파라미터 (일반 객체 | URLSearchParams)
    params: { id: 1 },

    // params 의 직렬화 옵션 (qs(queryString) 라이브러리 사용)
    paramsSerializer: function (params) {
        return Qs.stringfy(params, {arrayFormat: 'brackets'});
    },

    // 요청 바디 전송 데이터
    // POST, PUT, PATCH, DELETE 메서드만 적용
    // transformRequest 가 설정되지 않은 경우 다음 타입 중 하나여야 함
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 브라우저 전용: FormData, File, Blob
    // - Node 전용: Stream, Buffer
    data: {
        name: 'Lee'
    },

    // 응답 데이터 타입
    // 옵션: arraybuffer, document, json, text, stream
    // 브라우저 전용: blob
    responseType: 'json', // default

    ...
}
```

#### [※ AXIOS - 요청 Config](https://axios-http.com/kr/docs/req_config)

<br/>

---

> ## 응답 스키마

```
{
    // 서버 응답 데이터
    data: { ... },

    // HTTP 상태 코드
    status: 200,

    // HTTP 헤더
    // 모든 헤더 이름 소문자, []로 접근 가능
    // ex) response.headers['content-type']
    headers: { ... },

    // 요청에 사용된 설정 정보
    config: { ... },

    // 생성된 요청 정보
    // node.js - ClientRequest 인스턴스
    // 브라우저 - XMLHttpRequest
    request: { ... }
}
```

<br/>

---

> ## Config 기본 값 설정
