# Developer Screening Results
**Candidate Name:** Dani Hamdani
**Position:** Web Developer (Fullstack/Golang)

## Project Structure
- `/sql-answer`: Berisi query untuk database level 1-3.
- `/js-ts-logic`: Berisi fungsi Title Case dan logic Async/Await.
- `/golang-word-count`: Implementasi word frequency menggunakan Go.
- `/vue-chat-app`: Struktur folder aplikasi chat real-time (Vue 3 + TS).

## How to run

- Golang word count

	```bash
	cd golang-word-count
	go run main.go
	```

- TypeScript examples

	```bash
	# gunakan Node.js + ts-node atau kompilasi ke JS
	npx ts-node js-ts-logic/tasks.ts
	```

- Vue chat app (development)

	```bash
	cd vue-chat-app
	# pastikan dependency terpasang (npm install / yarn)
	npm run dev
	```

## Notes

- `Chat.vue` sudah diperbarui untuk tampilan yang lebih rapi, tombol kirim, timestamp, dan auto-scroll.
- `golang-word-count/main.go` sekarang menampilkan frekuensi kata dalam urutan determistik (tersortir berdasarkan jumlah).
- Jika Anda ingin perubahan gaya atau penamaan folder lainnya, beri tahu saya.

## Summary of Logic
Untuk sistem moderasi foto, saya menggunakan alur: 
Upload (Pending) -> Moderation Queue -> Approved/Rejected.
Teknologi: Golang, PostgreSQL, dan AWS S3.