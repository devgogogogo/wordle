function appStart() {
  const handlekeydown = (event) => {
    console.log("키가 눌렸습니다 event=>", event);
  };
  window.addEventListener("keydown", handlekeydown);
}

appStart();
