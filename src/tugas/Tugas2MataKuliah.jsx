// TUGAS 2 - Daftar mata kuliah memakai komponen kartu dan props.
// Setiap data punya id tetap, dan id itulah yang dipakai sebagai key.

const daftarMataKuliah = [
  { id: "web", nama: "Pemrograman berbasis Web", sks: 3, dosen: "Dosen A" },
  { id: "pm", nama: "Pembelajaran Mesin", sks: 3, dosen: "Dosen B" },
  { id: "intapp", nama: "Internet dan Aplikasinya", sks: 2, dosen: "Dosen C" },
  { id: "mandat", nama: "Manajemen Data", sks: 3, dosen: "Dosen D" },
  { id: "problan", nama: "Probabilitas Lanjut", sks: 3, dosen: "Dosen E" },
];

function KartuMatkul({ nama, sks, dosen }) {
  return (
    <article>
      <h2>{nama}</h2>
      <p>Jumlah SKS: {sks}</p>
      <p>Dosen: {dosen}</p>
    </article>
  );
}

export default function Tugas2MataKuliah() {
  return (
    <main>
      <h1>Daftar Mata Kuliah</h1>
      {daftarMataKuliah.map((item) => (
        <KartuMatkul
          key={item.id}
          nama={item.nama}
          sks={item.sks}
          dosen={item.dosen}
        />
      ))}
    </main>
  );
}
