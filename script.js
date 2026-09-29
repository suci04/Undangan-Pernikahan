/* =====================================================
   NAMA TAMU
===================================================== */

const urlParams = new URLSearchParams(window.location.search);
const namaTamu = urlParams.get("tamu");

if (namaTamu) {
    document.getElementById("namaTamu").textContent =
        decodeURIComponent(namaTamu);
}


/* =====================================================
   MUSIK
===================================================== */

let musicPlaying = false;


/* =====================================================
   BUKA UNDANGAN + MUSIK
===================================================== */

function bukaUndangan() {

    const musik = document.getElementById("musik");

    musik.volume = 1.0;

    musik.play()
        .then(function () {

            musicPlaying = true;

            document.getElementById("musicButton")
                .textContent = "🎶";

        })
        .catch(function () {

            console.log(
                "Musik tidak dapat diputar otomatis."
            );

        });

    document.getElementById("undangan")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =====================================================
   TOMBOL MUSIK
===================================================== */

function toggleMusic() {

    const musik = document.getElementById("musik");

    if (musicPlaying) {

        musik.pause();

        musicPlaying = false;

        document.getElementById("musicButton")
            .textContent = "🎵";

    } else {

        musik.volume = 1.0;

        musik.play()
            .then(function () {

                musicPlaying = true;

                document.getElementById("musicButton")
                    .textContent = "🎶";

            })
            .catch(function () {

                console.log(
                    "Musik tidak dapat diputar."
                );

            });
    }
}


/* =====================================================
   COUNTDOWN
===================================================== */

const tanggalPernikahan =
    new Date("December 20, 2026 09:00:00").getTime();

const countdown =
    setInterval(function () {

        const sekarang =
            new Date().getTime();

        const jarak =
            tanggalPernikahan - sekarang;

        const hari =
            Math.floor(
                jarak /
                (1000 * 60 * 60 * 24)
            );

        const jam =
            Math.floor(
                (jarak %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

        const menit =
            Math.floor(
                (jarak %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );

        const detik =
            Math.floor(
                (jarak %
                    (1000 * 60)) /
                1000
            );


        document.getElementById("days")
            .textContent =
            hari >= 0 ? hari : 0;

        document.getElementById("hours")
            .textContent =
            jam >= 0 ? jam : 0;

        document.getElementById("minutes")
            .textContent =
            menit >= 0 ? menit : 0;

        document.getElementById("seconds")
            .textContent =
            detik >= 0 ? detik : 0;


        if (jarak < 0) {
            clearInterval(countdown);
        }

    }, 1000);


/* =====================================================
   SALIN NOMOR REKENING
===================================================== */

function salinRekening() {

    const nomor = "1234567890";

    navigator.clipboard
        .writeText(nomor)
        .then(function () {

            alert(
                "Nomor rekening berhasil disalin."
            );

        });
}


    function kirimRSVP(event) {

        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const nama = data.get("nama").trim();
        const kehadiran = data.get("kehadiran");
        const ucapan = data.get("ucapan").trim();
        const pesan = [
            "Wishes & RSVP - Suci & Fajar",
            "Nama: " + nama,
            "Konfirmasi kehadiran: " + kehadiran,
            "Ucapan & doa: " + ucapan
        ].join("\n");

        const url =
            "https://wa.me/6281234567890?text=" +
            encodeURIComponent(pesan);

        window.open(url, "_blank", "noopener,noreferrer");

    }


/* =====================================================
   ANIMASI SAAT SCROLL
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const elemenAnimasi =
            document.querySelectorAll(
                ".cover-content h1, .cover-content h2, .cover-content p, " +
                ".cover-content .ornament, main h1, main h2, main h3, " +
                "main p, main .ornament, main img"
            );

        const jedaPerBagian = new Map();

        elemenAnimasi.forEach(function (element) {
            const bagian = element.closest("section, footer");
            const jeda = jedaPerBagian.get(bagian) || 0;

            element.classList.add(
                element.matches("img") ? "fade-photo" : "fade-up"
            );
            element.style.setProperty(
                "--reveal-delay",
                Math.min(jeda, 450) + "ms"
            );
            jedaPerBagian.set(bagian, jeda + 90);
        });

        if (!("IntersectionObserver" in window)) {
            elemenAnimasi.forEach(function (element) {
                element.classList.add("muncul");
            });
            return;
        }

        const pengamat = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    entry.target.classList.toggle(
                        "muncul",
                        entry.isIntersecting
                    );
                });
            },
            {
                threshold: 0.12
            }
        );

        elemenAnimasi.forEach(function (element) {
            pengamat.observe(element);
        });

    }
);