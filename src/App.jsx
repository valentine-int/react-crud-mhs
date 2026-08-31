import { useEffect, useState } from "react";

function App() {
    // State untuk menyimpan data mahasiswa
    const [mahasiswa, setMahasiswa] = useState([]);

    // State untuk menyimpan isi form
    const [nama, setNama] = useState("");
    const [nim, setNim] = useState("");
    const [umur, setUmur] = useState("");
    const [jurusan, setJurusan] = useState("");

    // 1. Mengambil data mahasiswa (GET)
    useEffect(() => {
        fetch("http://localhost:8080/api/mahasiswa")
            .then((response) => response.json())
            .then((data) => {
                setMahasiswa(data.data);
            })
    }, []);

    // 2. Menambahkan mahasiswa (POST)
    const tambahMahasiswa = async (event) => {
        event.preventDefault();

        const response = await fetch(
            "http://localhost:8080/api/mahasiswa",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer token"
                },
                body: JSON.stringify({
                    nama,
                    nim,
                    umur: Number(umur),
                    jurusan
                })
            }
        );

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            const responseMahasiswa = await fetch(
                "http://localhost:8080/api/mahasiswa"
            );
            const dataMahasiswa = await responseMahasiswa.json();
            setMahasiswa(dataMahasiswa.data);

            // Mengosongkan form
            setNama("");
            setNim("");
            setUmur("");
            setJurusan("");
        }
    };

    // 3. Menghapus mahasiswa (DELETE)
    const hapusMahasiswa = async (nim) => {
        const response = await fetch(
            `http://localhost:8080/api/mahasiswa/${nim}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer token"
                }
            }
        );

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            const responseMahasiswa = await fetch(
                "http://localhost:8080/api/mahasiswa"
            );
            const dataMahasiswa = await responseMahasiswa.json();
            setMahasiswa(dataMahasiswa.data);
        }
    };

    return (
        <div>
            <h1>Data Mahasiswa</h1>

            {/* Form */}
            <form onSubmit={tambahMahasiswa}>
                <input
                    type="text"
                    placeholder="Nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="NIM"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                />
                <br />
                <input
                    type="number"
                    placeholder="Umur"
                    value={umur}
                    onChange={(e) => setUmur(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Jurusan"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                />
                <br />
                <button type="submit">Tambahkan</button>
            </form>

            <hr />

            <h2>Daftar Mahasiswa</h2>
            
            {/* Daftar mahasiswa */}
            {mahasiswa && mahasiswa.map((mhs) => (
                <div key={mhs.id || mhs.nim} style={{ marginBottom: "10px" }}>
                    <span>{mhs.nama} - {mhs.nim} - {mhs.umur} - {mhs.jurusan} </span>
                    <button onClick={() => hapusMahasiswa(mhs.nim)}>Hapus</button>
                </div>
            ))}
        </div>
    );
}

export default App;
