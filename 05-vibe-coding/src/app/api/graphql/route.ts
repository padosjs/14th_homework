export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch("https://main-practice.codebootcamp.co.kr/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") ?? "",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await response.text();
  return new Response(text, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}


