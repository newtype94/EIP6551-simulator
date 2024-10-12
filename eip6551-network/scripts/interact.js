const { ethers } = require("hardhat");
const gameCharacterArtifact = require("../artifacts/contracts/TokenBoundAccount.sol/GameCharacter.json");
const gameItemArtifact = require("../artifacts/contracts/TokenBoundAccount.sol/GameItem.json");

async function main() {
  // 하드코딩된 배포된 계약 주소
  const gameCharacterAddress = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";
  const gameItemAddress = "0xB581C9264f59BF0289fA76D61B2D0746dCE3C30D";

  // 계약 ABI (간단한 예제로 필요한 함수만 포함)
  const gameCharacterABI = gameCharacterArtifact.abi;
  const gameItemABI = gameItemArtifact.abi;

  // 지갑 및 제공자 설정
  const [deployer] = await ethers.getSigners();

  // GameCharacter 계약 인스턴스 생성
  const gameCharacter = new ethers.Contract(
    gameCharacterAddress,
    gameCharacterABI,
    deployer
  );

  // GameItem 계약 인스턴스 생성
  const gameItem = new ethers.Contract(gameItemAddress, gameItemABI, deployer);

  // 캐릭터 발행
  console.log("Minting a new character...");
  const mintTx = await gameCharacter.mintCharacter(deployer.address);
  await mintTx.wait(); // 트랜잭션 완료 대기
  console.log("Character minted!");

  // 캐릭터 소유자 확인
  try {
    const owner = await gameCharacter.ownerOf(0);
    console.log("Owner of character 0:", owner);
  } catch (error) {
    console.error("Error fetching owner:", error);
  }

  // 아이템 발행
  console.log("Minting an item to user...");
  const mintItemTx = await gameItem.mintItemToUser(deployer.address, 1, 10);
  await mintItemTx.wait(); // 트랜잭션 완료 대기
  console.log("Item minted!");

  // 아이템 잔액 확인
  const balance = await gameItem.balanceOf(deployer.address, 1);
  console.log("Balance of item 1:", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
