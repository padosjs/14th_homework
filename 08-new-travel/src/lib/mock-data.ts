// 사용자 정보 Mock
export const mockUserInfo = {
  name: "김여행",
  email: "kim.travel@example.com",
  phone: "010-1234-5678",
  points: 1222000,
  productsListed: 45,
  purchases: 128,
  sales: 32,
  profileImage: "/assets/images/profilephoto.jpg",
};

// 거래내역 Mock 데이터
export const mockTransactions = [
  {
    id: 1,
    productName: "캠핑 텐트 3인용",
    price: 326000,
    date: "2024.12.16",
    status: "판매 완료",
  },
  {
    id: 2,
    productName: "등산 백팩 60L",
    price: 189000,
    date: "2024.12.15",
    status: "판매 완료",
  },
  {
    id: 3,
    productName: "휴대용 버너",
    price: 45000,
    date: "2024.12.14",
    status: "판매 완료",
  },
  {
    id: 4,
    productName: "침낭 겨울용",
    price: 125000,
    date: "2024.12.13",
    status: "판매 완료",
  },
  {
    id: 5,
    productName: "캠핑 의자",
    price: 67000,
    date: "2024.12.12",
    status: "판매 완료",
  },
  {
    id: 6,
    productName: "손전등 LED",
    price: 34000,
    date: "2024.12.11",
    status: "판매 완료",
  },
  {
    id: 7,
    productName: "물통 20L",
    price: 28000,
    date: "2024.12.10",
    status: "판매 완료",
  },
  {
    id: 8,
    productName: "지도 나침반",
    price: 23000,
    date: "2024.12.09",
    status: "판매 완료",
  },
  {
    id: 9,
    productName: "방수 배낭 커버",
    price: 45000,
    date: "2024.12.08",
    status: "판매 완료",
  },
  {
    id: 10,
    productName: "캠핑 식기류 세트",
    price: 89000,
    date: "2024.12.07",
    status: "판매 완료",
  },
];

// 북마크 Mock 데이터
export const mockBookmarks = [
  {
    id: 1,
    productName: "프리미엄 텐트 4인용",
    price: 450000,
    date: "2024.12.16",
    status: "판매중",
  },
  {
    id: 2,
    productName: "고급 등산화",
    price: 280000,
    date: "2024.12.15",
    status: "판매중",
  },
  {
    id: 3,
    productName: "캠핑 랜턴",
    price: 65000,
    date: "2024.12.14",
    status: "판매중",
  },
  {
    id: 4,
    productName: "휴대용 샤워기",
    price: 95000,
    date: "2024.12.13",
    status: "판매중",
  },
  {
    id: 5,
    productName: "캠핑 가스렌지",
    price: 120000,
    date: "2024.12.12",
    status: "판매중",
  },
];

// 포인트 내역 Mock 데이터 (전체)
export const mockPointsHistory = [
  {
    id: 1,
    date: "2024.12.16",
    content: "충전",
    amount: 1000000,
    balance: 1222000,
    type: "charge",
  },
  {
    id: 2,
    date: "2024.12.15",
    content: "구매",
    amount: -125000,
    balance: 222000,
    type: "purchase",
  },
  {
    id: 3,
    date: "2024.12.14",
    content: "판매",
    amount: 245000,
    balance: 347000,
    type: "sale",
  },
  {
    id: 4,
    date: "2024.12.13",
    content: "충전",
    amount: 500000,
    balance: 102000,
    type: "charge",
  },
  {
    id: 5,
    date: "2024.12.12",
    content: "구매",
    amount: -85000,
    balance: -398000,
    type: "purchase",
  },
  {
    id: 6,
    date: "2024.12.11",
    content: "판매",
    amount: 156000,
    balance: -313000,
    type: "sale",
  },
  {
    id: 7,
    date: "2024.12.10",
    content: "충전",
    amount: 750000,
    balance: -437000,
    type: "charge",
  },
  {
    id: 8,
    date: "2024.12.09",
    content: "구매",
    amount: -45000,
    balance: -312000,
    type: "purchase",
  },
  {
    id: 9,
    date: "2024.12.08",
    content: "판매",
    amount: 189000,
    balance: -123000,
    type: "sale",
  },
  {
    id: 10,
    date: "2024.12.07",
    content: "충전",
    amount: 350000,
    balance: -473000,
    type: "charge",
  },
  {
    id: 11,
    date: "2024.12.06",
    content: "구매",
    amount: -67000,
    balance: -406000,
    type: "purchase",
  },
  {
    id: 12,
    date: "2024.12.05",
    content: "판매",
    amount: 234000,
    balance: -339000,
    type: "sale",
  },
  {
    id: 13,
    date: "2024.12.04",
    content: "충전",
    amount: 600000,
    balance: -939000,
    type: "charge",
  },
  {
    id: 14,
    date: "2024.12.03",
    content: "구매",
    amount: -92000,
    balance: -847000,
    type: "purchase",
  },
  {
    id: 15,
    date: "2024.12.02",
    content: "판매",
    amount: 123000,
    balance: -724000,
    type: "sale",
  },
];

// 포인트 내역 필터링 함수
export const getPointsHistoryByType = (
  type: "all" | "purchase" | "sale" | "charge"
) => {
  if (type === "all") return mockPointsHistory;
  return mockPointsHistory.filter((item) => item.type === type);
};
