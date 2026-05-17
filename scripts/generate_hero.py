"""One-shot Nano Banana hero image generation for Raibi Jamila."""
import asyncio
import os
import base64
import sys
from pathlib import Path
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
api_key = os.getenv("EMERGENT_LLM_KEY")
if not api_key:
    print("Missing EMERGENT_LLM_KEY", file=sys.stderr)
    sys.exit(1)


PROMPT = """A cinematic, ultra-premium editorial hero image, 16:9 landscape, soaked in deep moody darkness — pitch black base #0A0A0A with **magenta (#D91C5C → #FF1F75) and warm gold (#D4AF37)** light leaks bleeding from corners.

Centerpiece: a moody double-exposure composition of the Hassan II Mosque minaret in Casablanca silhouetted against a roaring football stadium under floodlights — the minaret morphs into a goalpost at the top. Wisps of crimson smoke and a few green confetti specks drift across the frame.

Foreground: subtle silhouetted hands of a Moroccan crowd reaching upward from the very bottom edge, slightly out of focus.

Background atmosphere: rich black sky with one magenta light-leak streaking diagonally from top-left, soft golden saffron glow on the right horizon line evoking sunset over the Atlantic, fine 16mm grainy film texture overall, subtle geometric zellige tile pattern barely visible in the shadows.

Composition: leave the LEFT 60% of the image relatively empty/dark for typography overlay — most of the visual action concentrated on the RIGHT 40%. Anamorphic light flares, shallow depth of field, cinematic Apple-x-Nike World Cup campaign mood. NO text, NO logos, NO bottles or cups visible. Photorealistic, hyper-detailed, editorial photography style."""


async def main():
    chat = LlmChat(api_key=api_key, session_id="raibi-hero-001", system_message="You generate cinematic editorial images.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=PROMPT)
    text, images = await chat.send_message_multimodal_response(msg)
    print("text:", (text or "")[:200])
    if not images:
        print("NO IMAGES RETURNED", file=sys.stderr)
        sys.exit(2)
    out = Path("/app/frontend/public/hero-generated.png")
    out.parent.mkdir(parents=True, exist_ok=True)
    image_bytes = base64.b64decode(images[0]["data"])
    out.write_bytes(image_bytes)
    print(f"saved: {out} ({len(image_bytes)} bytes)")


if __name__ == "__main__":
    asyncio.run(main())
