import { useState } from "react";
import Tugas1Profil from "./tugas/Tugas1Profil.jsx";
import Tugas2MataKuliah from "./tugas/Tugas2MataKuliah.jsx";
import Tugas3Kehadiran from "./tugas/Tugas3Kehadiran.jsx";
import Tugas4DaftarTugas from "./tugas/Tugas4DaftarTugas.jsx";

const HALAMAN = [
  { id: "t1", label: "1. Profil", Komponen: Tugas1Profil },
  { id: "t2", label: "2. Mata Kuliah", Komponen: Tugas2MataKuliah },
  { id: "t3", label: "3. Kehadiran", Komponen: Tugas3Kehadiran },
  { id: "t4", label: "4. Daftar Tugas", Komponen: Tugas4DaftarTugas },
];

export default function App() {
  const [aktif, setAktif] = useState("t4");
  const { Komponen } = HALAMAN.find((h) => h.id === aktif);

  return (
    <>
      <nav className="navigasi" aria-label="Pilih tugas">
        {HALAMAN.map((h) => (
          <button
            key={h.id}
            type="button"
            className="sekunder"
            aria-pressed={aktif === h.id}
            onClick={() => setAktif(h.id)}
          >
            {h.label}
          </button>
        ))}
      </nav>
      <Komponen />
    </>
  );
}
