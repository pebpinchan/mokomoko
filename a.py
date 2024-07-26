import asyncio
import time

async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(f"{time.strftime('%X')} - {what}")

async def main():
    print(f"{time.strftime('%X')} - start")
    c1 = say_after(1, 'hello')
    c2 = say_after(2, 'world')
    await asyncio.gather(c1, c2) #2つの処理の終了を待つ
    print(f"{time.strftime('%X')} - finish")

asyncio.run(main())
