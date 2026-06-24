# Trening 2026 — wersja PWA (apka na iPhone)

Pliki w tym folderze tworzą instalowalną aplikację webową (PWA). Po umieszczeniu na
hostingu HTTPS możesz dodać ją do ekranu początkowego iPhone'a — działa offline,
zapisuje dane trwale (localStorage na origin https://, nie kasowany jak przy plikach lokalnych).

## Pliki
- index.html                 ← aplikacja (otwiera się sama jako start)
- manifest.webmanifest        ← nazwa, ikona, kolory, tryb standalone
- sw.js                       ← service worker (offline cache aplikacji + animacji)
- icon-192.png / icon-512.png / icon-512-maskable.png / apple-touch-icon.png / favicon-32.png

WAŻNE: trzymaj WSZYSTKIE pliki w jednym folderze, obok siebie. Ścieżki są względne,
więc działa też w podkatalogu (np. GitHub Pages: user.github.io/repo/).

## Hosting w 5 minut — GitHub Pages (darmowe)
1. Załóż konto na github.com (jeśli nie masz).
2. Utwórz nowe repozytorium, np. "trening".
3. Wgraj wszystkie pliki z tego folderu (Add file → Upload files → przeciągnij → Commit).
4. Settings → Pages → Branch: main, folder: / (root) → Save.
5. Po chwili dostaniesz adres: https://TWOJ-LOGIN.github.io/trening/

## Alternatywa — Netlify Drop (jeszcze prościej)
1. Wejdź na app.netlify.com/drop
2. Przeciągnij CAŁY folder na stronę.
3. Dostajesz adres https://... od razu.

## Dodanie do ekranu iPhone'a
1. Otwórz adres https://... w Safari na iPhonie.
2. Dotknij ikony Udostępnij (kwadrat ze strzałką w górę).
3. Wybierz "Dodaj do ekranu początkowego".
4. Odpalaj z ikony — pełny ekran, offline, trwały zapis.

## Dane i backup
- Dane sesji żyją w localStorage przeglądarki/PWA na tym telefonie.
- Backup / przeniesienie: w aplikacji "Eksport JSON" → plik trening_2026_dane.json
  (wrzuć np. do iCloud Drive). Odtworzenie: "Import JSON".
- Po większych aktualizacjach appki rób Eksport na wszelki wypadek.

## Aktualizacja appki w przyszłości
Podmień pliki na hostingu i w sw.js zmień VER (np. 'trening2026-v4') — service worker
pobierze nową wersję przy kolejnym otwarciu.
