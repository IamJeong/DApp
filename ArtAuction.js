const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "auctions",
		"outputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "highestBidder",
				"type": "address"
			},
			{
				"name": "winner",
				"type": "address"
			},
			{
				"name": "currentPrice",
				"type": "uint256"
			},
			{
				"name": "deadline",
				"type": "uint256"
			},
			{
				"name": "ended",
				"type": "bool"
			},
			{
				"name": "status",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_artId",
				"type": "uint256"
			},
			{
				"name": "_addTime",
				"type": "uint256"
			}
		],
		"name": "addTime",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_artId",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_artId",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_startingPrice",
				"type": "uint256"
			},
			{
				"name": "_duration",
				"type": "uint256"
			},
			{
				"name": "_description",
				"type": "string"
			}
		],
		"name": "createArt",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "artIds",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_artId",
				"type": "uint256"
			}
		],
		"name": "endAuction",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "deadLine",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arts",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "startingPrice",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getArtIds",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_deadLine",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "artId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "startingPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "NewArt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "artId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	}
]

const ArtAuctionAbi = web3.eth.contract(abi);
const ArtAuctionInstance = ArtAuctionAbi.at("0x7f4b49776fcCA5e0fBA368Bca9eE5Ce041158291");

// var accounts = web3.eth.accounts;
// var getBalance = web3.eth.getBalance;
// var sendEther = web3.eth.sendTransaction;

let artIdsArray = [];

const createPiece = () => { //작품 등록

    let artOwner = $("#artOwner").val();
    let artId = $("#artId").val();
    let pieceName = $("#pieceName").val();
    let price = web3.toWei($("#price").val(), 'ether'); // 문자열을 Wei 단위로 변환
    let duration = parseInt($("#duration").val(), 10); // 문자열을 정수로 변환
    let description = $("#description").val();
    // let time = new Date(duration * 1000);

	// 입력 필드가 비어 있는지 확인
	if (!artOwner || !artId || !pieceName || !price || !duration || !description) {
		alert("빈칸을 채워주세요.");
		return; 
	}
    ArtAuctionInstance.createArt(artId, pieceName, price / 10**18 , duration, description, {from: artOwner}, (error, result) => {		
        if (!error && confirm("등록하시겠습니까?")) {
            alert("등록 완료");
			console.log("Success", result);

            artIdsArray.push(artId); // 등록된 작품 번호를 배열에 추가
            console.log(artIdsArray);
        } else {
			alert("취소를 누르셨습니다.");
			console.error("Error", error);
        }
    });

	//image 보내보기
	const form = document.getElementById("imageform");
	const formData = new FormData(form);

	fetch('http://127.0.0.1:5500/upload.php', {
		method: 'POST',
		body: formData
	})
	.then(response => response.text())
	.then(data => {
		console.log(data); // PHP 파일로부터의 응답을 처리
	})
	.catch(error => {
		console.error('오류 발생:', error);
	});

}



const art = () => { //작품 정보
    let number = $("#artNumber").val();

    ArtAuctionInstance.arts(number , (error, result) => {
        if(!error) {
            console.log("Success" , result); 
            displayArt(result);
        } else {
            console.error("Error" , error)
        }
    })
}

const displayArt = (art) => { // 버튼 누르면 보이게 화면에서 보이게 해주는 함수
	const artDisplay = document.getElementById('artDisplay');
    artDisplay.innerHTML = 
        `<h3>작품 정보</h3>

        <p><strong>이름:</strong> ${art[0]}</p>
        <p><strong>설명:</strong> ${art[1]}</p>
        <p><strong>시작 가격:</strong> ${(art[2])} Ether</p>`;
}

const Auction = () => { // 경매 정보
    let number = $("#auctionNumber").val(); // artId 검색

    ArtAuctionInstance.auctions(number, (error, result) => {
        if(!error) {
            console.log("Success", result)
            displayAuction(result)
        } else {
            console.log("Error", error)

        }
    })
}


