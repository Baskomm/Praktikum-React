// TUGAS 1 - Profil mahasiswa dengan JSX dan tiga komponen.
// Nama, NIM, dan program studi berasal dari variabel (bukan teks langsung di JSX).

function ProfilHeader() {
  return (
    <header>
      <h1>Profil Mahasiswa</h1>
    </header>
  );
}

function ProfilData({ nama, nim, programStudi }) {
  return (
    <section aria-labelledby="judul-data">
      <h2 id="judul-data">Data Mahasiswa</h2>
      <dl>
        <dt>Nama</dt>
        <dd>{nama}</dd>
        <dt>NIM</dt>
        <dd>{nim}</dd>
        <dt>Program studi</dt>
        <dd>{programStudi}</dd>
      </dl>
    </section>
  );
}

function Footer({ mataKuliah }) {
  return <footer>Praktikum {mataKuliah}</footer>;
}

export default function Tugas1Profil() {
  // GANTI nilai variabel di bawah dengan data Anda sendiri.
  const nama = "Sebastianus William Dandi";
  const nim = "255314077";
  const programStudi = "Informatika";
  const mataKuliah = "Pemrograman Web";

  return (
    <main>
      <ProfilHeader />
      <ProfilData nama={nama} nim={nim} programStudi={programStudi} />
      <Footer mataKuliah={mataKuliah} />
    </main>
  );
}
