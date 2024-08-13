let attempts = 0; //몇번시도했는가
let index = 0;
let timer;

function appStart() {
  const displaygameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displaygameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameOver();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = async () => {
    let 맞은_갯수 = 0;

    // 서버에서 정답을 받아오는 코드
    const 응답 = await fetch("/answer");
    const 정답 = await 응답.json();

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameOver();
    else nextLine();
  };
  // 인덱스가 5이면 아무것도 안하고 리턴한다.? (함수 밖으로 나오다는 뜻이래요)
  // 그럼 5이면 리턴이 되서 값은 반환 하고 나가버린다 그래서 밑에 함수들이 실행이 안된다. 주석느낌

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    // if문 쓸때 중괄호를 빼도 상관없다.
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index = index + 1;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐리고있는_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐리고있는_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐리고있는_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();

// index = index + 1;
// index = index += 1;
// index ++ ;
// 모두 같은 표현이다
