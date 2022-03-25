import axios from "axios";

const backendPortNumber = "5001";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function get(endpoint, params = "") {
  console.log(
    `%cGET 요청 ${serverUrl + endpoint + "/" + params}`,
    "color: #a25cd1;"
  );

  return axios.get(serverUrl + endpoint + "/" + params, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function post(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function put(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = "") {
  console.log(`DELETE 요청 ${serverUrl + endpoint + "/" + params}`);
  return axios.delete(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}


// -------- 프론트엔드 파일 업로드용 formData API ------- 

async function filePost(endpoint, data) {
  
  // bodyData는 formData 객체 형태
  const bodyData = data;
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  // 파일 업로드는 JSON이 불가능하여, 모든 데이터를 formData로 전달
  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// 기존 데이터를 유지하면서 파일만 저장해야 하기 때문에 PATCH 사용
async function patch(endpoint, data) {
  
  // bodyData는 formData 객체 형태
  const bodyData = data;
  console.log(`%cPATCH 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPATCH 요청 데이터: ${bodyData}`, "color: #296aba;");

  // 파일 업로드는 JSON이 불가능하여, 모든 데이터를 formData로 전달
  return axios.patch(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}
// -----------------------------------------




// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, put, del as delete, filePost, patch }; // --------- formPost, patch 추가
