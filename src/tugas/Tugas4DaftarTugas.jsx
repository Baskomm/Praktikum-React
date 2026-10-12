import { useEffect, useState } from "react";

// TUGAS 4    : proyek Daftar Tugas Kuliah + filter Semua / Aktif / Selesai.
// PENGAYAAN 1: penyimpanan localStorage (lazy initializer + useEffect).
// PENGAYAAN 2: edit judul tugas dengan validasi dan id yang tetap.

// PENGAYAAN 1 - Membaca data tersimpan
const KUNCI = "tugas-kuliah";
const KUNCI_CADANGAN = "tugas-kuliah-cadangan";
const TUGAS_AWAL = [{ id: "awal", judul: "Pelajari JSX", selesai: false }];

function itemValid(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.judul === "string" &&
    typeof item.selesai === "boolean"
  );
}

// Lazy initializer. Tidak pernah memanggil removeItem/clear.
// - tidak ada data              -> pakai TUGAS_AWAL
// - data valid (termasuk [])    -> pakai data tersimpan
// - JSON rusak / bentuk salah   -> salin teks aslinya ke kunci cadangan,
//                                  lalu pakai TUGAS_AWAL
function bacaTugasTersimpan() {
  let mentah = null;
  try {
    mentah = localStorage.getItem(KUNCI);
  } catch {
    return TUGAS_AWAL;
  }
  if (mentah === null) return TUGAS_AWAL;

  try {
    const data = JSON.parse(mentah);
    if (!Array.isArray(data) || !data.every(itemValid)) {
      throw new Error("Bentuk data tidak sesuai");
    }
    return data;
  } catch {
    try {
      localStorage.setItem(KUNCI_CADANGAN, mentah);
    } catch {
      // gagal membuat cadangan: abaikan
    }
    return TUGAS_AWAL;
  }
}

// Fallback untuk browser/konteks tanpa crypto.randomUUID.
function buatId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

// Komponen anak
function ItemTugas({
  item,
  sedangEdit,
  editJudul,
  errorEdit,
  onUbahEdit,
  onSimpanEdit,
  onBatalEdit,
  onMulaiEdit,
  onToggle,
  onHapus,
}) {
  if (sedangEdit) {
    return (
      <li>
        <form className="form-edit" onSubmit={onSimpanEdit}>
          <input
            aria-label={`Judul baru untuk ${item.judul}`}
            value={editJudul}
            onChange={(event) => onUbahEdit(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") onBatalEdit();
            }}
            autoFocus
          />
          <button type="submit">Simpan</button>
          <button type="button" className="sekunder" onClick={onBatalEdit}>
            Batal
          </button>
        </form>
        {errorEdit && (
          <p role="alert" className="error-edit">
            {errorEdit}
          </p>
        )}
      </li>
    );
  }

  return (
    <li className={item.selesai ? "selesai" : ""}>
      <span>{item.judul}</span>
      <button type="button" onClick={() => onToggle(item.id)}>
        {item.selesai ? "Batalkan" : "Selesai"}
      </button>
      <button
        type="button"
        className="sekunder"
        onClick={() => onMulaiEdit(item)}
      >
        Edit
      </button>
      <button type="button" onClick={() => onHapus(item.id)}>
        Hapus
      </button>
    </li>
  );
}

// Komponen utama
const OPSI_FILTER = [
  { nilai: "semua", label: "Semua" },
  { nilai: "aktif", label: "Aktif" },
  { nilai: "selesai", label: "Selesai" },
];

