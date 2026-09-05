import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const filename = request.nextUrl.searchParams.get("filename") ?? "download";

  if (!url) {
    return NextResponse.json({ success: false, message: 'Parameter "url" wajib diisi' }, { status: 400 });
  }

  try {
    const upstream = await fetch(url, { cache: "no-store" });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ success: false, message: "Gagal mengambil file" }, { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";

    return new NextResponse(upstream.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Proxy download error:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan saat mengunduh file" }, { status: 500 });
  }
        }
