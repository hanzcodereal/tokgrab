import { NextRequest, NextResponse } from "next/server";
import type { TiktokApiResponse, TiktokData } from "@/lib/types";

const UPSTREAM_API = "https://zelora-api.vercel.app/download/tiktok";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json<TiktokApiResponse>(
      { success: false, message: 'Parameter "url" wajib diisi' },
      { status: 400 },
    );
  }

  if (!/tiktok\.com/i.test(url)) {
    return NextResponse.json<TiktokApiResponse>(
      { success: false, message: "Link harus berasal dari TikTok" },
      { status: 400 },
    );
  }

  try {
    const upstreamUrl = `${UPSTREAM_API}?url=${encodeURIComponent(url)}`;
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json<TiktokApiResponse>(
        { success: false, message: "Gagal menghubungi server penyedia data" },
        { status: 502 },
      );
    }

    const raw = await upstreamResponse.json();
    const result = raw.result ?? raw;
    const data: TiktokData | null = result?.data ?? null;

    const isSuccess =
      (raw.status === true || raw.success === true) &&
      (!result || result.code === undefined || result.code === 0) &&
      Boolean(data);

    if (!isSuccess || !data) {
      const message = result?.msg || raw.error || raw.msg || "Gagal mengambil data dari TikTok";
      return NextResponse.json<TiktokApiResponse>({ success: false, message }, { status: 422 });
    }

    if (!data.hdplay) {
      data.hdplay = data.play;
      data.hd_size = data.hd_size ?? data.size;
    }

    return NextResponse.json<TiktokApiResponse>({ success: true, data });
  } catch (error) {
    console.error("TikTok API error:", error);
    return NextResponse.json<TiktokApiResponse>(
      { success: false, message: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
      }