export default function Tugas4DaftarTugas() {
  const [judul, setJudul] = useState("");
  const [error, setError] = useState("");

  // PENGAYAAN 1: lazy initializer (yang dikirim FUNGSI, bukan hasil panggil).
  const [tugas, setTugas] = useState(bacaTugasTersimpan);

  // TUGAS 4: filter hanya mempengaruhi tampilan, array `tugas` tidak berubah.
  const [filter, setFilter] = useState("semua");

  // PENGAYAAN 2: id tugas yang sedang diedit (null = tidak ada) + draft input.
  const [editId, setEditId] = useState(null);
  const [editJudul, setEditJudul] = useState("");
  const [errorEdit, setErrorEdit] = useState("");

  // PENGAYAAN 1: simpan setiap kali array tugas berubah.
  useEffect(() => {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(tugas));
    } catch {
      // penyimpanan penuh atau diblokir: data tetap ada di memori
    }
  }, [tugas]);

  function tambah(event) {
    event.preventDefault();
    const teks = judul.trim();
    if (!teks) {
      setError("Judul tugas wajib diisi.");
      return;
    }
    const item = { id: buatId(), judul: teks, selesai: false };
    setTugas((lama) => [...lama, item]);
    setJudul("");
    setError("");
    // Tugas baru berstatus aktif; agar tidak "hilang" di filter Selesai,
    // pindahkan tampilan ke Semua. Data lain tidak disentuh.
    if (filter === "selesai") setFilter("semua");
  }

  function toggle(id) {
    setTugas((lama) =>
      lama.map((item) =>
        item.id === id ? { ...item, selesai: !item.selesai } : item,
      ),
    );
  }

  function hapus(id) {
    setTugas((lama) => lama.filter((item) => item.id !== id));
    if (id === editId) batalEdit();
  }

  function mulaiEdit(item) {
    setEditId(item.id);
    setEditJudul(item.judul);
    setErrorEdit("");
  }

  function batalEdit() {
    setEditId(null);
    setEditJudul("");
    setErrorEdit("");
  }

  // Pesan error otomatis hilang saat user mulai mengetik.
  function ubahEdit(teks) {
    setEditJudul(teks);
    if (errorEdit) setErrorEdit("");
  }

  function simpanEdit(event) {
    event.preventDefault();
    const teks = editJudul.trim();
    if (!teks) {
      setErrorEdit("Judul tugas tidak boleh kosong.");
      return; // tetap di mode edit, data lama tidak berubah
    }
    const id = editId;
    // Hanya `judul` yang diganti; id dan status selesai ikut dibawa oleh ...item.
    setTugas((lama) =>
      lama.map((item) => (item.id === id ? { ...item, judul: teks } : item)),
    );
    batalEdit();
  }

  // Nilai turunan: dihitung dari state, tidak disimpan sebagai state tambahan.
  const jumlahSelesai = tugas.filter((item) => item.selesai).length;
  const tugasTampil = tugas.filter((item) => {
    if (filter === "aktif") return !item.selesai;
    if (filter === "selesai") return item.selesai;
    return true;
  });

  let pesanKosong = "";
  if (tugas.length === 0) pesanKosong = "Belum ada tugas.";
  else if (tugasTampil.length === 0)
    pesanKosong = "Tidak ada tugas pada filter ini.";

  return (
    <main>
      <h1>Daftar Tugas Kuliah</h1>

      <form onSubmit={tambah}>
        <label htmlFor="judul">Judul tugas</label>
        <div className="baris-form">
          <input
            id="judul"
            value={judul}
            onChange={(event) => setJudul(event.target.value)}
          />
          <button type="submit">Tambah</button>
        </div>
      </form>
      {error && <p role="alert">{error}</p>}

      <p>
        Selesai {jumlahSelesai} dari {tugas.length} tugas
      </p>

      <div className="baris-form filter" role="group" aria-label="Filter tugas">
        {OPSI_FILTER.map((opsi) => (
          <button
            key={opsi.nilai}
            type="button"
            className="sekunder"
            aria-pressed={filter === opsi.nilai}
            onClick={() => setFilter(opsi.nilai)}
          >
            {opsi.label}
          </button>
        ))}
      </div>

      {pesanKosong ? (
        <p>{pesanKosong}</p>
      ) : (
        <ul>
          {tugasTampil.map((item) => (
            <ItemTugas
              key={item.id}
              item={item}
              sedangEdit={item.id === editId}
              editJudul={editJudul}
              errorEdit={errorEdit}
              onUbahEdit={ubahEdit}
              onSimpanEdit={simpanEdit}
              onBatalEdit={batalEdit}
              onMulaiEdit={mulaiEdit}
              onToggle={toggle}
              onHapus={hapus}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
