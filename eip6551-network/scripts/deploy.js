const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  // 개인 키를 하드코딩하여 지갑 객체 생성
  const privateKey =
    "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
  const wallet = new ethers.Wallet(privateKey, hre.ethers.provider);

  console.log("Deploying contracts with the account:", wallet.address);

  // 배포자 잔액 확인
  const balance = await wallet.getBalance();
  console.log("Account balance:", balance.toString());

  // 계약 팩토리 로딩
  const GameCharacter = await hre.ethers.getContractFactory(
    "GameCharacter",
    wallet
  );

  // 계약 배포
  const gameCharacter = await GameCharacter.deploy();

  // 배포 완료 확인
  await gameCharacter.deployed();

  console.log("GameCharacter deployed to:", gameCharacter.address);

  // 계약 팩토리 로딩
  const GameItem = await hre.ethers.getContractFactory("GameItem", wallet);

  // 계약 배포
  const gameItem = await GameItem.deploy();

  // 배포 완료 확인
  await gameItem.deployed();

  console.log("GameItem deployed to:", gameItem.address);
}

// main 함수를 실행하고 오류를 처리합니다.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
