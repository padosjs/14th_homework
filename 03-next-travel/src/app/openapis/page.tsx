import Image from 'next/image';

interface TourismItem {
    title: string;
    addr1: string;
    addr2?: string;
    firstimage?: string;
    mapx: string;
    mapy: string;
    dist: string;
    contentid: string;
    tel?: string;
}

async function getTourismData(mapX: number, mapY: number): Promise<{ items: TourismItem[] }> {
    // const serviceKey = process.env.SERVICE_KEY;
    const serviceKey = "581d0a37e0e6689b1eb456d9e5c5d81c47066938c803d38e29d8d18a5e785175";
    if (!serviceKey) {
        throw new Error('SERVICE_KEY가 설정되지 않았습니다. .env.local 확인하세요.');
    }

    const url = `http://apis.data.go.kr/B551011/KorService2/locationBasedList2?serviceKey=${encodeURIComponent(serviceKey)}&mapX=${mapX}&mapY=${mapY}&radius=10000&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=15&_type=json&numOfRows=15&pageNo=1`;

    const res = await fetch(url, { cache: 'no-store' });  // 실시간 데이터 위해 no-cache
    if (!res.ok) {
        throw new Error(`API 호출 실패: ${res.status}`);
    }

    const data = await res.json();
    if (data.response.header.resultCode !== '0000') {
        throw new Error(`API 오류: ${data.response.header.resultMsg}`);
    }

    return {
        items: data.response.body.items.item || [],
    };
}

export default async function HomePage({
    searchParams,
}: {
    searchParams: { mapX?: string; mapY?: string };
}) {
    const mapX = parseFloat(searchParams.mapX || '127.17341443578763');
    const mapY = parseFloat(searchParams.mapY || '37.55744329457999');

    let items: TourismItem[] = [];
    try {
        const data = await getTourismData(mapX, mapY);
        items = data.items.sort((a, b) => parseFloat(a.dist) - parseFloat(b.dist));
    } catch (error) {
        console.error(error);
    }

    return (
        <main className="container max-w-screen-xl mx-auto p-4 pb-20">
            <h1 className="text-3xl font-bold mb-6">강일역 주변 관광지</h1>
            {items.length === 0 ? (
                <p>관광지를 찾을 수 없습니다.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.contentid} className="border rounded-lg p-4 shadow-md">
                            {item.firstimage && (
                                <Image
                                    src={item.firstimage}
                                    alt={item.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                            )}
                            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                            <p className="text-gray-600 mb-2">{item.addr1}{item.addr2 && `, ${item.addr2}`}</p>
                            <p className="text-sm text-gray-500">거리: {parseFloat(item.dist).toFixed(0)}m</p>
                            {item.tel && <p className="text-sm mt-2">전화: {item.tel}</p>}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}