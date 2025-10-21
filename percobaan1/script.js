// Menunggu sampai semua elemen HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- PENGATURAN ---
    // Atur PIN yang benar di sini
    const CORRECT_PIN = '1234'; 
    // --------------------

    let enteredPin = ''; // Variabel untuk menyimpan PIN yang diketik user
    const display = document.getElementById('passcode-display');
    const keypad = document.querySelector('.keypad');
    const container = document.getElementById('lock-container');

    // Menambahkan pendengar klik ke seluruh area keypad
    keypad.addEventListener('click', (e) => {
        // Hanya jalankan jika yang diklik adalah tombol dengan kelas 'key'
        if (e.target.classList.contains('key')) {
            const key = e.target.textContent;

            // Hapus kelas 'error' jika ada
            container.classList.remove('error');

            if (e.target.id === 'delete') {
                // Jika tombol hapus ('⌫') ditekan
                enteredPin = enteredPin.slice(0, -1);
            } else if (key >= '0' && key <= '9') {
                // Jika tombol angka ditekan
                // Hanya tambahkan angka jika panjang PIN belum maksimal
                if (enteredPin.length < CORRECT_PIN.length) {
                    enteredPin += key;
                }
            }
            
            // Update tampilan di kotak input
            display.value = enteredPin;

            // Cek PIN jika panjangnya sudah sesuai
            if (enteredPin.length === CORRECT_PIN.length) {
                checkPin();
            }
        }
    });

    function checkPin() {
        if (enteredPin === CORRECT_PIN) {
            // --- PIN BENAR ---
            // Tambahkan kelas 'success' untuk animasi pudar
            container.classList.add('success');
            
            // Tunggu 0.5 detik sebelum pindah halaman
            setTimeout(() => {
                // Pindahkan user ke halaman birthday.html
                window.location.href = 'birthday.html';
            }, 500);

        } else {
            // --- PIN SALAH ---
            // Tambahkan kelas 'error' untuk animasi getar
            container.classList.add('error');
            
            // Tunggu 0.8 detik, lalu reset
            setTimeout(() => {
                enteredPin = '';      // Kosongkan PIN
                display.value = '';   // Kosongkan tampilan
            }, 800);
        }
    }
});