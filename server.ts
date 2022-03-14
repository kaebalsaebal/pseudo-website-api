import express from "express";
import axios from "axios";
import cors from "cors";
import { getMessaging } from "firebase-admin/messaging";
import { app } from "./firebase_init";

const node = express();

node.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/tosso.html");
});

node.get("/tosso", (request, response) => {
  response.send({ message: "tosso" });
});

// 8080 포트를 사용한다는 뜻
node.listen("8080", () => {
  console.log(`8080 포트에서 실행중...`);
});

// express.json()이라는 JSON 파싱 미들웨어(기능)을 사용한다는 것
// 요청은 JSON 형태로 오기 때문에 사용
node.use(express.json());

// 한 컴퓨터에서 서버를 두개켜므로 cors 사용
node.use(cors());

// /fcm 주소로 들어오는 post 요청을 처리한다는 뜻
node.post("/fcm", async (request, response) => {
  // 요청의 body 부분을 빼오기
  const data = request.body;
  // 이렇게 body에서 토큰과 메세지 빼기
  // express.json()을 사용하였으므로 점 하나로 간단하게 처리
  const token = data.token;
  const message = data.message;
  // fcm 서버로 요청
  const datum = {
    data: {
      title: "Tosso",
      body: `${message}`,
    },
    token: `${token}`,
  };
  const messaging = getMessaging(app);
  messaging
    .send(datum)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  /*
  axios({
    url: "https://fcm.googleapis.com/fcm/send",
    method: "POST",
    headers: {
      "Content-Type": "nodelication/json",
      Authorization: `key=${serkey}`,
    },
    data: {
      to: `${token}`,
      notification: {
        title: "Tosso",
        body: `${message}`,
      },
    },
  });
  */
  // response는 필요 없으므로 사용x
});
