# Axois API

> ## Axois 란?

- 브라우저와 node.js 에서 사용할 수 있는 Promise 기반 HTTP 클라이언트 라이브러리

### \* 특징

- 브라우저에서 사용시 XMLHttpRequests 생성 (클라이언트 사이드)
- node.js 에서 사용시 http 요청 생성 (서버 사이드, 외부 통신)
- Promise API 지원 (비동기 작업)
- 요청 및 응답 인터셉트 (요청, 응답이 처리되기 전에 필요한 작업 가능)
- 요청 및 응답 데이터 변환
- 요청 취소 및 타임 아웃
- 데이터 자동 변환 (JSON, multipart/form-data 등)
- 응답 시 자동 JSON 데이터 처리
- XSRF 를 막기위한 클라이언트 사이드 지원 등등

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

### \* 요청 메서드 명령어

- 명령어 메서드 사용시 'url', 'method', 'data' 속성을 config에서 지정할 필요 X

```
axios.request(config)
axios.get(url[, confug])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
axios.delete(url[, config])

// 서버로부터 응답 헤더만 가져옴 (본문 포함 X)
axios.head(url[, config])

// 서버에서 지원하는 HTTP 메서드 확인 등
axios.options(url[, config])

-------------------------------------------------------------------------------------
ex)
    // GET
    axios.get('/api/users').then( ... );

    // POST
    let newUser = { ... };
    axios.post('/api/users', newUser);
```

<br/>

---

> ## Axios 인스턴스 생성

```
const instance = axios.create({
    baseURL: 'http://api.example.com/api',
    timeout: 1000,
    ...
});

instance.get('/users', {
    headers: { ... } // 인스턴스 config 와 결합
});
```

#### [※ 인스턴스 메서드](https://axios-http.com/docs/instance)

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

    // 요청이 설정된 timeout 보다 오래걸리면 요청 중단
    timeout: 0, // default

    // 응답 데이터 타입
    // 옵션: arraybuffer, document, json, text, stream
    // 브라우저 전용: blob
    responseType: 'json', // default

    ...
}
```

#### [※ 추가로 필요한 설정은 찾아보기 : AXIOS - 요청 Config](https://axios-http.com/docs/req_config)

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

### \* 모든 요청에 적용

```
axios.defaults.baseURL = 'http://api.example.com';

// 모든 HTTP 메서드 공통 적용
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// POST 메서드만 적용
axios.defaults..headers.post['Content-type'] = 'application/x-www-form-urlencoded';
```

<br/>

### \* 커스텀 인스턴스 기본 값 설정

```
const instance = axios.create({
    baseURL: 'https://api.example.com' // 요청 config
});

instance.defaults.headers.comon['Authorization'] = AUTH_TOKEN;
```

<br/>

### \* Config 우선 순위

### axios.defaults < instance.defaults < 요청 config

<br/>

---

> ## 인터셉터

- 요청과 응답이 처리되기 전에 가로채어 작업 수행

```
// 요청 인터셉터 추가
axios.intercepters.request.use(function (config) {
    // 요청이 전달도기 전에 작업 수행
    ...
    return config;
}, function (error) {
    // 요청 오류가 있는 작업 수행
    ...
    return Promise.reject(error);
});

// 응답 인터셉터 추가가
axios.intercepters.response.use(function (response) {
    // 응답 데이터가 있는 작업 수행 (상태 코드: 2xx)
    ...
    return response;
}, function (error) {
    // 응답 오류가 있는 작업 수행 (상태 코드: 2xx 외)
    ...
    return Promise.reject(error);
});

// 인터셉터 제거
const myInterceptor = axios.intercepters.request.use(function () { ... });
axios.intercepters.request.eject(myInterceptor);
```

#### ※ axios 인스턴스도 위와 같이 추가 및 제거 가능

<br/>

---

> ## 에러 핸들링

```
axios.get('/users')
    .catch(function (error) {
        if (error.response) {
            // 요청이 전송되었는데 2xx 외의 상태코드 응답
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

        } else if (error.request) {
            // 요청은 전송되었는데 응답 수신 X
            console.log(error.request);

        } else {
            // 요청 전송 X (요청 설정 문제)
            console.log(error.message);
        }
        console.log(error.config);

        // HTTP 에러에 대한 더 많은 정보를 객체 형식으로 가져옴
        console.log(error.toJSON);
    });