const displayAuction = (auctions) => { // 버튼 누르면 정보 보이게 하는거
	const AuctionDisplay = document.getElementById("AuctionDisplay");
    AuctionDisplay.innerHTML = `
        <h3>미술품 경매 정보</h3>
        <p><strong>최고 입찰자:</strong> ${auctions[1]}</p>
        <p><strong>입찰 확정자:</strong> ${auctions[2]}</p>
        <p><strong>현재 가격:</strong> ${(auctions[3])/ 10**18} Ether</p>
        <p><strong>마감시간:</strong> ${new Date(auctions[4] * 1000).toLocaleString()}</p>
        <p><strong>상태:</strong> ${auctions[6]}</p>`;
		}
	// <p><strong>주인:</strong> ${auctions[0]}</p> // 등록한 사람의 지갑 주소
	// <p><strong>끝:</strong> ${auctions[5]}</p> 

const Buy = () => { // 구매 함수
    let buyer = $("#buyer").val();
    let amount = $("#amount").val();
    let etherAmount = web3.toWei(amount, "ether");
    let artId = $("#artId").val();

    ArtAuctionInstance.placeBid(artId, {from : buyer, value: etherAmount }, (error, result) => {
        if(!error && confirm("경매에 참여하십니까?")) {
			alert("경매 완료")
            console.log(result)
        } else {
			alert("취소하였습니다")
            console.error(error);
			failBuy(result);
        }
    })
}

const failBuy = (fail) => { // 구매 시간 초과되면 나오게 하는 함수
	const buyFail = document.getElementById("buyFail");
	buyFail.innerHTML = 
	`<h3>경매가 종료되었거나 잔액이 부족합니다</h3>`
}

const AuctionEnd = () => { // 작품 등록한 사람이 경매 종료하게 만드는 함수 
    let artId = $("#EndId").val();
    let owner = $("#owner").val();
    ArtAuctionInstance.endAuction(artId, {from: owner}, (error, result) => {
        if(!error) {
            console.log(result);
        } else {
            console.log(error);
        }
    })
}

const displayAllArt = () => { // 모든 작품 정보가 보이게 하는 함수
    ArtAuctionInstance.getArtIds((error, artIds) => {
        if (!error) {
            console.log("Art IDs: ", artIds);
            artIds.forEach( (artId) => {
                ArtAuctionInstance.arts(artId, (error, art) => {
                    if (!error) {
                        ArtAuctionInstance.auctions(artId, (error, auction) => {
                            if (!error) {
                                displayArtAndAuction(artId, art, auction);
                            }
                        });
                    }
                });
            });
        } else {
            console.error("Error", error);
        }
    });
}

const displayArtAndAuction = (artId, art, auction) => {
    const allArtDisplay = document.getElementById("allArtDisplay");
    const artAndAuctionHTML = `
        <div class = "art-container">
            <div class = "art-content">
                <div class = "art-details">
                    <h3>미술품 번호: ${artId}</h3>
                    <p><strong>작품 이름:</strong> <div>${art[0]}</div></p>
                    <p><strong>설명:</strong> <div>${art[1]}</div></p>
                    <p><strong>시작 가격:</strong> ${(art[2])} Ether</p>
                </div>
                <div class = "auction-details">
                    <h3>경매 정보</h3>
                    <p><strong>최고입찰자:</strong> ${auction[1]}</p>
                    <p><strong>입찰자:</strong> ${auction[2]}</p>
                    <p><strong>현재 가격:</strong> ${(auction[3]) / 10**18} Ether</p>
                    <p><strong>마감시간:</strong> ${new Date(auction[4] * 1000).toLocaleString()}</p>
                    <p><strong>상태:</strong> ${auction[6]}</p>
                </div>
            </div>
            <img src = "./uploads/${artId}_${art[0]}_${art[2]}.png">
        </div>`;
    allArtDisplay.innerHTML += artAndAuctionHTML;

};


const addArtTime = () => { // 시간 추가 함수 
	console.log(addr)
	let time = $("#time").val();
	let artId = $("#artId").val();
	let owner = $("#artOwner").val();
	ArtAuctionInstance.addTime(artId, time, {from:owner},(error, result) => {
		if(!error && confirm("시간을 늘리십니까?")) {
			alert(time + "초 만큼 시간이 늘었습니다")
			console.log(result);
		} else {
			alert("취소했습니다")
			console.error(error);
		}
	})

}

const ContractDeadLine = () => {
	const contractDeadLine = document.getElementById("contractDeadLine");
	let currentTime = new Date(ArtAuctionInstance.deadLine() * 1000).toLocaleString();

	const time = `<h1>경매시간:${currentTime}</h1>`
	contractDeadLine.innerHTML += time;
}