import { useState } from "react";

// TUGAS 3 - Penghitung kehadiran dengan batas 0 sampai 30.
// Batas dijaga dua lapis: tombol dinonaktifkan DAN handler tetap memakai
// Math.min / Math.max, sehingga nilai tidak mungkin keluar rentang.

const MINIMUM = 0;
const MAKSIMUM = 30;

export default function Tugas3Kehadiran() {
  const [jumlah, setJumlah] = useState(MINIMUM);

  const tambah = () => setJumlah((n) => Math.min(MAKSIMUM, n + 1));
  const kurangi = () => setJumlah((n) => Math.max(MINIMUM, n - 1));
  const reset = () => setJumlah(MINIMUM);

  let pesan = "Ada mahasiswa";
  if (jumlah === MINIMUM) pesan = "Belum ada mahasiswa";
  if (jumlah === MAKSIMUM) pesan = "Batas maksimum tercapai";

  return (
    <main>
      <h1>Penghitung Kehadiran</h1>
      <p>
        Jumlah hadir: {jumlah} dari {MAKSIMUM}
      </p>
      <div className="baris-form">
        <button type="button" onClick={tambah} disabled={jumlah >= MAKSIMUM}>
          Tambah
        </button>
        <button type="button" onClick={kurangi} disabled={jumlah <= MINIMUM}>
          Kurangi
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
      <p role="status">{pesan}</p>
    </main>
  );
}
