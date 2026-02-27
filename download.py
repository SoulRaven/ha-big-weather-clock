import os
import requests

# Dicționarul cu URL-urile furnizate de tine
weather_data = {
    'sunny': [
        "https://cdn.flixel.com/flixel/hlhff0h8md4ev0kju5be.hd.mp4",
        "https://cdn.flixel.com/flixel/zjqsoc6ecqhntpl5vacs.hd.mp4",
        "https://cdn.flixel.com/flixel/jvw1avupguhfbo11betq.hd.mp4",
        "https://cdn.flixel.com/flixel/8cmeusxf3pkanai43djs.hd.mp4",
        "https://cdn.flixel.com/flixel/guwb10mfddctfvwioaex.hd.mp4"
    ],
    'partlycloudy': [
        "https://cdn.flixel.com/flixel/13e0s6coh6ayapvdyqnv.hd.mp4",
        "https://cdn.flixel.com/flixel/aorl3skmssy7udwopk22.hd.mp4",
        "https://cdn.flixel.com/flixel/qed6wvf2igukiioykg3r.hd.mp4",
        "https://cdn.flixel.com/flixel/3rd72eezaj6d23ahlo7y.hd.mp4",
        "https://cdn.flixel.com/flixel/9m11gd43m6qn3y93ntzp.hd.mp4",
        "https://cdn.flixel.com/flixel/hrkw2m8eofib9sk7t1v2.hd.mp4"
    ],
    'cloudy': [
        "https://cdn.flixel.com/flixel/13e0s6coh6ayapvdyqnv.hd.mp4",
        "https://cdn.flixel.com/flixel/aorl3skmssy7udwopk22.hd.mp4",
        "https://cdn.flixel.com/flixel/qed6wvf2igukiioykg3r.hd.mp4",
        "https://cdn.flixel.com/flixel/3rd72eezaj6d23ahlo7y.hd.mp4",
        "https://cdn.flixel.com/flixel/9m11gd43m6qn3y93ntzp.hd.mp4",
        "https://cdn.flixel.com/flixel/hrkw2m8eofib9sk7t1v2.hd.mp4"
    ],
    'mostlycloudy': [
        "https://cdn.flixel.com/flixel/e95h5cqyvhnrk4ytqt4q.hd.mp4",
        "https://cdn.flixel.com/flixel/l2bjw34wnusyf5q2qq3p.hd.mp4",
        "https://cdn.flixel.com/flixel/rrgta099ulami3zb9fd2.hd.mp4"
    ],
    'clear-night': [
        "https://cdn.flixel.com/flixel/x9dr8caygivq5secll7i.hd.mp4",
        "https://cdn.flixel.com/flixel/v26zyfd6yf0r33s46vpe.hd.mp4",
        "https://cdn.flixel.com/flixel/ypy8bw9fgw1zv2b4htp2.hd.mp4",
        "https://cdn.flixel.com/flixel/rosz2gi676xhkiw1ut6i.hd.mp4"
    ],
    'fog': [
        "https://cdn.flixel.com/flixel/vwqzlk4turo2449be9uf.hd.mp4",
        "https://cdn.flixel.com/flixel/5363uhabodwwrzgnq6vx.hd.mp4"
    ],
    'rainy': [
        "https://cdn.flixel.com/flixel/f0w23bd0enxur5ff0bxz.hd.mp4"
    ]
}

def download_weather_videos():
    output_dir = "weather_backgrounds"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Folderul '{output_dir}' a fost creat.")

    for phenomenon, urls in weather_data.items():
        # Verificăm dacă urls este listă sau string (pentru cazul 'rainy')
        if isinstance(urls, str):
            urls = [urls]
            
        for index, url in enumerate(urls, start=1):
            # Formatul numelui: phenomenon-0x-hd.mp4
            filename = f"{phenomenon}-{index:02d}-hd.mp4"
            filepath = os.path.join(output_dir, filename)
            
            print(f"Descărcare {filename}...")
            try:
                response = requests.get(url, stream=True)
                if response.status_code == 200:
                    with open(filepath, 'wb') as f:
                        for chunk in response.iter_content(chunk_size=8192):
                            f.write(chunk)
                else:
                    print(f"Eroare la {url}: Status {response.status_code}")
            except Exception as e:
                print(f"Eroare la descărcarea {filename}: {e}")

    print("\nToate descărcările au fost finalizate!")

if __name__ == "__main__":
    download_weather_videos()