```

<br/>

---

> ## 요청 취소

### \* timeout

- axios 호출시 timeout 속성을 설정하면 시간 내에 응답을 받지 못하면 요청 중단 처리

<br/>

### \* signal (AbortController)

- axios 호출은 경우에 따라 연결을 일찍 취소하여 불필요한 대기를 방지할 수 있다.  
  예를 들어 네트워크가 연결이 불가능해졌을 때 취소하지 않으면 axios 호출이 부모 코드나 스택에서 타임아웃될 때까지 대기 상태로 유지될 수 있다.

```
// 방법 1. AbortController.abort() 호출
const controller = new AbortController();

axios.get('/users', {
    signal: controller.signal;
}).then(function (response) {
    ...
});

controller.abort(); // 요청 취소

// 방법 2. AbortSignal.timeout() [nodejs 17.3+]
axios.get('/users', {
    signal: AbortSignal.timeout(5000); // 5초 뒤 요청 취소
}).then(function (response) {
    ...
});

// 방법 3. 도우미 함수 정의
function newAbortSignal(timeoutMs) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeoutMs || 0);

    return abortController.signal;
}

axios.get('/users', {
    signal: newAbortSignal(5000);
}).then(function (response) {
    ...
});
```

#### ※ Axios 에서 제공하는 CancelToken 은 더 이상 사용되지 않음 (deprecated)

<br/>

---

> ## Multipart Bodies

### \* FormData API를 사용한 multipart/form-data 타입 데이터 포스팅

```
const form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Blob([1, 2, 3]));
form.append('my_file', fileInput.files[0]);

axios.post('http://example.com', form);

// 위와 같은 의미
axios.postForm('http://example.com', {
    my_field: 'my value',
    my_buffer: new Blob([1, 2, 3]),
    my_file: fileInput.files
});
```

<br/>

### \* FormData 객체 자동 직렬화

- v0.27.0 부터 요청의 Content-Type 헤더가 multipart/form-data 로 설정된 경우  
  요청 데이터를 FormData 객체로 자동 직렬화 지원

```
axios.post('http://example.com', {
    user: {
        name: 'Lee'
    },
    file: fs.createReadStream('image.jpg')
}, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}).then( ... );
```

#### \* { } - JSON.stringify 로 값을 직렬화

#### \* [ ] - 동일한 키를 가진 별도의 필드로 배열과 같은 객체를 풀어준다 (unwrap)

<br/>

### \* 자동 직렬화 예시

```
const obj = {
    x: 1,
    arr: [1, 2, 3],
    arr2: [1, [2], 3],
    users: [{name: 'Lee', gender: 'MALE'}, {name: 'Kim', gender: 'FEMALE'}],
    'obj2{}': [{x: 1}]
};

// Axios 직렬화기에 의해 내부적으로 실행
const formData = new FormData();
formData.append('x', 1);
formData.append('arr[]', '1');
formData.append('arr[]', '2');
formData.append('arr[]', '3');
formData.append('arr2[0]', '1');
formData.append('arr2[1][0]', '2');
formData.append('arr2[2]', '3');
formData.append('users[0][name]', 'Lee');
formData.append('users[0][gender]', 'MALE');
formData.append('users[1][name]', 'Kim');
formData.append('users[1][gender]', 'FEMALE');
formData.append('obj2{}', '[{"x": 1}]');
```

<br/>

### \* 단축 메서드 (postFrom, putForm, patchForm)

- content-type 헤더가 multipart/form-data 으로 미리 설정된 http 메서드

```
// FileList 객체를 직접 전달 가능
await axios.postForm(
    '/http:example.com/post',
    document.querySelector('#fileInput').files); // 모든 파일은 'files[]' 필드 이름으로 전송
```

<br/>

---

#### [참조] [Axios Docs](https://axios-http.com/docs/intro)
